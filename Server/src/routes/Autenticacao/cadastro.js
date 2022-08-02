const rotas = require("express").Router();
const mysql = require("../../bd/bd").pool;

//CADASTRO DE USUARIO (ADMIN)
rotas.post('/', (req, res) => {

  const nome = req.body.nome
  const senha = req.body.senha
  const email = req.body.email
  const login = req.body.login
  const perfil = "ADM";


  //abrindo conexao mysql
  mysql.getConnection((error, conn) => {
    conn.query(
      "SELECT COUNT(*) verificar from cad_usuario where usu_login = ?",
      [login],
      (err, result) => {
        if (err) res.status(500).send({ err: err, response: null });
        if (result) {

          console.log("Verificado " + JSON.stringify(result));

          const verif = JSON.stringify(result);
          console.log("Verificar: " + verif);
          const json = JSON.parse(verif);
          console.log(json[0].verificar)
          const Id = json[0].verificar;
          if (Id === 1) {
            return res.status(422).json({ message: 'ocorreu algum erro, tente mais tarde!' })

          } else if (Id === 0) {
            conn.release();
            conn.query("INSERT INTO cad_usuario (usu_nome, usu_login, usu_senha, usu_email, usu_perfil) VALUES (?,?,?,?,?)",
              [nome, login, senha, email, perfil], (err, result) => {
                if (err) res.send({ err: err });
                if (result) {
                  return res.status(200).json({ message: "successfull dados gravados" })
                }
              })
          }
        } else res.send({ message: "ops deu" })
      });

  });
});


module.exports = rotas;
