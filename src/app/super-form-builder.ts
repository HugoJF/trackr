import {AbstractControlOptions, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {takeUntil, tap} from "rxjs/operators";
import {ReplaySubject} from "rxjs";
import {mapWithKeys} from "./helpers";

export type SelfReferenceFn<T> = (form: { [name: string]: any }) => T;
export type Validator = ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;

export type FormConfig = {
  [name: string]: FieldConfig
}

export type FieldConfig = {
  initial?: string,
  validators?: Validator, // add dynamic validators
  required?: boolean, // add function,
  disabled?: SelfReferenceFn<boolean>
  flags?: {
    [name: string]: SelfReferenceFn<any>
  }
}

export class SuperFormBuilder {
  private flags: { [p: string]: boolean } = {};
  private formGroup!: FormGroup;

  private destroy$ = new ReplaySubject(1);

  constructor(private readonly config: FormConfig) {
    this.setup();
  }

  unsubscribe() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getFormGroup() {
    return this.formGroup;
  }

  flag(path: string) {
    const parts = path.split('.');

    let current: any = this.flags;
    for (const part of parts) {
      if (!current) {
        return undefined;
      }
      current = current[part];
    }

    return current;
  }

  setup() {
    const config = mapWithKeys(
      this.config,
      fieldConfig => new FormControl(fieldConfig.initial, this.validatorsForField(fieldConfig))
    );

    this.formGroup = new FormGroup(config)

    this.registerFormValueSubscriptions();
    this.updateDisable(this.formGroup.value);
    this.updateFlags(this.formGroup.value);
  }

  private validatorsForField(config: FieldConfig): Validator {
    const validators = config.validators ?? [];

    if (!config.required) {
      return validators;
    }

    if (Array.isArray(validators)) {
      return [Validators.required, ...validators];
    }

    return [Validators.required, validators] as Validator;
  }

  private registerFormValueSubscriptions() {
    this.formGroup.valueChanges.pipe(
      takeUntil(this.destroy$),
      tap(form => {
        this.updateDisable(form);
        this.updateFlags(form);
      }),
    ).subscribe()
  }

  private updateDisable(values: Record<string, any>) {
    Object.keys(this.config).forEach(name => this.updateFieldDisabledState(name, values))
  }

  private updateFlags(values: Record<string, any>) {
    this.flags = mapWithKeys(this.config, (config, name) => this.flagsForField(String(name), values))
  }

  private updateFieldDisabledState(name: string, values: Record<string, any>) {
    const control = this.formGroup.get(name);
    const config = this.config[name];
    const fn = config.disabled;

    if (!control || !fn) {
      return;
    }

    const disabled = fn(values);

    if (disabled && control.enabled) {
      control.disable({emitEvent: false});
    } else if (!disabled && control.disabled) {
      control.enable({emitEvent: false});
    }
  }

  private flagsForField(name: string, values: Record<string, any>) {
    const config = this.config[name];
    const flags = config.flags;

    if (!flags) {
      return null;
    }

    return mapWithKeys(flags, fn => fn(values))
  }
}
