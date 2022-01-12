const express = require("express");
const router = express.Router();
const receitaController = require("../controllers/receitas.controller");
const rc = new receitaController();
const moment = require("moment");

// listar receita - (testado)
router.get("/", async (req, res) => {
  const response = await rc.getReceitas();
  // exemplo de data para cadastro
  // console.log(moment().subtract(1, "day").toDate(), "ontem");
  // console.log(moment().toDate(), "ontem");
  res.status(200).json({ data: response });
});

// somar receita total - ( testado) 
router.get("/receita-total", async (req, res) => {
  const response = await rc.receitaTotal();
  res.status(200).json({ data: response });
});

// criar receita - (testado)
router.post("/", async (req, res) => {
  const payload = req.body;
  const response = await rc.novaReceita(payload);
  res.status(201).json({ data: response });
});

// filtrar receita por data (testado)
router.post("/filter", async (req, res) => {
  const payload = req.body;
  const response = await rc.filterByDate(payload);
  res.status(200).json({ data: response });
});

// filtro por tipo de receita -(testado)
router.post("/filter-by-type", async (req, res) => {
  const payload = req.body;
  const response = await rc.filterByType(payload);
  res.status(200).json({ data: response });
});

// deletar receita - (testado)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await rc.removerReceita(id);
    res.status(201).json({ data: "receita deletada" });
  } catch (err) {
    res.status(500).json({ data: "não foi possível remover a receita" });
  }
});

// atualizar receita - (testado)
router.put("/", async (req, res) => {
  const payload = req.body;
  try {
    await rc.atualizarReceita(payload);
    res.status(201).json({ data: "receita atualizada" });
  } catch (err) {
    res.status(500).json({ data: "não foi possível atualizar a receita" });
  }
});

module.exports = router;
