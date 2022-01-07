const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitas.controller');
const rc = new receitaController();

router.get('/', async (req, res) => {
const response = await rc.buscarreceitas();

res.status(200).json({data: response});
});

router.post('/', async (req, res) => {
    const response = await rc.novaReceita(req.body);
    res.status(201).json({data: response});
});

module.exports = router;