'use strict'

const facturaController = require('../controllers/factura.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/saveCompra', mdAuth.ensureAuth, facturaController.saveCompra);

module.exports = api;