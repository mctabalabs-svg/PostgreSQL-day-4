// server/repositories/leadsRepo.js

const pool = require("../../db/pool");

// GET all leads
async function list() {
  const result = await pool.query(
    `SELECT id, name, email, status, created_at
     FROM leads
     ORDER BY created_at DESC`
  );

  return result.rows;
}

// GET one lead by ID
async function getById(id) {
  const result = await pool.query(
    `SELECT id, name, email, status, created_at
     FROM leads
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
}

// UPDATE lead status
async function update(id, data) {
  const result = await pool.query(
    `UPDATE leads
     SET name = $1,
         email = $2,
         status = $3
     WHERE id = $4
     RETURNING id, name, email, status, created_at`,
    [data.name, data.email, data.status, id]
  );

  return result.rows[0];
}

// GET statistics
async function stats() {
  const result = await pool.query(
    `SELECT status, COUNT(*)::int AS count
     FROM leads
     GROUP BY status
     ORDER BY status`
  );

  return result.rows;
}

module.exports = {
  list,
  getById,
  update,
  stats,
};