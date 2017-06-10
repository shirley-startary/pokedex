var express = require('express');
var app = express();
app.use(express.static(__dirname +'/public/'))
// console.log(__dirname);
/*app.get("/",function(req, res){
  res.send("hola!");
});

app.get("/shirley",function(req, res){
  res.send("hola!, como estas?");
});*/
app.listen(3000, function(){
  console.log("servidor Escuchando http//localhost:3000");
});
