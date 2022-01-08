const express = require("express");
const router = express.Router();
const despesasController = require("../controllers/despesas.controller");
const ds = new despesasController();

router.get("/", async (req, res) => {
  const response = await ds.getDespesas();
  res.status(200).json({ data: response });
});

router.post("/", async (req, res) => {
  const payload = req.body;
  const response = await ds.novaDespesa(payload);
  res.status(201).json({ data: response });
});

module.exports = router;
