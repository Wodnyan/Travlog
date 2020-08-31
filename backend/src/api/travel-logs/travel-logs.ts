import { Router } from "express";
import { User } from "../../db/db";

const router = Router();

//Get All
router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400);
      throw new Error("User id missing");
    }
    const { travel_logs } = await User.findById(userId, "travel_logs");
    res.json({
      message: "success",
      data: travel_logs,
    });
  } catch (error) {
    next(error);
  }
});
//Get One
router.get("/:userId/:logId", async (req, res, next) => {
  try {
    const { logId, userId } = req.params;
    if (!logId || !userId) {
      res.status(400);
      throw new Error("User id or travel log id missing");
    }
    if (!userId) {
      res.status(400);
      throw new Error("User id missing");
    }
    const { travel_logs } = await User.findById(userId, "travel_logs");
    res.json({
      message: "success",
      data: travel_logs,
    });
  } catch (error) {
    next(error);
  }
});
//TODO: Secure these.

//Post
router.post("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const travelLog = req.body;
    if (!userId || !travelLog) {
      res.status(400);
      throw new Error("User id or request body missing");
    }
    const newEntry = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { travel_logs: travelLog } }
    );
    res.json({
      message: "Successfully created an entry",
      newEntry,
    });
  } catch (error) {
    next(error);
  }
});
//Update One
router.put("/:logId", (req, res, next) => {});
//Delete One
router.delete("/:logId", (req, res, next) => {});

export default router;
