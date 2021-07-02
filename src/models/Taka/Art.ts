import { Document, Model, model, Schema } from "mongoose";
import { ITakaSubTag } from "./SubTag";

/**
 * Interface to model the Profile Schema for TypeScript.
 * @param rag:ref => ITakaSubTag._id
 * @param titulo:string
 * @param url:string
 * @param tipo:number
 */
export interface ITakaArt extends Document {
  subtag: ITakaSubTag["_id"];
  titulo: string;
  url: string;
  tipo: number;
}

const takaArtSchema: Schema = new Schema({
  subtag: {
    type: Schema.Types.ObjectId,
    ref: "TakaSubTag",
  },
  url: {
    type: String,
    required: true,
  },
  tipo: {
    type: Number,
    default: 1,
  },
  titulo: {
    type: String,
  },
});

const TakaArt: Model<ITakaArt> = model("TakaArt", takaArtSchema);

export default TakaArt;
