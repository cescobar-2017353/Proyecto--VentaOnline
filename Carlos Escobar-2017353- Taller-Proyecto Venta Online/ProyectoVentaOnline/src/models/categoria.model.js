'use strict'

const mongoose = require('mongoose');

const categoriaSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Categoria', categoriaSchema);