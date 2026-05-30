const createError = require("http-errors");
// const leadsRepo = require("../repositories/leadsRepo");
const leadsRepo = require("../repos/leadsRepo");

async function list(query, user) {
  const filters = { ...query };

  // Agents only see their own leads
  if (user.role !== "admin") {
    filters.assignedTo = user.id;
  }

  return leadsRepo.list(filters);
}

async function getOne(id) {
  const lead = await leadsRepo.getById(id);

  if (!lead) {
    throw createError(404, "Lead not found");
  }

  return lead;
}

async function update(id, data) {
  const existing = await leadsRepo.getById(id);

  if (!existing) {
    throw createError(404, "Lead not found");
  }

  return leadsRepo.update(id, data);
}

async function stats() {
  return leadsRepo.stats();
}

module.exports = {
  list,
  getOne,
  update,
  stats,
};