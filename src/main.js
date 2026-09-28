import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import {
  authenticationcontroller,
  userController,
  notecontroller
} from "./modules/index.js";
import { globalErrorHandling } from "./middelware/index.js";
import express from "express";
import { bootstrapDB } from "./DB/connection.db.js";
const app = express();//postman talk to ur express setver 
const port = 3000;//listen for the http req on this port no
app.use(express.json());//this middleware tell express that if coming req is json body convert it to javascrpit obj so,u can access it

app.use("/auth", authenticationcontroller);
app.use("/user", userController);
app.use("/note", notecontroller);
app.use(globalErrorHandling);
bootstrapDB(port, app);
