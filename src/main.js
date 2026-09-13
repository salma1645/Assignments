import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { globalErrorHandling } from "./middelware/index.js";
import express from "express";
import { bootstrapDB } from "./DB/connection.db.js";
import { bookController, logcontroller } from "./modules/index.js";
import { authorcontroller } from "./modules/author/index.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use("/books",bookController)
app.use("/authors",authorcontroller)
app.use("/logs",logcontroller)


app.use(globalErrorHandling);
bootstrapDB(app, port);
