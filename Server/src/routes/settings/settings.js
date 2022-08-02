const rotas = require("express").Router();
const mysql = require("../../bd/bd").pool;


//---------------------------------GET empresa-----------------------------------//

rotas.get('/', (req, res) => {

  //abrindo conexao mysql
  mysql.getConnection((error, conn) => { 
    conn.query( 
      "SELECT * FROM cad_empresa",
      (err, result) => {
       if(err) res.send({err: err});
       if(result){
         return res.send(result);
        }
       else res.send({message: "Ops ocorreu um erro"})
      })
  
  });
});
  
  
  //-------------------------------------------------------------------------------------//
  

  
  module.exports = rotas;