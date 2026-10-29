const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/donate", (req, res) => {
  const { name, email, amount, message } = req.body;

  const sql =
    "INSERT INTO donations (name, email, amount, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, amount, message || ""], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ success: true });
  });
});

module.exports = router;
