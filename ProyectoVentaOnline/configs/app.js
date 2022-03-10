'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('../src/routes/user.Routes');
const productRoutes = require('../src/routes/producto.Routes');
const categoriaRoutes = require('../src/routes/categoria.Routes');
const carritoComprasRoutes = require('../src/routes/carritoCompras.Routes');
const facturaRoutes = require('../src/routes/factura.Routes');
const app = express(); 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/user', userRoutes);
app.use('/producto', productRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/carrito', carritoComprasRoutes);
app.use('/factura', facturaRoutes);

module.exports = app;