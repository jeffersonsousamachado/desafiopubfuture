const express = require("express");
const router = express.Router();
const receitaController = require("../controllers/receitas.controller");
const rc = new receitaController();
const moment = require("moment");


// listar receita
router.get("/", async (req, res) => {
  const response = await rc.getReceitas();
  // exemplo de data para cadastro 
  // console.log(moment().subtract(1, "day").toDate(), "ontem");
  // console.log(moment().toDate(), "ontem");
  res.status(200).json({ data: response });
});

router.get("/receita-total", async (req, res) => {
  const response = await rc.receitaTotal();
  res.status(200).json({ data: response });
});

// criar receita
router.post("/", async (req, res) => {
  const payload = req.body;
  const response = await rc.novaReceita(payload);
  res.status(201).json({ data: response });
});



// filtrar receita por data
router.post("/filter", async (req, res) => {
  const payload = req.body;
  const response = await rc.filterByDate(payload);
  res.status(200).json({ data: response });
});


// deletar receita
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await rc.removerReceita(id);
    res.status(201).json({ data: "receita deletada" });
  } catch (err) {
    res.status(500).json({ data: "não foi possível remover a receita" });
  }
});


// atualizar receita
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
