
const rotas = require("express").Router();
const mysql = require("../bd/bd").pool;

rotas.post('/', (req, res) => {

    const id = req.body.adminId
    const horario = req.body.horario
    const nome =  req.body.nome
    const data = req.body.data
    const codigo = req.body.codigo
   

    //abrindo conexao mysql
    mysql.getConnection((error, conn) => { 
        conn.query(
        `
        SELECT COUNT(*) verificar from cad_usuario where  usu_id = ?
        `, 
        [id],
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
        return res.status(422).json({message: 'Usuario nao encontrado!'})
        }else if(Id === 0){ 
            conn.release(); 
            conn.query("INSERT INTO banco_horas (banch_nome, banch_horario, banch_date, banch_codigo) VALUES (?, ?, ?, ?)",
            [nome, horario, data,codigo], (err, result) => {
            if(err) res.send({err: err});
            else  return res.status(200).send({message: "successfull dados gravados"})
            });   
         }
        }else res.send({message: "Ocorreu algum erro, tente mais tarde"})
    }); 
    });
});






module.exports = rotas;
