import { createConnection } from "mongoose";
console.log(`process.env.MONGOURI_TAKA`, process.env.MONGOURI_TAKA);
require("dotenv").config();
var connTaka = createConnection(process.env.MONGOURI_TAKA, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

export default connTaka;
