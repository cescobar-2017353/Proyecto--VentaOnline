const carritoComController = require('../controllers/carritoCompras.Controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.post('/saveCarritoCom', mdAuth.ensureAuth, carritoComController.saveCarritoCom);

module.exports = api;