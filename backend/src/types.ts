export interface OAuthUserInterface {
  _id: string;
  username: string;
  provider: "github" | "facebook";
  provider_id: number;
  avatar_url: string;
}