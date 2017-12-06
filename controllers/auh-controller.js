'use strict';


const mongoose = require('mongoose');
const Usuario = require('../models/usuario')
const service = require('../service/index')



function signUp(){
      const user = new Usuario({
          email: req.body.email,
          nombre:req.body.nombre
      })

      user.save((err)=>{
         if(err) res.status(500).send({mensaje: "error servidor"+err})

         return res.status(200).send({token: service.createToken(user)})
      })
}

function signIn(){



}

module.exports={
    signIn,
    signUp
}