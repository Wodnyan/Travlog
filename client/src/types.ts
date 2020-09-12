export interface FormInput {
  username: string;
  password: string;
  error?: string;
  isLoading?: boolean;
}

export type InputReducerAction =
  | { type: "field"; fieldName: string; fieldValue: string }
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string };

export interface LogEntry {
  _id?: string;
  title: string;
  description: string;
  lng: number;
  lat: number;
}

export interface User {
  _id: string;
  username: string;
  provider: "local" | "github" | "facebook";
}

export interface ErrorMessage {
  id: number;
  message: string;
}
