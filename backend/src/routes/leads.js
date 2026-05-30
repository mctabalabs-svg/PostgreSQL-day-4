const express = require("express");
const leadsService = require("../services/leadsService");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const leads = await leadsService.list(req.query, req.user);

    res.json({
      data: leads,
    });
  } catch (err) {
    next(err);
  }
});

// GET stats
router.get("/stats", requireAuth, async (req, res, next) => {
  try {
    const stats = await leadsService.stats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

// GET one lead
router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const lead = await leadsService.getOne(req.params.id);
    res.json(lead);
  } catch (err) {
    next(err);
  }
});

// UPDATE lead
router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const updated = await leadsService.update(
      req.params.id,
      req.body
    );

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", requireAuth, async (req, res, next) => {
  try {
    const updated = await leadsService.update(
      req.params.id,
      req.body
    );

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

module.exports = router;