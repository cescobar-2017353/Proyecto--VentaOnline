'use strict'

const mongoose = require('mongoose');

const FacSchema = mongoose.Schema({
    quantity: Number,
    producto: {type: mongoose.Schema.ObjectId, ref: 'Producto'},
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Factura', FacSchema);