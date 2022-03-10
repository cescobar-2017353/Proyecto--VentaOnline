'use strict'

const mongoose = require('mongoose');

const carritoComSchema = mongoose.Schema({
    productos: [
        {
        producto: {type: mongoose.Schema.ObjectId, ref: 'Producto'},
        quantity: Number
        }
    ],
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Carrito', carritoComSchema);