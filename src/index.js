import express from "express";
import connect from "./config/database.js";
import bodyParser from "body-parser";
import apiRoutes from "./routes/index.js";
import Passport from "passport";
import { passportAuth } from "./config/jwt-middleware.js";
import dotenv from "dotenv";


dotenv.config();
const app = express();
const PORT = process.env.PORT;

const startAndPrepareServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(Passport.initialize());
  passportAuth(Passport);

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started at port : ${PORT}`);
    await connect();
  });
};

startAndPrepareServer();
