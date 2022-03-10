'use strict'

const userController = require('../controllers/user.controller');
const express = require('express');
const api = express.Router(); //poder crear rutas
const mdAuth = require('../services/authenticated');

//rutas públicas
api.post('/register', userController.register);
api.post('/login', userController.login);

//rutas privadas
api.put('/update/:id', mdAuth.ensureAuth, userController.update);
api.delete('/delete/:id', mdAuth.ensureAuth, userController.delete);
api.post('/registAdmin', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.registAdmin);
module.exports = api;
