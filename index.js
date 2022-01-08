const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', 5000);
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/receitas', require('./routers/receitas.route'));
app.use('/despesas', require('./routers/despesas.route'));
app.use('/contas', require('./routers/contas.route'));

app.get('/', (req, res) => {
    return res.status(200).json({ message: "It's working...." });
});

app.listen(app.get('port'), () => {
    console.log(`The server is running on: ${app.get('port')}`);
});