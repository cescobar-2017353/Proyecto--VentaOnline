'use strict'

const User = require('../models/user.model');
const { validateData, searchUser, encrypt, 
        checkPassword, checkPermission, checkUpdate} = require('../utils/validate');
const jwt = require('../services/jwt');
const CarritoCom = require('../models/carritoCompras.model');

exports.registAdmin = async (req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            username: params.username,
            password: params.password,
            role: params.role
        }
        const msg = validateData(data);

        if(!msg){          
            const userExist = await searchUser(params.username);
            if(!userExist){
                data.surname = params.surname;
                data.email = params.email;
                data.phone = params.phone;
                data.password = await encrypt(params.password);
            
                let user = new User(data);
                await user.save();
                return res.send({message: 'Usuario de Administrador creado'});
            }else{
                return res.send({message: 'Este nombre de usuario ya esta uso, elija otro nombre de usuario'}); 
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}
exports.register = async (req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            username: params.username,
            password: params.password,
            role: 'CLIENT'
        }
        const msg = validateData(data);

        if(!msg){          
            const userExist = await searchUser(params.username);
            if(!userExist){
                data.surname = params.surname;
                data.email = params.email;
                data.phone = params.phone;
                data.password = await encrypt(params.password);
            
                let user = new User(data);
                
                await user.save();
                const users = await User.findOne({username: params.username});
                console.log({users})
                const dat = {
                    user: users.id
                }
                let carritoC = new CarritoCom(dat);
                await carritoC.save();
                return res.send({message: 'Usuario creado con exito'});
                
            }else{
                return res.send({message: 'Este nombre de usuario ya esta uso, elija otro nombre de usuario'}); 
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.login = async (req, res)=>{
    try{
        const params = req.body;
        const data = {
            username: params.username,
            password: params.password
        }
        let msg = validateData(data);

        if(!msg){
            let userExist = await searchUser(params.username);
            if(userExist && await checkPassword(params.password, userExist.password)){
                const token = await jwt.createToken(userExist);

                return res.send({token,message: 'Se inicio sesión exitosamente'});
            }else{
                return res.send({message: 'El Username o la password son incorrectas'});
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.update = async (req, res)=>{
    try{
        const userId = req.params.id;
        const params = req.body;
        const permission = await checkPermission(userId, req.user.sub);
        if(permission === false) return res.status(403).send({message: 'No tiene autorización para actualizar este usuario'});
        else{
            const notUpdated = await checkUpdate(params);
            if(notUpdated === false) return res.status(400).send({message: 'Estos parámetros solo pueden ser actualizados por el administrador'});
            const already = await searchUser(params.username);
            if(!already){
                const userUpdated = await User.findOneAndUpdate({_id: userId}, params, {new:true})
                .lean()
                return res.send({ userUpdated, message: 'User actualizado'});
            }else{
                return res.send({message: 'Nombre de usuario ya tomado'})
            } 
        }    
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.delete = async(req, res)=>{
    try{
        const userId = req.params.id;
        const permission = await checkPermission(userId, req.user.sub);
        if(permission === false) return res.status(401).send({message: 'No autorizado para eliminar este usuario'});
        const userDeleted = await User.findOneAndDelete({_id: userId});
        if(!userDeleted) return res.status(500).send({message: 'Usuario no encontrado o ya eliminado'});
        return res.send({userDeleted, message: 'La cuenta fue borrada'});
    }catch(err){
        console.log(err);
        return err;
    }
}

