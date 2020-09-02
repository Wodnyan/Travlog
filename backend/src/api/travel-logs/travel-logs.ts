import { Router } from "express";
import { User } from "../../db/db";
import { TravelLog } from "../../types";

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
      message: "Successfully returned all entries",
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
    User.findById(userId, (err, doc) => {
      if (err) next(err);
      res.json({
        message: "Successfully returned 1 entry",
        data: doc!.travel_logs!.id(logId),
      });
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
    const { travel_logs } = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { travel_logs: travelLog } },
      { new: true }
    );
    res.json({
      message: "Successfully created an entry",
      data: travel_logs,
    });
  } catch (error) {
    next(error);
  }
});
//Update One
router.put("/:userId/:logId", (req, res, next) => {
  const { logId, userId } = req.params;
  if (!logId || !userId) {
    res.status(400);
    const error = new Error("User id or travel log id missing");
    next(error);
  }
  User.findById(userId, async (err, doc) => {
    if (err) next(err);
    const travelLog: TravelLog = doc!.travel_logs!.id(logId);
    if (travelLog === null) {
      res.status(404);
      const error = new Error("Couldn't find entry");
      next(error);
    }
    travelLog.set(req.body);
    await doc.save();
    res.json({
      message: "Successfully updated 1 entry",
      data: doc,
    });
  });
});
//Delete One
router.delete("/:userId/:logId", (req, res, next) => {
  const { logId, userId } = req.params;
  if (!logId || !userId) {
    res.status(400);
    const error = new Error("User id or travel log id missing");
    next(error);
  }
  User.findById(userId, async (err, doc) => {
    if (err) next(err);
    const travelLog: TravelLog = doc!.travel_logs!.id(logId);
    if (travelLog === null) {
      res.status(404);
      const error = new Error("Couldn't find entry");
      next(error);
    }
    travelLog.remove();
    await doc.save();
    res.json({
      message: "Successfully updated 1 entry",
      data: doc,
    });
  });
});

export default router;
