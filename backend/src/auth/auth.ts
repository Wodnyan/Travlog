import { Router } from "express";
import { User } from "../db/db";
import bcrypt from "bcrypt";
import passport from "passport";

const router = Router();
const CLIENT_URL = "http://localhost:3000";

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

router.get(
  "/local",
  passport.authenticate("local", {
    successRedirect: CLIENT_URL,
  })
);
router.post("/local/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      password: hashedPassword,
      provider: "local",
    });
    res.json({
      message: "Successful register",
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({
      error: "Something went wrong",
    });
  }
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

export default router;
