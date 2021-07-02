import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the Feneko Tag for TypeScript.
 * @param tituloPt:string
 * @param tituloEn:string
 */
export interface IFenekoTag extends Document {
  tituloPt: string;
  tituloEn: string;
}

const fenekoTagSchema: Schema = new Schema({
  tituloPt: {
    type: String,
    required: true,
    unique: true,
  },
  tituloEn: {
    type: String,
    required: true,
    unique: true,
  },
});

const FenekoTag: Model<IFenekoTag> = model("FenekoTag", fenekoTagSchema);

export default FenekoTag;
