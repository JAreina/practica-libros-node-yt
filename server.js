"use strict";

const port = require('./conf-server');
const app = require('./app'),

         server = app.listen(port.port, ()=>{
	console.log(`SERVIDOR PORT: ${port.port} `);
})