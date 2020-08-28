import passport from "passport";
import dotenv from "dotenv";
import passportGithub, { Strategy } from "passport-github";
import passportFacebook from "passport-facebook";
import { User } from "../db/db";
import { OAuthUserInterface } from "../types";
import { PromiseProvider } from "mongoose";

dotenv.config();

function passportConfig() {
  passport.serializeUser((user: OAuthUserInterface, done) => {
    return done(null, user._id);
  });
  passport.deserializeUser(async (userId, done) => {
    const user = await User.findById(userId);
    return done(null, user);
  });

  const GithubStrategy = passportGithub.Strategy;
  const FacebookStrategy = passportFacebook.Strategy;

  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_KEY!,
        clientSecret: process.env.GITHUB_SECRET!,
        callbackURL: "/auth/github/callback",
      },
      async (accessToken, refreshToke, profile, done) => {
        try {
          const existingUser = await User.findOne({
            provider: "github",
            provider_id: profile.id,
          });
          if (existingUser === null) {
            const newUser = await User.create({
              username: profile.username,
              provider: "github",
              provider_id: profile.id,
              //@ts-ignore
              avatar_url: profile._json.avatar_url,
            });
          } else {
            return done(null, existingUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_KEY!,
        clientSecret: process.env.FACEBOOK_SECRET!,
        callbackURL: "/auth/facebook/callback",
      },
      async (accessToken, refreshToke, profile, done) => {
        try {
          const existingUser = await User.findOne({
            provider: "facebook",
            provider_id: profile.id,
          });
          if (existingUser === null) {
            const newUser = await User.create({
              username: profile.displayName,
              provider: "facebook",
              provider_id: profile.id,
              avatar_url: `https://graph.facebook.com/${profile.id}/picture`,
            });
          } else {
            return done(null, existingUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
}
export default passportConfig;
