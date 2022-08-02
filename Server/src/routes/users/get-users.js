const rotas = require("express").Router();
const mysql = require("../../bd/bd").pool;


//---------------------------------GET usuario-----------------------------------//

rotas.get('/', (req, res) => {
    var result = { "result": "ROTA USERS OK" };
    res.send(result)
});
  

rotas.get('/all', (req, res) => {

  //abrindo conexao mysql
  mysql.getConnection((error, conn) => { 

    conn.query( 
      "SELECT * FROM usuario",
      (err, result) => {
       if(err) res.send({err: err});
       if(result){
         res.send(result)
         console.log(result)
        }
       else res.send({message: "Ops ocorreu um erro"})
      })
  
  });
});
  
  
rotas.post('/getId', (req, res) => {
    
    const ultimoId = req.body.ultimoId
  
    mysql.getConnection((error, conn) => { 
      conn.query( 
        "SELECT * FROM cad_funcionarios WHERE fun_id > ?",
        [ultimoId],(err, result) => {
          if(err) res.send({err: err});
          else res.send(result)
      })
    });
});
  
  //-------------------------------------------------------------------------------------//
  

  
  module.exports = rotas;