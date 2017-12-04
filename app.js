'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const conexion = require('./conexion-mongo');

const api =require('./routes/rutas-libro')
const app= express();
     
    app.use(bodyParser.urlencoded({extended:false}))
     app.use(bodyParser.json())
     app.use('/api',api);



////////////////////////////////////

module.exports=app;