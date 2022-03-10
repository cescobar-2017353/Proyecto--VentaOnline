'use strict'

const categoriaController = require('../controllers/categoria.Controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.post('/saveCategoria', [mdAuth.ensureAuth, mdAuth.isAdmin], categoriaController.saveCategoria);
api.get('/getCategorias', mdAuth.ensureAuth, categoriaController.getCategorias);
api.get('/searchCategoria', mdAuth.ensureAuth, categoriaController.searchCategoria);
api.put('/updateCategoria/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], categoriaController.updateCategoria);
api.delete('/deleteCategoria/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], categoriaController.deleteCategoria);

module.exports = api;