// require("dotenv").config();

// const express = require("express");
// const requireAuth = require("./middleware/requireAuth");

// const leadsRoutes = require("./routes/leads");
// const statsRoutes = require("./routes/stats");

// const app = express();

// app.use(express.json());

// app.use("/api/leads", requireAuth, leadsRoutes);
// app.use("/api/stats", statsRoutes);

// app.use((err, req, res, next) => {
//   console.error(err);

//   if (err.statusCode) {
//     return res.status(err.statusCode).json({
//       error: err.message,
//     });
//   }

//   res.status(500).json({
//     error: "Internal server error",
//   });
// });

// module.exports = app;

const express = require("express");

const authRoutes = require("./routes/auth");
const leadsRoutes = require("./routes/leads");

const app = express();

app.use(express.json());

// ✅ IMPORTANT: register routes
app.use("/auth", authRoutes);
app.use("/leads", leadsRoutes);

module.exports = app;