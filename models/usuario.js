'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto')

const UsuarioSchema = new Schema({
    email:{type: String, unique:true,lowercase:true},
    nombre: String,
    avatar:String,
    password:{type:String,select:false},
    fecha:{type:Date,default:Date.now()},
    ultimoLogin:Date
})

//a ejecutar antes
UsuarioSchema.pre('save',function(next){
    let user= this;
    if(user.isModified('password')) return next()

    bcrypt.genSalt(10, (err,salt)=>{
        if(err) return next()
        bycript.hash(user,password,salt,null,(err,hash)=>{
            if (err) return next(err)

            user.password=hash
            next()
        })
    })
})

UsuarioSchema.methods.gravatar = function(){
    if(!this.email) return 'https://gravatar.com/avatar/?s=2006d=retro'

    const md5= crypto.createHash('md5').update(this.email).digest('hex') 
return  `https://gravatar.com/avatar/${md5}/?s=2006d=retro`
}

module.exports=mongoose.model('Usuario', UsuarioSchema);