'use strict'

const productoController = require('../controllers/producto.Controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.post('/saveProducto', [mdAuth.ensureAuth, mdAuth.isAdmin], productoController.saveProducto);
api.get('/getProductos', mdAuth.ensureAuth, productoController.getProductos);
api.get('/searchProducto', mdAuth.ensureAuth, productoController.searchProducto);
api.put('/updateProducto/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], productoController.updateProducto);
api.delete('/deleteProducto/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], productoController.deleteProducto);

module.exports = api;