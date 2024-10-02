import express from "express";
import { dataSource } from "../db";
import { Ad } from "../entities/Ad";
import { Tag } from "../entities/Tag";
import { validate } from "class-validator";

const route = express.Router();

const readById = route.get("/ads/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const ad = await Ad.findOneBy({ id });
    if (!ad) {
      res.status(404).send("Ad not found");
    }
    res.send(ad);
  } catch (err) {
    res.status(500).send("Ad not found");
  }
});

// READ ALL ADS

const read = route.get("/ads", async (req, res) => {
  try {
    const ads = await Ad.find();
    if (!ads) {
      res.status(404).send("No ads found");
    }
    res.send(ads);
  } catch (err) {
    res.status(500).send("No ads found");
  }
});

// CREATE AN AD

const addAd = route.post("/ads", async (req, res) => {
  const {
    title,
    description,
    owner,
    price,
    picture,
    location,
    category_id,
    createdAt,
    tags_id,
  } = req.body;
  try {
    const add = new Ad();
    add.title = title;
    add.description = description;
    add.owner = owner;
    add.price = price;
    add.picture = picture;
    add.location = location;
    add.createdAt = createdAt;
    add.category_id = category_id;
    add.tags_id = [tags_id];

    const errors = await validate(add);
    if (errors.length > 0) {
      throw new Error(`Validation failed!`);
    } else {
      await dataSource.manager.save(add);
    }

    res.status(201).send(add);
  } catch (err) {
    res.status(500).send(`failed to create ad: ${err}`);
  }
});

// UPDATE AN AD

const update = route.put("/ad/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const {
    title,
    description,
    owner,
    price,
    picture,
    location,
    category_id,
    tags_id,
  } = req.body;
  const ad = await Ad.findOneBy({ id });
  try {
    if (ad !== null) {
      ad.title = title;
      ad.description = description;
      ad.owner = owner;
      ad.price = price;
      ad.picture = picture;
      ad.location = location;
      ad.category_id = category_id;
      ad.tags_id = [tags_id];
      ad.save();
    }
    res.send("OK Ad updated").status(200);
  } catch (err) {
    res.status(500).send("Problem with the update");
  }
});

// DELETE AN AD

const supp = route.delete("/ads/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    if ((await Ad.findOneBy({ id })) === null) {
      return res.status(404).send("No ad found");
    }
    await Ad.delete({ id });
    res.send("OK Ad deleted").status(205);
  } catch (err) {
    res.status(500).send("Problem with the deletion");
  }
});

export { addAd, read, readById, update, supp };
