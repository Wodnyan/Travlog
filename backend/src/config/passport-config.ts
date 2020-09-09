import passport from "passport";
import dotenv from "dotenv";
import passportGithub, { Strategy } from "passport-github";
import passportFacebook from "passport-facebook";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../db/db";
import { UserDoc } from "../types";

dotenv.config();

function passportConfig() {
  passport.serializeUser((user: UserDoc, done) => {
    return done(null, user._id);
  });
  passport.deserializeUser(async (userId, done) => {
    const user = await User.findById(
      userId,
      "username _id provider avatar_url"
    );
    return done(null, user);
  });

  const GithubStrategy = passportGithub.Strategy;
  const FacebookStrategy = passportFacebook.Strategy;
  const PassportLocalStrategy = passportLocal.Strategy;

  passport.use(
    new PassportLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (user === null) {
          throw new Error("Couldn't find user");
        }
        // @ts-ignore
        const dehashedPassword = await bcrypt.compare(password, user.password);
        if (!dehashedPassword) {
          throw new Error("Incorrect Password");
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );

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
              username: profile.username!,
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
