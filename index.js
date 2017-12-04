'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Libro = require('./models/libro');
let Promise = require('mpromise');





//CREAR SERVIDOR

const app= express();
const port = process.env.PORT || 2222;

//middlewares////////////////////////

app.use(bodyParser.urlencoded({extended:false}))
	.use(bodyParser.json())
	


//RUTAS///////////////////////////

// RECUPERAR TODOS
app.get('/l/libros',(req,res)=>{
       Libro.find({}, (err,libros)=>{
		if(err) return res.status(500).send({mensaje: "error"})
		if(!libros) return res.status(404).send({mensaje: "Libros no encontrado"});

		if(libros){
			res.status(200).send({libros: libros});
		}
	   })
})

//RECUPERAR UNO
app.get('/l/libros/libro/:id',(req,res)=>{
		let libroId= req.params.id;
		
		Libro.findById(libroId, (err,libro)=>{
			if(err) return res.status(500).send({mensaje: "error"})
			if(!libro) return res.status(404).send({mensaje: "Libro no encontrado"});

			if(libro){
				res.status(200).send({libro: libro});
			}
		})
});

//  crear INSERT
app.post('/l/libro',(req,res)=>{
       console.log(req.body);
       console.log(req.headers);
	   //res.status(200).send({mensaje: "recibido"})
	   
	   let libroGuardado = new Libro();
	   libroGuardado.titulo = req.body.titulo;
	   libroGuardado.texto= req.body.texto;
	   libroGuardado.fecha= new Date().toLocaleString();
	   libroGuardado.fechaMod= new Date().toLocaleDateString();

	   

	   Libro.save((err,libroGuardado)=>{
		   if (err) res.status(500).send({mensaje: "error servidor"+err})

		   res.status(200).send({libro: libroGuardado});
	   })
});

//actualizar
app.put('/l/libros/libro/:id',(req,res)=>{
	let libroId= req.params.id;
	let update = req.body;

	Libro.findByIdAndUpdate(libroId, update,(err,libroActualizar)=>{
		if (err) res.status(500).send({mensaje: "error servidor"+err});
		res.status(200).send({mensaje: libroActualizar});
	})
});

//borrar uno
app.delete('/l/libros/libro/:id',(req,res)=>{
	let libroId= req.params.id;

	Libro.findById(libroId, (err,libro)=>{
		if (err) res.status(500).send({mensaje: "error servidor"+err})

		libro.remove(err =>{
			if (err) res.status(500).send({mensaje: "error servidor"+err});

			res.status(200).send({mensaje: "Libro borrado"});
		})
	})
});


////////////////////////////////////
// conexion a mongodb
mongoose.connect('mongodb://localhost:27017/libros',

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




app.listen(2222, ()=>{
	console.log(`SERVIDOR PORT: ${port} `);
})