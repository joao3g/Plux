const rotas = require("express").Router();
const mysql = require("../../bd/bd").pool;

const md5 = require("md5")

//CADASTRO DE FUNCIONARIO
rotas.post('/cadastrar', (req, res) => {

     const nome = req.body.nome
     const cpf = req.body.cpf
     const email = req.body.email
     const telefone = req.body.telefone

     //abrindo conexao mysql
     mysql.getConnection((error, conn) => {
          conn.query(
               "SELECT COUNT(*) verificar from funcionario where fun_cpf = ?",
               [cpf],
               (err, result) => {
                    if (err) res.status(500).send({ err: err, response: null });
                    if (result) {

                         const verif = JSON.stringify(result);
                         const json = JSON.parse(verif);

                         const Id = json[0].verificar;
                         if (Id === 1) {
                              return res.status(422).json({ message: 'Já existe um funcionário com esse CPF!' })

                         } else if (Id === 0) {
                              conn.release();
                              conn.query("INSERT INTO funcionario (fun_cpf, fun_nome, fun_email, fun_telefone) VALUES (?,?,?,?)",
                                   [cpf, nome, email, telefone], (err, result) => {
                                        if (err) res.status(500).send({ err: err });
                                        if (result) {
                                             return res.status(200).json({ message: "Funcionário cadastrado com sucesso!" })
                                        }
                                   })
                         }
                    }
               });

     });
});

rotas.post('/alterar', (req, res) => {

     const nome = req.body.nome
     const cpf = req.body.cpf
     const cpfAntigo = req.body.cpfAntigo
     const email = req.body.email
     const telefone = req.body.telefone
     const admin = req.body.admin


     //abrindo conexao mysql
     mysql.getConnection((error, conn) => {
          conn.query("UPDATE funcionario f INNER JOIN usuario u ON f.fun_cpf=u.usu_login SET f.fun_nome=?, f.fun_email=?, f.fun_telefone=?, u.usu_isAdmin=? WHERE f.fun_cpf=?",
               [nome, email, telefone, admin, cpfAntigo], (err, result) => {
                    if (err) {
                         console.log(err)
                         res.status(500).send({ ok: false, err: err });
                    }
                    if (result) {
                         conn.release();
                         conn.query("UPDATE funcionario SET fun_cpf=? WHERE fun_cpf=?",
                              [cpf, cpfAntigo], (err, result) => {
                                   if (err) {
                                        console.log(err)
                                        res.status(500).send({ ok: false, err: err });
                                   }
                                   if (result) {
                                        return res.status(200).json({ ok: true, message: "Dados alterados com sucesso!", result: result })
                                   }
                              })
                    }
               })
     });
});

rotas.get('/horarios', (req, res) => {

     //abrindo conexao mysql
     mysql.getConnection((error, conn) => {
          conn.query(
               "SELECT fun_cpf, horario_codigo FROM funcionario LEFT JOIN horario ON funcionario.fun_cpf=horario.horario_cpf_fun",
               (err, result) => {
                    if (err) res.status(500).send({ err: err, response: null });
                    if (result) {
                         res.status(200).send(result)
                    }
               });

     });
});

rotas.get('/ativos', (req, res) => {

     //abrindo conexao mysql
     mysql.getConnection((error, conn) => {
          conn.query(
               "SELECT * FROM funcionario INNER JOIN usuario ON funcionario.fun_cpf=usuario.usu_login WHERE usuario.usu_isAtivo=1",
               (err, result) => {
                    if (err) res.status(500).send({ err: err, response: null });
                    if (result) {
                         res.status(200).send(result)
                    }
               });

     });
});

rotas.get('/todos', (req, res) => {

     //abrindo conexao mysql
     mysql.getConnection((error, conn) => {
          conn.query(
               "SELECT * FROM funcionario INNER JOIN usuario ON funcionario.fun_cpf=usuario.usu_login",
               (err, result) => {
                    if (err) res.status(500).send({ err: err, response: null });
                    if (result) {
                         res.status(200).send(result)
                    }
               });

     });
});

rotas.post('/delete', (req, res) => {

     const cpf = req.body.cpf

     mysql.getConnection((error, conn) => {
          conn.query("UPDATE usuario SET usu_isAtivo=0 WHERE usu_login=?;",
               [cpf], (err, result) => {
                    if (err) res.status(500).send({ ok: false, err: err });
                    if (result) {
                         return res.status(200).json({ ok: true, message: "Funcionário deletado com sucesso!" })
                    }
               });
     });
});

rotas.post('/buscar', (req, res) => {

     const cpf = req.body.cpf

     //abrindo conexao mysql
     mysql.getConnection((error, conn) => {
          conn.query(
               "SELECT * FROM funcionario INNER JOIN usuario ON funcionario.fun_cpf=usuario.usu_login WHERE usuario.usu_isAtivo=1 AND usuario.usu_login=?",
               [cpf],
               (err, result) => {
                    if (err) res.status(500).send({ ok: false, err: err, response: null });
                    if (result) {
                         res.status(200).send({ ok: true, result: result })
                    }
               });

     });
});

rotas.post('/alterarsenha', (req, res) => {

     const cpf = req.body.cpf
     const senha = md5(req.body.senha)

     //abrindo conexao mysql
     mysql.getConnection((error, conn) => {
          conn.query(
               "UPDATE usuario SET usu_isPrimeiroAcesso=0, usu_senha=? WHERE usu_login=?",
               [senha, cpf],
               (err, result) => {
                    if (err) res.status(500).send({ ok: false, err: err, result: null });
                    if (result) {
                         res.status(200).send({ ok: true, result: result })
                    }
               });

     });
});


module.exports = rotas;
