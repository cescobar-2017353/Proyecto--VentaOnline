'use strict'

const CarritoCom = require('../models/carritoCompras.model');
const Producto = require('../models/producto.model');
const { validateData } = require('../utils/validate');


exports.saveCarritoCom = async (req, res) => {
    try {
        const userId = req.user.sub;
        const params = req.body;
        const productos = {
            productos: params.productos,
            quantity: params.quantity
        }
        const msg = validateData(productos);
        
        if (!msg) {
            const searchProducto = await Producto.findOne({_id: productos.productos});
            const search = await CarritoCom.findOne({user: userId });
            if(searchProducto.stock > 0){
                if (search) {
                const update = await CarritoCom.findOneAndUpdate({ _id: search.id }, { $push: { productos: [{ producto: productos.producto, quantity: productos.quantity }] } });
                return res.send({ message: 'El producto se ha agregado', update })
                }else return res.send({message: 'El producto no se logro agregar'});
            }
        }else return res.send(msg);
    } catch (err) {
        console.log(err);
        return err;
    }
}