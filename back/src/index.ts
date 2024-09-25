import express from "express";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./LBC.sqlite");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/ads/:id", (req, res) => {
  db.all("SELECT * FROM ad WHERE id = ?", [req.params.id], (err, rows) => {
    if (!rows) {
      return res.status(404).send("Ad not found");
    }
    res.status(200).send(rows);
  });
});

app.get("/ads", (req, res) => {
  db.all("SELECT * FROM ad", (err, rows) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).send(rows);
  });
});

app.post("/ads", (req, res) => {
  const { title, description, owner, price, picture, location } = req.body;
  db.run(
    "INSERT INTO ad (title, description, owner, price, picture, location) VALUES ( ?, ?, ?, ?, ?, ?)",
    [title, description, owner, price, picture, location],
    (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.status(201).send("Ad created");
    }
  );
});

app.delete("/ads/:id", (req, res) => {
  db.all("DELETE FROM ad WHERE id = ?", [req.params.id], (err, rows) => {
    if (!rows) {
      return res.status(404).send("Ad not found");
    }
    res.status(200).send(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
