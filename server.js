require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, "public")));

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed: " + err.stack);
        return;
    }
    console.log("✅ Connected to MySQL Database.");
});

// Register Route
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query("INSERT INTO user (name, email, password) VALUES (?, ?, ?)", 
        [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("❌ Registration Error:", err);
                return res.status(500).json({ success: false, message: "Error registering user" });
            }
            res.json({ success: true, message: "✅ User registered successfully" });
        });
    } catch (error) {
        console.error("❌ Error hashing password:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Login Route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM user WHERE email = ?", [email], async (err, results) => {
        if (err) {
            console.error("❌ Database Query Error:", err);
            return res.status(500).json({ success: false, message: "Error logging in" });
        }
        if (results.length === 0) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        res.json({ success: true, message: "✅ Login successful", redirect: "/index.html" });
    });
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
