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

// app.use((req, res, next) => {
//     console.log('======= DIAGNÓSTICO DE COOKIE =======');
//     console.log('Headers completos:', req.headers);
//     console.log('Cookies recebidos:', req.cookies);
//     console.log('User-Agent:', req.headers['user-agent']);
//     console.log('Origin:', req.headers.origin);
//     console.log('=====================================');
//     next();
//   });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Adicionando o CORS aqui, antes das rotas
app.use(cors({
    origin: process.env.CORS.split(','), // Substituindo process.env.CORS pelo domínio direto
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
}));

app.use(helmet());

routes.start(app);

module.exports = app;
