const rotas = require("express").Router();
const mysql = require("../../bd/bd").pool;

//CADASTRO DE HORARIO
rotas.post('/cadastrar', (req, res) => {

     const entrada1 = req.body.entrada1
     const saida1 = req.body.saida1
     const entrada2 = req.body.entrada2
     const saida2 = req.body.saida2
     const cpf = req.body.cpf

     //abrindo conexao mysql
     mysql.getConnection((error, conn) => {

          conn.query("INSERT INTO horario (horario_cpf_fun, horario_entrada1, horario_saida1, horario_entrada2, horario_saida2) VALUES (?,?,?,?,?)",
               [cpf, entrada1, saida1, entrada2, saida2], (err, result) => {
                    if (err) {
                         console.log(err)
                         return res.status(501).send({ err: err, alo: "olá" });
                    }
                    if (result) {
                         return res.status(200).json({ message: "Horario cadastrado com sucesso!" })
                    }
               })
     });
});


rotas.get('/now', (req, res) => {

     try {
          const now = new Date();

          const hora = now.getHours().toLocaleString('en-US', {
               minimumIntegerDigits: 2
          });
          const minuto = now.getMinutes().toLocaleString('en-US', {
               minimumIntegerDigits: 2
          });
          const segundo = now.getSeconds().toLocaleString('en-US', {
               minimumIntegerDigits: 2
          });

          const day = now.getDate().toLocaleString('en-US', {
               minimumIntegerDigits: 2
          });;
          const month = now.getMonth().toLocaleString('en-US', {
               minimumIntegerDigits: 2
          });;
          const year = now.getFullYear();
     
          const date = year+'-'+month+'-'+day;

          const time = hora + ':' + minuto + ':' + segundo;

          return res.status(200).send({ ok: true, time: time, date: date })
     } catch (err) {
          return res.status(500).send({ ok: false, message: 'Erro ao pegar hora atual!', err: err })
     }
});

rotas.post('/horastrabalhadas', (req, res) => {

     const cpf = req.body.cpf

     mysql.getConnection((error, conn) => {

          conn.query("SELECT * FROM registros_ponto LIMIT 5",
               [cpf, entrada1, saida1, entrada2, saida2], (err, result) => {
                    if (err) {
                         console.log(err)
                         return res.status(501).send({ err: err, alo: "olá" });
                    }
                    if (result) {
                         return res.status(200).json({ message: "Horario cadastrado com sucesso!" })
                    }
               })
     });
     
});

rotas.post('/new', (req, res) => {

     const today = new Date();

     const day = today.getDate().toLocaleString('en-US', {
          minimumIntegerDigits: 2
     });;
     const month = today.getMonth().toLocaleString('en-US', {
          minimumIntegerDigits: 2
     });;
     const year = today.getFullYear();

     const date = year+'-'+month+'-'+day;

     const cpf = req.body.cpf
     const time = req.body.time

     mysql.getConnection((error, conn) => {
          conn.query(
               "SELECT * FROM registros_ponto WHERE reg_cpf_fun=? AND reg_data=?",
               [cpf, date],
               (err, result) => {
                    if (err) res.status(500).send({ ok: false, err: err, message: "Erro ao registrar ponto!" });
                    if (result) {

                         const verif = JSON.stringify(result);
                         const json = JSON.parse(verif);

                         const Id = json.length;
                         if (Id === 1) {
                              if(json[0].reg_saida1==null){
                                   conn.release();
                                   conn.query("UPDATE registros_ponto SET reg_saida1=? WHERE reg_cpf_fun=? AND reg_data=?;",
                                        [time, cpf, date], (err, result) => {
                                             if (err) return res.status(500).send({ ok: false, err: err, message: "Erro ao registrar ponto!"});
                                             if (result) {
                                                  return res.status(200).send({ ok: true, message: "Primeira Saida do dia Registrada com sucesso!" })
                                             }
                                        })
                              }

                              else if(json[0].reg_entrada2==null){
                                   conn.release();
                                   conn.query("UPDATE registros_ponto SET reg_entrada2=? WHERE reg_cpf_fun=? AND reg_data=?;",
                                        [time, cpf, date], (err, result) => {
                                             if (err) res.status(500).send({ ok: false, err: err, message: "Erro ao registrar ponto!"});
                                             if (result) {
                                                  return res.status(200).send({ ok: true, message: "Segunda Entrada do dia Registrada com sucesso!" })
                                             }
                                        })
                              }

                              else if(json[0].reg_saida2==null){
                                   conn.release();
                                   conn.query("UPDATE registros_ponto SET reg_saida2=? WHERE reg_cpf_fun=? AND reg_data=?;",
                                        [time, cpf, date], (err, result) => {
                                             if (err) res.status(500).send({ ok: false, err: err, message: "Erro ao registrar ponto!"});
                                             if (result) {
                                                  return res.status(200).send({ ok: true, message: "Segunda Saida do dia Registrada com sucesso!" })
                                             }
                                        })
                              }

                              else return res.status(200).send({ok: false, message: "Todos os pontos de hoje já foram batidos!"});

                         } else if (Id === 0) {
                              conn.release();
                              conn.query("INSERT INTO registros_ponto (reg_cpf_fun, reg_data, reg_entrada1) VALUES(?, ?, ?);",
                                   [cpf, date, time], (err, result) => {
                                        if (err) res.status(500).send({ ok: false, err: err, message: "Erro ao registrar ponto!"});
                                        if (result) {
                                             return res.status(200).send({ ok: true, message: "Primeira Entrada do dia Registrada com sucesso!" })
                                        }
                                   })
                         }
                    }
               });

     });
});


module.exports = rotas;
