const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const routes = require('./config/routes');

app.use(cookieParser());
app.use(bodyParser.json());

// Adicionando o CORS aqui, antes das rotas
app.use(cors({
    origin: process.env.CORS, // Substituindo process.env.CORS pelo domínio direto
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(helmet());

routes.start(app);

module.exports = app;
