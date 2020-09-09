import { Document } from "mongoose";

export interface TravelLog extends Document {
  title: string;
  description: string;
  long: number;
  lat: number;
}

export interface UserDoc extends Document {
  username: string;
  password?: string;
  provider: "github" | "facebook" | "local";
  provider_id?: string | number;
  avatar_url?: string;
  travel_logs?: [TravelLog];
}
