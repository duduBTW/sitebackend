import { Document, Model, model, Schema } from "mongoose";
import connTaka from "../../../config/taka/database";

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

const TakaTag: Model<ITakaTag> = connTaka.model<ITakaTag>(
  "TakaTag",
  takaTagSchema
);

export default TakaTag;
