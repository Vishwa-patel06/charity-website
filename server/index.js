require("dotenv").config();
console.log("Starting server file...");

const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser } = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});


/* ================= REGISTER ================= */

app.post("/api/register", async (req, res) => {

  const { name, email, password } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    createUser(name, email, hashedPassword, (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({ message: "User Registered Successfully" });

    });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

});


/* ================= LOGIN ================= */

app.post("/api/login", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      message: "Login successful",
      token: "login_token",
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  });

});


/* ================= DONATION ================= */
app.post("/api/donate", (req, res) => {

  const { user_id, name, email, amount, cause_id } = req.body;

  console.log("Incoming data:", req.body); // 🔍 DEBUG

  const sql = `
    INSERT INTO donations 
    (user_id, name, email, amount, cause_id, created_at)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;

  db.query(sql, [user_id, name, email, amount, cause_id || null], (err) => {

    if (err) {
      console.log("Donation error:", err);  // 👈 VERY IMPORTANT
      return res.status(500).json({ error: "Database error" });
    }

    if (cause_id) {
      const updateCause = `
        UPDATE causes
        SET collected_amount = collected_amount + ?
        WHERE id = ?
      `;

      db.query(updateCause, [amount, cause_id], (err2) => {
        if (err2) console.log("Cause update error:", err2);
      });
    }

    res.json({ success: true });

  });

});
/* ================= CONTACT ================= */

app.post("/api/contact", (req, res) => {

  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    INSERT INTO contact_messages (first_name, last_name, email, message)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [firstName, lastName, email, message], (err) => {

    if (err) {
      console.error("Contact DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ success: true });

  });

});


/* ================= CAUSES ================= */

app.get("/causes", (req, res) => {

  const sql = "SELECT * FROM causes";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);

  });

});


/* ================= USER DONATION HISTORY ================= */

app.get("/user-donations/:id", (req, res) => {

  const userId = req.params.id;

  const sql = `
  SELECT donations.amount, causes.title, donations.donation_date
  FROM donations
  JOIN causes ON donations.cause_id = causes.id
  WHERE donations.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);

  });

});


/* ================= ADMIN ROUTES ================= */

/* Get all users */

app.get("/api/admin/users", (req, res) => {

  const sql = "SELECT id, name, email, role FROM users";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result);

  });

});


/* Delete user */
app.delete("/api/admin/users/:id", (req, res) => {

  const userId = req.params.id;

  const sql = "DELETE FROM users WHERE id=?";

  db.query(sql, [userId], (err) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ success: true });

  });

});


/* Get all donations */

app.get("/api/admin/donations", (req, res) => {

  const sql = "SELECT * FROM donations";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result);

  });

});

app.get("/api/causes", (req, res) => {

  const sql = "SELECT * FROM causes";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.json(result);

  });

});

app.get("/api/causes", (req, res) => {

  console.log("CAUSES API CALLED");   // for debugging

  const sql = "SELECT * FROM causes";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);

  });

});

// USER DONATION HISTORY
app.get("/api/user-donations/:id", (req, res) => {

  const userId = req.params.id;

  const sql = `
    SELECT causes.title, donations.amount, donations.created_at
    FROM donations
    JOIN causes ON donations.cause_id = causes.id
    WHERE donations.user_id = ?
    ORDER BY donations.created_at DESC
  `;

  db.query(sql, [userId], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.json(result);

  });

});
/* ================= START SERVER ================= */

const PORT = 4201;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ADD CAUSE (Admin or Volunteer)
app.post("/api/add-cause", (req,res)=>{

 const {title,description,goal_amount,image} = req.body;

 const sql = `
 INSERT INTO causes (title, description, goal_amount, collected_amount, image)
 VALUES (?, ?, ?, 0, ?)
 `;

 db.query(sql,[title,description,goal_amount,image],(err,result)=>{

  if(err){
    console.log(err);
    return res.status(500).send(err);
  }

  res.json({success:true});

 });

});

app.get("/api/recent-donations", (req, res) => {
  console.log("API HIT");

  const query = `
    SELECT 
      d.name AS donor_name,
      d.amount,
      c.title AS cause_name
    FROM donations d
    LEFT JOIN causes c ON d.cause_id = c.id
    ORDER BY d.created_at DESC
    LIMIT 5
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.json(result);
  });
});

//history api... 
app.get("/api/admin/user/:id", (req, res) => {

  const userId = req.params.id;

  const sql = `
    SELECT 
      d.amount,
      d.created_at,
      c.title AS cause
    FROM donations d
    JOIN causes c ON d.cause_id = c.id
    WHERE d.user_id = ?
    ORDER BY d.created_at DESC
  `;

  db.query(sql, [userId], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);

  });

});

app.post("/api/become-volunteer", (req, res) => {

  const { user_id } = req.body;

  const sql = `
    UPDATE users 
    SET volunteer_status = 'pending'
    WHERE id = ?
  `;

  db.query(sql, [user_id], (err) => {

    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ success: true });

  });

});

app.get("/api/admin/volunteer-requests", (req, res) => {


  const sql = `
    SELECT id, name, email 
    FROM users 
    WHERE volunteer_status = 'pending'
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);

  });

});

app.put("/api/admin/approve-volunteer/:id", (req, res) => {

  const userId = req.params.id;

  const sql = `
    UPDATE users 
    SET volunteer_status = 'approved', role = 'volunteer'
    WHERE id = ?
  `;

  db.query(sql, [userId], (err) => {

    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ success: true });

  });

});



app.post("/api/become-volunteer", (req, res) => {

  const { user_id } = req.body;

  console.log("API HIT:", user_id); // MUST print

  const sql = "UPDATE users SET volunteer_status='pending' WHERE id=?";

  db.query(sql, [user_id], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ error: "DB error" });
    }

    res.json({ success: true });

  });

});

app.delete("/api/admin/delete-cause/:id", (req, res) => {

  const { user_id } = req.body;
  const causeId = req.params.id;

  // check role from DB
  const checkRole = "SELECT role FROM users WHERE id = ?";

  db.query(checkRole, [user_id], (err, result) => {

    if (err) return res.status(500).json({ error: "DB error" });

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const role = result[0].role;

    // ✅ allow admin + volunteer
    if (role !== "admin" && role !== "volunteer") {
      return res.status(403).json({ error: "Not allowed" });
    }

    // delete donations first
    const deleteDonations = "DELETE FROM donations WHERE cause_id = ?";
    const deleteCause = "DELETE FROM causes WHERE id = ?";

    db.query(deleteDonations, [causeId], (err2) => {

      if (err2) return res.status(500).json({ error: "Error deleting donations" });

      db.query(deleteCause, [causeId], (err3) => {

        if (err3) return res.status(500).json({ error: "Error deleting cause" });

        res.json({ success: true });

      });

    });

  });

});



app.get("/api/contact-messages", (req, res) => {

  const sql = "SELECT * FROM contact_messages ORDER BY id DESC";

  db.query(sql, (err, result) => {

    if (err) {
      console.log("Fetch error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);

  });

});