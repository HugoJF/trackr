import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldComponent } from './field.component';

describe('FieldComponent', () => {
  let component: FieldComponent;
  let fixture: ComponentFixture<FieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the error message', () => {
    const element: HTMLElement = fixture.nativeElement;
    component.label = 'Email';
    component.error = 'Invalid field';
    fixture.detectChanges();
    expect(element.textContent).toContain('Email');
    expect(element.textContent).toContain('Invalid field');
  });
});
