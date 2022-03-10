'use strict'

const CarritoCom = require('../models/carritoCompras.model');
const Producto = require('../models/producto.model');
const Factura = require('../models/factura.model');

exports.saveCompra = async (req, res) => {
    try {
        const userId = req.user.sub;
        const carritocom = await CarritoCom.findOne({ user: userId });

        if (carritocom) {
            for (var i = 0; i < carritocom.productos.length; i++) {
                const productoId = carritocom.productos[i].producto;
                const quantity = carritocom.productos[i].quantity;
                const producto = await Producto.findOne({ _id: productoId });
                const restar = producto.stock - quantity;
                if (restar < 0) return res.send({ message: 'No hay existencias' });
                    const datt = {stock: restar}
                await Producto.findOneAndUpdate({ _id: productoId }, datt, { new: true })
        }return res.send({ message: 'La Factura fue creada', carritocom });
    }
        } catch (err) {
            console.log(err);
            return err;
        }
    }
