import { createConnection } from "mongoose";

var connTaka = createConnection(process.env.MONGOURI_TAKA, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

export default connTaka;
