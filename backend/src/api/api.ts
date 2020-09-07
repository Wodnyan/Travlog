import { Router } from "express";
import travelLogs from "./travel-logs/travel-logs";

const router = Router();

router.use("/travel-logs", travelLogs);

router.get("/", (_req, res) => {
  res.json({
    message: "Welcome to my API",
  });
});

export default router;
