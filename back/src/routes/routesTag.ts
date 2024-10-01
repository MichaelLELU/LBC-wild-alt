import express from "express";
import { Tag } from "../entities/Tag";
import { dataSource } from "../db";
import { Ad } from "../entities/Ad";

const route = express.Router();

const readTag = route.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find();
    if (!tags) {
      res.status(404).send("No ads found");
    }
    res.send(tags);
  } catch (err) {
    res.status(500).send("No ads found");
  }
});

const suppTag = route.delete("/tags/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    if ((await Tag.findOneBy({ id })) === null) {
      return res.status(404).send("No ad found");
    }
    await Tag.delete({ id });
    res.send("OK Ad deleted").status(205);
  } catch (err) {
    res.status(500).send("Problem with the deletion");
  }
});

const addTag = route.post("/tags", async (req, res) => {
  const { tag } = req.body;
  try {
    const add = new Tag();
    add.tag = tag;
    await dataSource.manager.save(add);
    res.send(add).status(201);
  } catch (err) {
    res.status(500).send("Problem with the creation");
  }
});

const readAdByTag = route.get("/tags/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tag = await Tag.findOneBy({ id });
  try {
    if (!tag) {
      res.status(404).send("Tag not found");
    } else {
      const ads = await Ad.findBy({ tags_id: tag });
      res.send(ads);
    }
  } catch (err) {
    res.status(500).send("Tag not found");
  }
});

module.exports = { readTag, suppTag, addTag, readAdByTag };
