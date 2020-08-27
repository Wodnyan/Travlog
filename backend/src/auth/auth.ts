import { Router } from "express";
import passport from "passport";

const router = Router();
const CLIENT_URL = "http://localhost:3000";

router.get("/github", passport.authenticate("github"));
router.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "/",
  successRedirect: CLIENT_URL
}));

router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", passport.authenticate("facebook", {
  failureRedirect: "/",
  successRedirect: CLIENT_URL
}));

router.get("/login", (req, res) => {
  if(req.user) {
    res.json(req.user);
  } else {
    res.json({
      error: "Something went wrong"
    })
  }
})
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
})

export default router;