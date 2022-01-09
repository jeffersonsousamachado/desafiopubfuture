const express = require("express");
const router = express.Router();
const despesasController = require("../controllers/despesas.controller");
const ds = new despesasController();

router.get("/", async (req, res) => {
  const response = await ds.getDespesas();
  res.status(200).json({ data: response });
});

router.get("/despesas-total", async (req, res) => {
  const response = await ds.despesasTotal();
  res.status(200).json({ data: response });
});

router.post("/", async (req, res) => {
  const payload = req.body;
  const response = await ds.novaDespesa(payload);
  res.status(201).json({ data: response });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ds.removerDespesa(id);
    res.status(201).json({ data: "despesa deletada" });
  } catch (err) {
    res.status(500).json({ data: "não foi possível remover a despesa" });
  }
});

router.put("/", async (req, res) => {
  const payload = req.body;
  try {
    await ds.atualizarDespesas(payload);
    res.status(201).json({ data: "despesa atualizada" });
  } catch (err) {
    res.status(500).json({ data: "não foi possível atualizar a despesa" });
  }
});

module.exports = router;
