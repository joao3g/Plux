const rotas = require("express").Router();
const mysql = require("../../bd/bd").pool;

const md5 = require("md5")

//login (ADMIN)
rotas.post('/', (req, res) => {
    const senha = md5(req.body.senha);
    const cpf = req.body.cpf;

    //abrindo conexao mysql
    mysql.getConnection((error, conn) => {
        conn.query(
            "SELECT usuario.usu_login, usuario.usu_isAtivo, usuario.usu_isAdmin, usuario.usu_isPrimeiroAcesso, funcionario.fun_nome, funcionario.fun_email, funcionario.fun_telefone FROM usuario INNER JOIN funcionario ON usuario.usu_login=funcionario.fun_cpf WHERE usu_login = ? AND usu_senha = ?;",
            [cpf, senha],
            (err, result) => {
                if (err) res.status(500).send({ err: err, response: null });
                if (result.length > 0) {
                    res.status(200).send(result)
                } else res.send({ err: err, result: result, message: "Login/senha nao confere" })
            })
    });
});


module.exports = rotas;