const express = require("express");
const leadsService = require("../services/leadsService");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await leadsService.stats();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;