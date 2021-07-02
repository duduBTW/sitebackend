import { Document, Model, model, Schema } from "mongoose";
import { IFeneko } from ".";

/**
 * Interface to model the User Schema for TypeScript.
 * @param type:"video" | "image"
 * @param url:string
 * @param ratio:string
 */
export interface IFenekoArte extends Document {
  artist: IFeneko["_id"];
  type: "video" | "image";
  url: string;
  title: string;
  largura: string;
  altura: string;
}

const fenekoArtSchema: Schema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Feneko",
  },
  type: {
    type: String,
  },
  url: {
    type: String,
  },
  title: {
    type: String,
  },
  largura: {
    type: String,
  },
  altura: {
    type: String,
  },
});

const FenekoArt: Model<IFenekoArte> = model("FenekoArt", fenekoArtSchema);

export default FenekoArt;
