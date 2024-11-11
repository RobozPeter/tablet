import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "webbolt",
  })
  .promise();

app.get("/tablets", async (req, res) => {
  try {
    const temp = await db.query("SELECT * FROM tablets");
    const rows = temp[0];
    res.status(200).json(rows);
  } catch (error) {
    console.error(`Error retrieving posts: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/tablets", async (req, res) => {
  try {
    const { Nev, opRendszer, procOrajel, procMagok, kijelzoMeret, kijelzoFelbontas, RAM, leiras, ar } = req.body;

    if (!Nev || !opRendszer || !procOrajel || !procMagok || !kijelzoMeret || !kijelzoFelbontas || !RAM || !leiras || !ar) {
      return res.status(400).json({ error: "All fields must be provided" });
    }

    const [result] = await db.query(
      "INSERT INTO tablets (Nev, opRendszer, procOrajel, procMagok, kijelzoMeret, kijelzoFelbontas, RAM, leiras, ar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [Nev, opRendszer, procOrajel, procMagok, kijelzoMeret, kijelzoFelbontas, RAM, leiras, ar]
    );

    res.status(200).json({ message: "Tablet successfully added!" });
  } catch (error) {
    console.error(`Error adding tablet: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.delete("/tablets/:id", async (req, res) => {
  try {
    let tabletId = parseInt(req.params.id);
    const [rows] = await db.query("DELETE FROM tablets WHERE id = ?", [tabletId]);

    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "Tablet not found" });
    } else {
      res.status(200).json({ message: "Tablet successfully removed" });
    }
  } catch (error) {
    console.error(`Error deleting tablet: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/tablets/:id", async (req, res) => {
  try {
    let tabletId = parseInt(req.params.id);
    const [rows] = await db.query("SELECT * FROM tablets WHERE id = ?", [tabletId]);

    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: "Tablet not found" });
    }
  } catch (error) {
    console.error(`Error retrieving tablet: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
