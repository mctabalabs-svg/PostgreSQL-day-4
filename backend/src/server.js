const app = require("./app");
require("dotenv").config();

const requireAuth = require("./middleware/requireAuth");
const leadsRoutes = require("./routes/leads");
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("DB =", process.env.PG_DATABASE);
  console.log(`Server running on port ${PORT}`);
});