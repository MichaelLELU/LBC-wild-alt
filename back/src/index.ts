import "reflect-metadata";
import express from "express";
import sqlite3 from "sqlite3";
import { dataSource } from "./db";
import { Ad } from "./entities/Ad";

const db = new sqlite3.Database("./LBC.sqlite");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/ads/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const ad = await Ad.findOneBy({ id });
    res.send(ad);
  } catch (err) {
    res.status(404).send("Ad not found");
  }
});

app.get("/ads", async (req, res) => {
  try {
    const ads = await Ad.find();
    res.send(ads);
  } catch (err) {
    res.status(404).send("No ads found");
  }
});

app.post("/ads", (req, res) => {
  const { title, description, owner, price, picture, location } = req.body;
  try {
    const add = new Ad();
    add.title = title;
    add.description = description;
    add.owner = owner;
    add.price = price;
    add.picture = picture;
    add.location = location;

    add.save();

    res.send(add).status(201);
  } catch (err) {
    res.status(400).send("Bad request");
  }
});

app.delete("/ads/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await Ad.delete({ id });
    res.send("OK Ad deleted").status(205);
  } catch (err) {
    res.status(404).send("Problem with the deletion");
  }
});

app.listen(PORT, async () => {
  await dataSource.initialize();
  console.log(`Server is running on http://localhost:${PORT}`);
});
