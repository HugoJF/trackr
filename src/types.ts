export interface AdvancedPreference {
}

export interface Shift {
  id: number;
  name: string;
  flexible: boolean;
  without_holidays: boolean;
  advanced: boolean;
  cumulative_extra_time: boolean;
  nr17?: any;
  advanced_preference: AdvancedPreference;
}

export interface ProcessStatus {
  id: number;
  name: string;
}

export interface RegisterType {
  id: number;
  name: string;
}

export interface Source {
  id: number;
  name: string;
}

export interface TimeCard {
  id: number;
  date: string;
  time: string;
  register_type: RegisterType;
  source: Source;
  receipt: string;
}

export interface Factor1 {
  percent: number;
  limit: number;
  time_balance: boolean;
}

export interface Factor2 {
  percent: number;
  limit: number;
  time_balance: boolean;
}

export interface ExtraTimeFactors {
  is_advanced_preference: boolean;
  is_advanced_shift: boolean;
  is_cumulative_extra_time: boolean;
  is_custom_extra_time: boolean;
  is_simple_extra_time: boolean;
  factor1: Factor1;
  factor2: Factor2;
}

export interface WorkDay {
  id: number;
  created_at: number;
  updated_at: number;
  date: string;
  shift: Shift;
  process_status: ProcessStatus;
  time_cards: TimeCard[];
  extra_time: number;
  extra_time_50_percent: number;
  extra_time_100_percent: number;
  extra_time_150_percent: number;
  extra_time_200_percent: number;
  extra_time_factors: ExtraTimeFactors;
  overnight_extra_time_50_percent: number;
  overnight_extra_time_100_percent: number;
  overnight_extra_time_150_percent: number;
  overnight_extra_time_200_percent: number;
  simple_overnight_time: number;
  total_time: number;
  interval_time: number;
  missing_time: number;
  regular_time: number;
  shift_time: number;
  time_balance: number;
  custom_totals: boolean;
  custom_totals_changed_at?: any;
  custom_totals_changed_by?: any;
  cumulative_preference?: any;
  process_log?: any;
  time_balance_enabled: boolean;
  time_balance_middle_phases_extra_time: boolean;
  overnight_enabled: boolean;
  can_team_leader_edit_own_work_day: boolean;
}

export interface Meta {
  now: number;
  ip: string;
}

export interface Response222 {
  work_day: WorkDay;
  meta: Meta;
}
