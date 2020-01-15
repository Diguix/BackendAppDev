require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')
const app = express();

app.use(express.json()); // para que o express() entenda as requisições no formato json

const mongoUri =
    process.env.NODE_ENV === 'local'
        ? process.env.MONGO_URL_LOCAL
        : process.env.MONGO_URL_AWS;

const port = process.env.PORT || 3333;
const host = process.env.HOST || 'localhost';
const url = `http://${port}:${host}`;

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('Conexão OK com o MongoDB...'))
    .catch(e => console.error(e));

/**
 *
 * Metodos HTTP: GET, POST, PUT, DELETE
 *
 */

/**
 *  Tipos de parametros de requisições
 *  Query Params: req.params (filtro, ordenação, paginação)
 *  Route Params: identificar um recurso em alteracao ou remocao
 *  Body
 */

app.use(routes);

app.listen(port, host, () => {
    console.info(`Conectado na porta  ${port} `),
        console.info(`Conectado no mongoDB  ${url} `);
});
