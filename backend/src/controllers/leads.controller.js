const leadsService = require("../services/leads.service");

async function list(req, res) {
  const leads = await leadsService.list();
  res.json(leads);
}

async function getOne(req, res) {
  const lead = await leadsService.getOne(req.params.id);
  res.json(lead);
}

async function update(req, res) {
  const updated = await leadsService.update(
    req.params.id,
    req.body
  );

  res.json(updated);
}

async function stats(req, res) {
  const result = await leadsService.stats();
  res.json(result);
}

module.exports = {
  list,
  getOne,
  update,
  stats,
};