const db = require("../db");

async function list(filters = {}) {
  const values = [];
  const conditions = [];

  let sql = `
    SELECT id, name, email, status, assigned_to
    FROM leads
  `;

  if (filters.assignedTo) {
    values.push(filters.assignedTo);

    conditions.push(`assigned_to = $${values.length}`);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  sql += ` ORDER BY id DESC`;

  const result = await db.query(sql, values);

  return result.rows;
}

module.exports = {
  list,
};