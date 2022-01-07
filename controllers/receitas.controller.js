const conn = require('../database/db');
const ReceitaModel = require('../models/receitas.modes');

module.exports = class ReceitaController {
    constructor() {
        this.connection = conn;
        this.model = new ReceitaModel(this.connection);
    }
    buscarreceitas() {
        return new Promise((resolve,reject) => {
        this.model.buscarreceitas((err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        }) 
    }

    novaReceita(payload) {
        return new Promise((resolve, reject) => {
            this.model.novaReceita(payload, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}