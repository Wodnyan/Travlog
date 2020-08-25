export interface UserLocationInfo {
  long: number;
  lat: number;
}

export interface FormInput {
  username: string;
  password: string;
  error?: string;
  isLoading?: boolean;
}

export type InputReducerAction = 
  | {type: "field"; field: string; targetValue: string}
  | {type: "login"}
  | {type: "signUp"}
  | {type: "loading"}
  | {type: "error"}