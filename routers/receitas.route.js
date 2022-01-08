const express = require("express");
const router = express.Router();
const receitaController = require("../controllers/receitas.controller");
const rc = new receitaController();
const moment = require('moment');

router.get("/", async (req, res) => {
  const response = await rc.getReceitas();
  console.log(moment().subtract(1, 'day').toDate(), 'ontem');
  console.log(moment().toDate(), 'ontem');

  res.status(200).json({ data: response });
});

router.post("/", async (req, res) => {
  const payload = req.body;
  const response = await rc.novaReceita(payload);
  res.status(201).json({ data: response });
});

router.post('/filter', async (req, res) => {
  const payload = req.body;
  const response = await rc.filterByDate(payload);
  res.status(200).json({ data: response });
});

module.exports = router;
