'use strict'

const {validateData, checkUpdate} = require('../utils/validate');
const Categoria = require('../models/categoria.model');
const Producto = require('../models/producto.model');

exports.saveCategoria= async (req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name
        };
        const msg = validateData(data);
        if(!msg){
        const categoria = new Categoria(data);
        await categoria.save();
        return res.send({message: 'La categoria se guardo con exito'});
        }else return res.status(400).send(msg);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getCategorias = async(req, res)=>{
    try{
        const categorias = await Categoria.find();
        return res.send({categorias});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.searchCategoria = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name
        };
        const msg = validateData(data);
        if(!msg){
            const categoria = await Categoria.find({name: {$regex:params.name, $options: 'i'}});
            return res.send({categoria});
        }else return res.status(400).send(msg);
    }catch(err){
        console.log(err);
        return err;
    }
}
exports.updateCategoria = async(req, res)=>{
    try{
        const params = req.body;
        const categoriaId = req.params.id;
        const check = await checkUpdate(params);
        if(check === false) return res.status(400).send({message: 'Los datos no fueron recibidos'});
        const updateCategoria = await Categoria.findOneAndUpdate({_id: categoriaId}, params, {new: true})
        return res.send({message: 'La categoria fue actualizada', updateCategoria});
    }catch(err){
        console.log(err);
        return err;
    }
}

    exports.deleteCategoria = async(req, res)=>{
        try {
            const categoriaDefault = await Categoria.findOne({name: 'Default'});
            const categoriaId = req.params.id;
            const categoriaExist = await Categoria.findOne({_id: categoriaId});
            if (categoriaExist){
                const productoCategoria = await Categoria.find({categoria:categoriaId});
                if(!productoCategoria){
                    await Categoria.findOneAndDelete({_id:categoriaId});
                    return res.send({message:'Categoría eliminada'});
                }else{
                    await Producto.updateMany({categoria:categoriaId}, {categoria:categoriaDefault._id},{multi:true});
                    await Categoria.findByIdAndDelete({_id:categoriaId});
                    return res.send({message:'Categoría eliminada'});
                }
            }else return res.status(404).send('No se ha encontrado la categoria');
        }catch(err){
            console.log(err);
            return err;
        }
    }
    