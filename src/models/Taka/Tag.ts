import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param titulo:string
 */
export interface ITakaTag extends Document {
  titulo: string;
}

const takaTagSchema: Schema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
});

const TakaTag: Model<ITakaTag> = model("TakaTag", takaTagSchema);

export default TakaTag;
