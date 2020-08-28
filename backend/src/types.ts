export interface UserTypes {
  _id: string;
  username: string;
  password?: string;
  provider?: "github" | "facebook";
  provider_id?: number;
  avatar_url?: string;
}
