require("dotenv").config();

console.log("USER:", process.env.PG_USER);
console.log("DB:", process.env.PG_DATABASE);

const pool = require("./pool");

async function test() {
  try {
    const result = await pool.query("SELECT 1");
    console.log("Database connected:", result.rows);
  } catch (error) {
    console.error("Connection failed:", error.message);
  } finally {
    await pool.end();
  }
}

test();