const app = require('./server');

app.listen(app.get('port'), () => {
    console.log(`The server is running on: ${app.get('port')}`);
});