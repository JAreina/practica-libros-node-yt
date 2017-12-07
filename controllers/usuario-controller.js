'use strict';



const Usuario = require('../models/usuario')
const service = require('../service')


//registro
function signUp(req,res){
      const user = new Usuario({
          email: req.body.email,
          nombre:req.body.nombre,
          password:req.body.password
      })

      user.save(user,(err)=>{
         if(err) return res.status(500).send({mensaje: "error servidor"+err})

         return res.status(200).send({token: service.createToken(user)})
      })
}

//loguearse
function signIn(req,res){
Usuario.find({email:req.body.email},
                    (err,user)=>{
                        if(err) return res.status(500).send({mensaje: "error servidor"+err})
                        if(!err) return res.status(404).send({mensaje: "USUARIO NO REGISTRADO"})


                        req.user = user
                        res.status(200)
                                     .send({
                                                message: "LOGIN         CORRECTO",
                                                token: service.createToken(user)
                    })
            })
}

module.exports={
    signIn,
    signUp
}