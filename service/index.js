'use strict';

const jwt = require('jwt-token')
const moment = require('moment')
const conf_token= require('../conf-token')

function createToken(user){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(15,days).unix()

    }

    jwt.encode(payload,conf_token.SECRET_TOKEN)
}

module.exports=createToken;