"use strict"


const express = require('express');
const api = express.Router();

const LibroController = require('../controllers/libro-controller')

//RUTAS///////////////////////////

// RECUPERAR TODOS
api.get('/l/libros', LibroController.getLibros);

//RECUPERAR UNO
api.get('/l/libros/libro/:id',LibroController.getLibro);

//  crear INSERT
api.post('/l/libro', LibroController.saveLibro);

//actualizar
api.put('/l/libros/libro/:id',LibroController.updateLibro);

//borrar uno
api.delete('/l/libros/libro/:id', LibroController.deleteLibro);

module.exports= api;