import "reflect-metadata";
import express from "express";
import sqlite3 from "sqlite3";
import { dataSource } from "./db";

const db = new sqlite3.Database("./LBC.sqlite");

const app = express();

const PORT = 3000;

app.use(express.json());

const { add, readBy } = require("./routes/routesCategory");

app.use("/api", add, readBy);

const { readById, read, addAd, update, supp } = require("./routes/routesAd");

app.use("/api", readById, read, add, update, supp);

app.listen(PORT, async () => {
  await dataSource.initialize();
  console.log(`Server is running on http://localhost:${PORT}`);
});
