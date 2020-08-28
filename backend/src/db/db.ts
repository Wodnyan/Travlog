import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  `mongodb+srv://wodnyan:${process.env.MONGO_PASSWORD}@my-cluster-jv3bc.mongodb.net/travlog?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  provider: { type: String },
  provider_id: { type: Number },
  avatar_url: { type: String },
});

const TravelLogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  long: { type: Number, required: true },
  lat: { type: Number, required: true },
});

export const User = model("users", userSchema);
export const TravelLog = model("travel-log", TravelLogSchema);
