'use strict';

const jwt = require('jwt-token')
const moment = require('moment')
const conf_token= require('../conf-token')


function isAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({
            message: "NO AUTORIZADO"
        })
    }

    // SI USUARIO EST A AUTORIZADO
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token,conf_token.SECRET_TOKEN);

    //si ha caducado el token
    if(payload.exp < moment().unix()){
        return res.status(401).send({messag: 'TOKEN CADUCADO'})
    }

    req.user = payload.sub
    next()
}


module.exports= isAuth;
