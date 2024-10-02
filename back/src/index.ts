import "reflect-metadata";
import express from "express";
import { dataSource } from "./db";
import cors from "cors";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(cors());

const { add, readBy, readC } = require("./routes/routesCategory");

app.use("/api", add, readBy, readC);

const { readById, read, addAd, update, supp } = require("./routes/routesAd");

app.use("/api", readById, read, addAd, update, supp);

const { readTag, suppTag, addTag, readAdByTag } = require("./routes/routesTag");

app.use("/api", readTag, suppTag, addTag, readAdByTag);

app.use("/api", read, supp);

app.listen(PORT, async () => {
  await dataSource.initialize();
  console.log(`Server is running on http://localhost:${PORT}`);
});
