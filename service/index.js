'use strict';

const jwt = require('jwt-simple')
const moment = require('moment')
const confToken= require('../conf-token')

function createToken(user){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(15,'days').unix()

    }

  return  jwt.encode(payload,confToken.SECRET_TOKEN)
}


function decodeToken(token){
    const decoded = new Promise((resolve,reject)=>{
        try{
              const payload=jwt.decode(token,confToken.SECRET_TOKEN)

                 //si ha caducado el token
           if(payload.exp < moment().unix()){
                 reject({
                     status:401,
                     message: "EL TOKEN HA EXPIRADO"
                 })
           }
           resolve(payload.sub);
        }catch(err){
            reject({
                status: 500,
                message:"TOKEN NO VÁLIDO"
            })
        }
    })
    return decoded;
}


module.exports={
    createToken,
    decodeToken
}