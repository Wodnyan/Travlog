import { Router } from "express";
import { User } from "../../db/db";
import { TravelLog } from "../../types";
import { checkAuth } from "../../middlewares/middlewares";

const router = Router();

//Get All
router.get("/", checkAuth, async (req, res, next) => {
  try {
    const userId = req.user!._id;
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
router.get("/:logId", checkAuth, (req, res, next) => {
  try {
    const { logId } = req.params;
    const userId = req.user!._id;
    if (!logId) {
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

//Post
router.post("/", checkAuth, async (req, res, next) => {
  try {
    const userId = req.user!._id;
    const travelLog = req.body;
    if (!travelLog) {
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
      data: travel_logs[travel_logs.length - 1],
    });
  } catch (error) {
    next(error);
  }
});
//Update One
router.put("/:logId", checkAuth, (req, res, next) => {
  const { logId } = req.params;
  const userId = req.user!._id;
  console.log(req.body);
  if (!logId) {
    res.status(400);
    const error = new Error("Log id missing from URL");
    next(error);
  }
  User.findById(userId, async (err, doc) => {
    if (err) next(err);
    const travelLog: TravelLog = doc!.travel_logs!.id(logId);
    //Check if entry with the provided id exists.
    console.log(travelLog);
    if (travelLog === null) {
      res.status(404);
      const error = new Error("Couldn't find entry");
      next(error);
    }
    travelLog.set(req.body);
    console.log(travelLog);
    if (doc) {
      await doc.save();
      res.json({
        message: "Successfully updated 1 entry",
        data: travelLog,
      });
    }
  });
});
//Delete One
router.delete("/:logId", checkAuth, (req, res, next) => {
  const { logId } = req.params;
  const userId = req.user!._id;
  if (!logId) {
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
    if (doc) {
      await doc.save();
      res.json({
        message: "Successfully updated 1 entry",
        data: doc,
      });
    }
  });
});

export default router;
