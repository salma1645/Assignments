import mongoose from "mongoose";
import { DB_URI } from "../config.js";
export const bootstrapDB = async (port, app) => {
  try {
    await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 3000 });//haertbaet mechanism to see if DB connected
    console.log(`DB Connected Successfully 🌸`);
    // await Usemodel.syncIndexes() means can take duplicate data
    app.listen(port, () => {
      console.log("server is running😘");
    });
  } catch (error) {
    console.log({ error });
    console.log(`Fail to connect on DB ❌`);
  }
};
