'use strict'

const {validateData, checkUpdate} = require('../utils/validate');
const Producto = require('../models/producto.model');
const categoria = require('../models/categoria.model')

exports.saveProducto = async (req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            precio: params.precio,
            stock: params.stock,
            categoria: params.categoria
        };
        const msg = validateData(data);
        if(!msg){
        const producto = new Producto(data);
        await producto.save();
        return res.send({message: 'Se a guardado el producto'});
        }else return res.status(400).send(msg);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getProductos = async(req, res)=>{
    try{
        const productos = await Producto.find();
        return res.send({productos});
    }catch(err){
        console.log(err);
        return err;
    }
}


exports.searchProducto = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name
        };
        const msg = validateData(data);
        if(!msg){
            const productos = await Producto.find({name: {$regex:params.name, $options: 'i'}});
            return res.send({productos});
        }else return res.status(400).send(msg);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.updateProducto = async(req, res)=>{
     try {
        const params = req.body;
        const productoId = req.params.id;
        const checkUpdt = await checkUpdate(params);
        if (checkUpdt === false) {
            return res.status(400).send({message: 'No se han recibido datos'});
        }else{
            const updateProducto = await Producto.findOneAndUpdate({_id: productoId}, params, {new: true});
            return res.send({updateProducto, message: 'Se actualizo el producto'});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}
exports.deleteProducto = async (req, res)=>{
	try{
	     const productoId = req.params.id;
	     const productoDeleted = await Producto.findOneAndDelete({_id: productoId});
	     if(productoDeleted) return res.send({productoDeleted, message: 'El Producto ha sido Eliminado'});
	     return res.send({message: 'El Producto no se ha encontrado'});	     
  }catch(err){
     console.log(err);
     return err;
 }
}