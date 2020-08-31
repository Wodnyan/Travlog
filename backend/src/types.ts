import { Document } from "mongoose";

export interface TravelLog {
  title: string;
  description: string;
  long: number;
  lat: number;
}

export interface UserDoc extends Document {
  username: string;
  password?: string;
  provider: "github" | "facebook" | "local";
  provider_id?: number;
  avatar_url?: string;
  travel_logs: [TravelLog];
}

export interface UserTypes {
  _id: string;
  username: string;
  password?: string;
  provider?: "github" | "facebook";
  provider_id?: number;
  avatar_url?: string;
}
