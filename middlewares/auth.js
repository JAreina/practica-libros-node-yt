'use strict';

const service= require('../service')



function isAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({
            message: "NO AUTORIZADO"
        })
    }

    // SI USUARIO EST A AUTORIZADO
    const token = req.headers.authorization.split(' ')[1];
    

    //usamos metodo que resuelve una promesa
    service.decodeToken(token)
                .then(response=>{
                    req.user= response
                    next()
                })
                .catch(response =>{
                    res.status(response.status);
                })
 
}


module.exports= isAuth;
