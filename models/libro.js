'use strict';

const mongoose = require('mongoose'),
         Schema = mongoose.Schema,
         Libro = Schema({
             titulo: String,
             texto: String,
             fecha : Date,
             fechaMod: Date
         })

module.exports= mongoose.model('Libro',Libro);