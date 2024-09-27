import express from "express";

import { dataSource } from "../db";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";

import { validate } from "class-validator";

const app = express.Router();

//                                                        CATEGORY ROUTES

const add = app.post("/category", async (req, res) => {
  try {
    const add = new Category();
    add.name = req.body.name;
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

const readBy = app.get("/category/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const category = await Category.findOneBy({ id });
  try {
    if (!category) {
      res.status(404).send("Category not found");
    } else {
      const ads = await Ad.findBy({ category_id: category });
      res.send(ads);
    }
  } catch (err) {
    res.status(500).send("Category not found");
  }
});

export { add, readBy };
