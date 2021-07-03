import { Schema } from "mongoose";
import connTaka from "../../../config/taka/database";

export const contractSchema = new Schema({
  term: String,
  dateCreated: Date,
});

export const userSchema = new Schema({
  name: String,
  birth: String,
  ip: String,
  dateAccepted: Date,
  forWho: String,
  otherName: String,
  otherBirth: String,
  contract: String,
});

export const TakaContract = connTaka.model("Contract", contractSchema);
export const TakaUser = connTaka.model("User", userSchema);
