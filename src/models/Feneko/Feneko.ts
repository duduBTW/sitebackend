import { Document, Model, model, Schema } from "mongoose";
import { IFenekoTag } from ".";

/**
 * Interface to model the User Schema for TypeScript.
 * @param id:string
 * @param name:string
 * @param desc:string
 * @param profilePic:string
 * @param tags:string[]
 * @param artes:Arte[]
 */
export interface IFeneko extends Document {
  types: IFenekoTag["_id"];
  name: string;
  descEn: string;
  descPt: string;
  profilePic: string;
  tags: string[];
  // artes: Arte[];
}

const fenekoSchema: Schema = new Schema({
  types: [
    {
      type: Schema.Types.ObjectId,
      ref: "FenekoTipoPedido",
    },
  ],
  name: {
    type: String,
    required: true,
  },
  descEn: {
    type: String,
  },
  descPt: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
});

const Feneko: Model<IFeneko> = model("Feneko", fenekoSchema);

export default Feneko;
