/*preliminaire soit importation des biblioteques indispensable */
var mysql = require('mysql');
const express = require('express');
const app = express();
const http = require('http');
const { SocketAddress } = require('net');
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);
var fs = require('fs');

app.use(express.static('public'));
//lier le serveur a l'interface client
app.get('/public/index.html');

//definir le port de connexion
server.listen(4055, () => {
  console.log('listening on *:4055');
});

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "utilisateur"
});

/*async function personne(req, res, next) {     
  // Validate request parameters, queries using express-validator 
 
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var users = await UserService.getUsers({}, page, limit)         
      return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
      return res.status(400).json({
         status: 400, message: e.message 
        });     
      } 
    }*/


/*pool.getConnection(function(err) {
  if (err) throw err;
  var sql = "DELETE  FROM logs";
  pool.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});*/
let nom,mots;
let id = [];
let ids =[];
let passwords = [];
let user = 0;
let users = [];
let utilisateur=[];

pool.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql;
  setInterval(() => {
    //console.log(utilisateur);
    if(nom && mots){
      users[0].push(nom);
      users[1].push(mots);
      sql = `INSERT INTO logs (nom, password) VALUES ('${nom}', '${mots}')`;
      pool.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
      nom = '';
      mots = '';
    }
  }, 1000);
  pool.query("SELECT * FROM logs", function (err, result, fields) {
    if (err) throw err;
    for(i in result){
      id.push(result[i].nom);
      passwords.push(result[i].password);
    }
    users.push(id,passwords);
});
});

io.on('connection', (socket) => {
  io.emit('chat message',['nombre', users[0]]);
  //console.log(users[0] ,'....',id);
  setTimeout(() => {
    //console.log(users)
  }, 2000);
  user++;
  socket.on("disconnecting", () => {
    user--;
    let utils = [];
    for(s in utilisateur){
      if(socket.id != utilisateur[s][1]){
        utils.push(utilisateur[s]);
      }
    }
    utilisateur = utils;
  });
  socket.on('chat message', (msg) => {
    /*if(msg[0] == 'sms'){
      io.emit('chat message', msg);
    }*/
    if(msg[0]=='prive'){
      console.log(msg[2])
      for(f in utilisateur){
        console.log(utilisateur[f]);
        if(msg[1]==utilisateur[f][0]){
          io.to(utilisateur[f][1]).emit('chat message',['hello',msg[2],msg[3]]);
        }
      }
    }
    if(msg[0] == 'publie'){
      io.emit('chat message', ['publie',msg[1]]);
    }
    if(msg[0] == 'ajout'){
      let h = 0;
      for(j in id){
        if(users[0][j] == msg[1]){
          h = 1;
          break;
        }
      }
      if(h == 0){
        nom = msg[1];
        mots = msg[2];
        io.to(msg[3]).emit('chat message', ['success',msg[1]]);
      }
      else{
        io.to(msg[3]).emit('chat message', 'rejeter');
      }
    }
    if(msg[0] =='kk'){
      let mot = '';
      for(t in msg[1]){
        if(t>=1){
          mot = mot + msg[1][t];
        }
      }
      utilisateur.push([mot, socket.id]);
    }
    if(msg[0] == 'connect'){
      for(j in id){
        if(users[0][j] == msg[1] && users[1][j] == msg[2]){
          io.to(msg[3]).emit('chat message', ['success',msg[1]]);
          break;
        }
      }
    }
  });
});