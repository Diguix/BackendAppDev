require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const routes = require('./routes');
const bodyParser = require('body-parser');
const dev = require('./controllers/DevController');
const search = require('./controllers/SearchController');

const app = express();

// Para usar banco local usar NODE_ENV como local
const mongoUri =
    process.env.NODE_ENV === 'local'
        ? process.env.MONGO_URL_LOCAL
        : process.env.MONGO_URL_AWS;

const port = process.env.PORT || 3333;
const host = process.env.HOST || 'localhost';
const url = `http://${port}:${host}`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    })
    .then(() => console.log('Conexão estabelecida com o MongoDB...'))
    .catch(err => console.error(err));

// App
app.use(express.json()); // para que o express() entenda as requisições no formato json
app.use(express.urlencoded({ extended: true })); // permite lidar com requisicoes no padrao urlenconded

// app.use('/', dev, search);
app.use(routes);

app.listen(port, host, () => {
    console.log(`Servidor executando em  ${url} `),
        console.log(`Servidor executando na uri  ${mongoUri} `);
});
