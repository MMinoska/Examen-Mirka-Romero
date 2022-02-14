
const express = require('express');
const router = express.Router();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var html = require('html');
global.document = new JSDOM(html).window.document;

const mysqlConnection  = require('../database.js');
var aleatorio = 0

function prueba(){
  console.log("hola")
        aleatorio = Math.round(Math.random()*999999);
        console.log(aleatorio)
        document.getElementById('number').innerHTML = aleatorio;
   
        
        setInterval(function(){
            aleatorio = Math.round(Math.random()*999999);
            console.log(aleatorio)
            document.getElementById('number').innerHTML = aleatorio;
        },15000);
}

function proceso() {
  var l = document.getElementById("number").innerHTML;
  aleatorio = Math.round(Math.random()*999999);
  l.body.innerHTML = "HOLAAAAA";
  console.log(aleatorio)

  var sql = "INSERT INTO generar (cliente, token,estado) VALUES ('012902', "+aleatorio +",'activo')";

  mysqlConnection.query(sql);

  document.setInterval(function(){
      console.log("Entramos")
  var l = document.getElementById("number");
  aleatorio = Math.round(Math.random()*999999);

  var modificar = "UPDATE generar SET estado = 'bloqueado' WHERE estado='activo'"
  mysqlConnection.query(modificar);

  l.innerHTML = aleatorio;

  var sql = "INSERT INTO generar (cliente, token,estado) VALUES ('012902', "+aleatorio +",'activo')";

  mysqlConnection.query(sql);


  console.log(aleatorio)


  },15000);
}

router.get("/", function (request, response) {
  response.sendFile('C:/xampp/htdocs/ExamenTIA/src/html/index.html');
  
});

router.get("/generando", function (request, response) {
  response.sendFile('C:/xampp/htdocs/ExamenTIA/src/html/generar.html');
  console.log(document.getElementsByName("number"));
  // console.log(document)
  // setInterval(function(){
  //   console.log("adentro ")
  //     var firstname = document.getElementById("number");
  //     console.log(firstname)

  // },1000);
  
});


router.post('/ingreso', (request, response) => {
  const {token}  = request.query;
  mysqlConnection.query("SELECT * FROM generar WHERE token = ? and estado= 'activo' ", token, (err, rows, fields) => {
    console.log(rows.length);
    if (rows.length != 0 ) {
      mysqlConnection.query("INSERT INTO uso_token (cliente, token) VALUES ('102020', ? )",token ,(error, result) => {
        if (error) throw error;
        response.status(201).send(`Token valido`);
    });

    } else {
      response.status(201).send(`Token no valido`);
    }
  });
  
});


module.exports = router;