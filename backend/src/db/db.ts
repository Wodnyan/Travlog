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

const OAuthUserSchema = new Schema({
  username: { type: String, required: true },
  provider: { type: String, required: true },
  provider_id: { type: Number, required: true },
  avatar_url: { type: String, required: true },
});

export const OAuthUser = model("OAuth-user", OAuthUserSchema);
