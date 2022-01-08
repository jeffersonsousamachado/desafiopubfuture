const express = require("express");
const router = express.Router();
const contasController = require("../controllers/contas.controller");
const ct = new contasController();

router.get("/", async (req, res) => {
  const response = await ct.getContas();
  res.status(200).json({ data: response });
});

router.post("/", async (req, res) => {
  const payload = req.body;
  const response = await ct.novaConta(payload);
  res.status(201).json({ data: response });
});

module.exports = router;
