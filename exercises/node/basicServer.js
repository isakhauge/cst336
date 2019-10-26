var http = require('http');
const ex1 = require('./ex1');
const ex2 = require('./ex2');
const instance = new ex2('Otter Newable Object', new Date().getDate().toLocaleString(), false, () => {console.log("The other funciton was invoked.")} );

//create a server object:
http.createServer(function (req, res) {
	res.write(JSON.stringify(ex1) + "\n"); //write a response to the client
	res.write(JSON.stringify(instance));
	ex1.func();
	res.end(); //end the response
}).listen(8080); //the server object listens on port 8080