const express = require("express");
const router = express.Router();
const contasController = require("../controllers/contas.controller");
const ct = new contasController();

router.get("/", async (req, res) => {
  const response = await ct.getContas();
  res.status(200).json({ data: response });
});

router.get("/saldo-total", async (req, res) => {
  const response = await ct.saldoTotal();
  res.status(200).json({ data: response });
});


router.post("/", async (req, res) => {
  const payload = req.body;
  const response = await ct.novaConta(payload);
  res.status(201).json({ data: response });
});

router.post("/transferencia", async (req, res) => {
  const { id_origem, id_destino, valor} = req.body;
  try {
    await ct.transferenciaConta(id_origem, id_destino, valor);
    res.status(201).json({ data: 'Transferencia realizada com sucesso.' });
  }catch(err) {
    res.status(201).json({ data: 'Não foi possível realizar transferência.' });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ct.removerConta(id);
    res.status(201).json({ data: "conta deletada" });
  } catch (err) {
    res.status(500).json({ data: "não foi possível remover a conta" });
  }
});

router.put("/", async (req, res) => {
  const payload = req.body;
  try {
    await ct.atualizarConta(payload);
    res.status(201).json({ data: "conta atualizada" });
  } catch (err) {
    res.status(500).json({ data: "não foi possível atualizar a conta" });
  }
});

module.exports = router;
