import passport from "passport";
import dotenv from "dotenv";
import passportGithub, { Strategy } from "passport-github";
import passportFacebook from "passport-facebook";
import { OAuthUser } from "../db/db";
import { OAuthUserInterface } from "../types";
import { PromiseProvider } from "mongoose";

dotenv.config();

function passportConfig() {
  passport.serializeUser((user: OAuthUserInterface, done) => {
    return done(null, user._id);
  });
  passport.deserializeUser(async (userId, done) => {
    const foo = await OAuthUser.findById(userId);
    return done(null, foo);
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
          const existingUser = await OAuthUser.findOne({
            provider_id: profile.id,
            provider: profile.provider,
          });
          if (existingUser) {
            done(null, existingUser);
          } else if (existingUser === null) {
            const newUser = await OAuthUser.create({
              username: profile.username,
              provider: profile.provider,
              provider_id: profile.id,
              // @ts-ignore
              avatar_url: profile._json.avatar_url,
            });
            done(null, newUser);
          }
        } catch (error) {
          console.log(error);
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
        const existingUser = await OAuthUser.findOne({
          provider_id: profile.id,
          provider: profile.provider,
        });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const newUser = await OAuthUser.create({
            username: profile.displayName,
            provider: profile.provider,
            provider_id: profile.id,
            avatar_url: `https://graph.facebook.com/${profile.id}/picture`,
          });
          done(null, newUser);
        }
      }
    )
  );
}
export default passportConfig;
