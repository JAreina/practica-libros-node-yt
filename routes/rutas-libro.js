"use strict"


const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth')
const LibroController = require('../controllers/libro-controller')


const UsuarioController = require ('../controllers/usuario-controller')


//RUTAS///////////////////////////

// RECUPERAR TODOS
api.get('/libros', LibroController.getLibros);

//RECUPERAR UNO
api.get('/libros/libro/:id',LibroController.getLibro);

//  crear INSERT
api.post('/libro', auth, LibroController.saveLibro);

//actualizar
api.put('/libros/libro/:id',auth,LibroController.updateLibro);

//borrar uno
api.delete('/libros/libro/:id',auth, LibroController.deleteLibro);


// isAuth--> middleware que comprueba el token del usuario para poder acceder a la ruta
api.get('/privado',auth ,(req,res)=>{
    res.status(200).send({message: 'USUARIO CON ACCESO'})
})


//RUTAS USUARIO
api.post('/signin', UsuarioController.signIn);
api.post('/signup', UsuarioController.signUp);



module.exports= api;