const rotas = require("express").Router();
const mysql = require("../../bd/bd").pool;

rotas.get('/', (req, res) => {
 //abrindo conexao mysql
     mysql.getConnection((error, conn) => {
          conn.query(
               "SELECT * from empresa;",
               (err, result) => {
                    if (err) res.status(500).send({ ok: false, err: err, response: null });
                    if (result) {
                         return res.status(200).json({ ok: true, message: null, response: result})
                    }
               });

     });
});

rotas.post('/alterar', (req, res) => {

     const cnpj = req.body.cnpj
     const nomeFantasia = req.body.nomeFantasia
     const razaoSocial = req.body.razaoSocial
     const email = req.body.email
     const telefone = req.body.telefone
     const cep = req.body.cep
     const cidade = req.body.cidade
     const bairro = req.body.bairro
     const rua = req.body.rua
     const numero = req.body.numero

     //abrindo conexao mysql
     mysql.getConnection((error, conn) => {
          conn.query("UPDATE empresa SET emp_cnpj=?, emp_razaoSocial=?, emp_nomeFantasia=?, emp_email=?, emp_telefone=?, emp_cep=?, emp_cidade=?, emp_bairro=?, emp_rua=?, emp_numero=?;",
               [cnpj, razaoSocial, nomeFantasia, email, telefone, cep, cidade, bairro, rua, numero], (err, result) => {
                    if (err) res.status(500).send({ ok: false, err: err });
                    if (result) {
                         return res.status(200).json({ ok: true, message: "Dados alterados com sucesso!" })
                    }
               })
     });
});

module.exports = rotas;
