const rotas = require("express").Router();
const mysql = require("../../bd/bd").pool;

//---------------------------------cadastro de usuario-----------------------------------//
function checkClientExists(req, res, next) {
    if(!req.body.status|| !req.body.perfil || !req.body.senha || !req.body.login || !req.body.codigo || !req.body.email) {
      return res.status(404).send({message: "dados nao informado"})
    }
    return next();
  
}
  
  rotas.post('/',checkClientExists, (req, res) => {
  
    const senha  = req.body.senha
    const login  = req.body.login
    const codigo  = req.body.codigo
    const nome  = req.body.nome
    const email  = req.body.email
    const whatsapp = req.body.whatsapp
    const perfil  = req.body.perfil
    const status  = req.body.status
    
    
    //abrindo conexao mysql
    mysql.getConnection((error, conn) => {
      conn.query(
        `
        SELECT COUNT(*) verificar from cad_usuario where usu_email = ?
        `, 
        [email],
        (err, result) => {
          if(err) res.status(500).send({err: err, response: null});
          if(result){
          console.log("Verificado " + JSON.stringify(result));
          const verif = JSON.stringify(result);
          console.log("Verificar: " + verif);
          const json = JSON.parse(verif);
          console.log(json[0].verificar)
          const Id = json[0].verificar; 
          if(Id === 1){
            return res.status(422).json({message: 'E-mail já cadastrado!'})
          }else if(Id === 0){ 
            conn.release(); 
            conn.query("INSERT INTO cad_usuario (usu_nome, usu_login, usu_senha, usu_status, usu_email, usu_perfil, usu_whatsapp, usu_codigo) VALUES (?,?,?,?,?,?,?,?)",
              [nome,login,senha, status, email,perfil,whatsapp,codigo],  (err, results) => {
                if(err) res.send({err: err});
                if(result.length > 0){
                  return res.status(200).send({message: "successfull dados gravados"})
                  }          
              })
            }
         }else res.send({message: "ops ocorreu algum problema"})
        }); 
    });
});
//-------------------------------------------------------------------------------------//


  module.exports = rotas;