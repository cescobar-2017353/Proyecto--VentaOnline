'use strict'

const mongoose = require('mongoose');
const categoria = require('../models/categoria.model')

const productoSchema = mongoose.Schema({
    name: String,
    precio: Number,
    stock: Number,
    categoria:{type: mongoose.Schema.ObjectId, ref: 'Categoria'}
});

module.exports = mongoose.model('producto', productoSchema);