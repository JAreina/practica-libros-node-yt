"use strict";



const mongoose = require('mongoose');
const uri= require('./conf-mongo');

// conexion a mongodb
let conexion = mongoose.connect(uri.uriLocal,

{useMongoClient: true},
	(err,res)=>{
		if(err) throw err;
		console.log("CONECTADO A MONGODB");
});


/*
let uri='mongodb://anier:(778zBzA@ds121716.mlab.com:21716/angular';
mongoose.Promise = global.Promise;

mongoose.connect(uri,{ useMongoClient: true },
	(err,res)=>{
		if(err)

			return console.log("ERROR MONGO : "+err);
		console.log("CONECTADO A MONGODB "+res.headers);
});*/


module.exports=conexion;