const express = require("express");
const router = express.Router();
const despesasController = require("../controllers/despesas.controller");
const ds = new despesasController();

// buscar receitas - (testdo)
router.get("/", async (req, res) => {
  const response = await ds.getDespesas();
  res.status(200).json({ data: response });
});

//total despesa - (testado)
router.get("/despesas-total", async (req, res) => {
  const response = await ds.despesasTotal();
  res.status(200).json({ data: response });
});

// criar nova despesa - (testado)
router.post("/", async (req, res) => {
  const payload = req.body;
  const response = await ds.novaDespesa(payload);
  res.status(201).json({ data: response });
});

//filtro por data despesa (testado)
router.post("/filter", async (req, res) => {
  const payload = req.body;
  const response = await ds.filterByDate(payload);
  res.status(200).json({ data: response });
});

// filtro por tipo de despesa (testado)
router.post("/filter-by-type", async (req, res) => {
  const payload = req.body;
  const response = await ds.filterByType(payload);
  res.status(200).json({ data: response });
});

//deletar despesas (testado)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ds.removerDespesa(id);
    res.status(201).json({ data: "despesa deletada" });
  } catch (err) {
    res.status(500).json({ data: "não foi possível remover a despesa" });
  }
});

//atualizar receita (testado)
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
