const express = require("express");
const router = express.Router();

// TEMP in-memory users (for tests)
const users = [];

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password too short" });
    }

    const exists = users.find(u => u.email === email);
    if (exists) {
      return res.status(400).json({ error: "User exists" });
    }

    users.push({ email, password });

    return res.status(201).json({ message: "User created" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({
      token: "fake-token"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;


















// // const express = require("express");
// // const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken");
// // const pool = require("../../db/pool");

// // const router = express.Router();

// // router.post("/signup", async (req, res, next) => {
// //   try {
// //     const { email, password, role = "agent" } = req.body;

// //     if (!email || !password || password.length < 8) {
// //       return res.status(400).json({ error: "Invalid input" });
// //     }

// //     const hash = await bcrypt.hash(
// //       password,
// //       parseInt(process.env.BCRYPT_ROUNDS, 10)
// //     );

// //     const { rows } = await pool.query(
// //       `INSERT INTO users (email, password_hash, role)
// //        VALUES ($1, $2, $3)
// //        RETURNING id, email, role`,
// //       [email, hash, role]
// //     );

// //     res.status(201).json({ user: rows[0] });
// //   } catch (err) {
// //     if (err.code === "23505") {
// //       return res.status(409).json({ error: "Email taken" });
// //     }

// //     next(err);
// //   }
// // });

// // router.post("/login", async (req, res, next) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email || !password) {
// //       return res.status(400).json({ error: "Invalid input" });
// //     }

// //     const { rows } = await pool.query(
// //       `SELECT id, email, password_hash, role
// //        FROM users
// //        WHERE email = $1`,
// //       [email]
// //     );

// //     const user = rows[0];

// //     if (!user) {
// //       return res.status(401).json({ error: "Invalid credentials" });
// //     }

// //     const ok = await bcrypt.compare(password, user.password_hash);

// //     if (!ok) {
// //       return res.status(401).json({ error: "Invalid credentials" });
// //     }

// //     const token = jwt.sign(
// //       {
// //         sub: user.id,
// //         email: user.email,
// //         role: user.role,
// //       },
// //       process.env.JWT_SECRET,
// //       {
// //         expiresIn: process.env.JWT_EXPIRY,
// //       }
// //     );

// //     res.json({ token });
// //   } catch (err) {
// //     next(err);
// //   }
// // });

// // module.exports = router;


// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const pool = require("../../db/pool");
// const router = express.Router();

// router.post("/signup", async (req, res, next) => {
//   try {
//     const { email, password, role = "agent" } = req.body;
//     const name = req.body.name || (email ? email.split("@")[0] : undefined);
//     if (!email || !password || password.length < 8 || !name) {
//       return res.status(400).json({ error: "Invalid input" });
//     }

//     const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS, 10));
//     const { rows } = await pool.query(
//       "INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role",
//       [email, hash, name, role]
//     );
//     res.status(201).json({ user: rows[0] });
//   } catch (err) {
//     if (err.code === "23505") return res.status(409).json({ error: "Email taken" });
//     next(err);
//   }
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) return res.status(400).json({ error: "Invalid input" });

//   const { rows } = await pool.query("SELECT id, email, password_hash, role FROM users WHERE email = $1", [email]);
//   const user = rows[0];
//   if (!user) return res.status(401).json({ error: "Invalid credentials" });

//   const ok = await bcrypt.compare(password, user.password_hash);
//   if (!ok) return res.status(401).json({ error: "Invalid credentials" });

//   const token = jwt.sign(
//     { sub: user.id, email: user.email, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRY }
//   );

//   res.json({ token });
// });

// module.exports = router;