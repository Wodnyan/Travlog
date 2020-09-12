import { Router } from "express";
import { User } from "../db/db";
import { checkUsername } from "../middlewares/middlewares";
import bcrypt from "bcrypt";
import passport from "passport";

const router = Router();
const CLIENT_URL = "http://localhost:3000/map";
router.get("/github", passport.authenticate("github"));
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
    successRedirect: CLIENT_URL,
  })
);

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    successRedirect: CLIENT_URL,
  })
);

router.post(
  "/local",
  passport.authenticate("local", {
    failureRedirect: CLIENT_URL,
  }),
  (req, res) => {
    const user: any = req.user;
    res.json({
      message: "Successful Authentication",
      user: { username: user.username, id: user._id },
    });
  }
);
router.post("/local/register", checkUsername, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      password: hashedPassword,
      provider: "local",
    });
    req.login(user, (err) => {
      if (err) return next(err);
      res.json({
        message: "Successful register",
        user,
      });
    });
  } catch (error) {
    next(error);
  }
});

router.get("/login", (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  } else {
    const error = new Error("Authentication failed");
    res.status(401);
    next(error);
  }
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

export default router;
