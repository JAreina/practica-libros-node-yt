'use strict';

const Libro = require('../models/libro');

function getLibro(req,res,next){
    let libroId= req.params.id;
    
    Libro.findById(libroId, (err,libro)=>{
        if(err) return res.status(500).send({mensaje: "error"})
        if(!libro) return res.status(404).send({mensaje: "Libro no encontrado"});

        if(libro){
            res.status(200).send({libro: libro});
        }
    })
}


function getLibros(req,res,next){
    Libro.find({}, (err,libros)=>{
		if(err) return res.status(500).send({mensaje: "error"})
		if(!libros) return res.status(404).send({mensaje: "Libros no encontrados"});

		if(libros){
			res.status(200).send({libros: libros});
		}
	   })
}

function saveLibro(req,res,next){
    console.log(req.body);
    console.log(req.headers);
    //res.status(200).send({mensaje: "recibido"})
    
    let libroGuardado = new Libro();
    libroGuardado.titulo = req.body.titulo;
    libroGuardado.texto= req.body.texto;
    libroGuardado.fecha= new Date().toLocaleString();
    libroGuardado.fechaMod= new Date().toLocaleDateString();

    

    libroGuardado.save((err,libroGuardado)=>{
        if (err) res.status(500).send({mensaje: "error servidor"+err})

        res.status(200).send({libro: libroGuardado});
    })
}



function updateLibro(req,res,next){
	let libroId= req.params.id;
	let update = req.body;

	Libro.findByIdAndUpdate(libroId, update,(err,libroActualizar)=>{
		if (err) res.status(500).send({mensaje: "error servidor"+err});
		res.status(200).send({mensaje: libroActualizar});
	})
}

function deleteLibro(req,res,next){
    let libroId= req.params.id;
    
        Libro.findById(libroId, (err,libro)=>{
            if (err) res.status(500).send({mensaje: "error servidor"+err})
    
            libro.remove(err =>{
                if (err) res.status(500).send({mensaje: "error servidor"+err});
    
                res.status(200).send({mensaje: "Libro borrado"});
            })
        })
}

module.exports={
    getLibro,
    getLibros,
    saveLibro,
    updateLibro,
    deleteLibro
}