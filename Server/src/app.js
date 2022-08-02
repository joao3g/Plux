const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//importando rotas
const marcarPonto = require('./routes/marcarPonto');

//------------------- usuario ------------------//
const users = require('./routes/users/get-users');
const newUser = require('./routes//users/new-user');

//------------------- auth ------------------//
const login = require('./routes/Autenticacao/login');
const cadastro = require('./routes/Autenticacao/cadastro');

//------------------- Funcionario ----------------------//
const Funcionarios = require('./routes/Funcionarios');

//----------------------Empresa-------------------------//
const Empresa = require('./routes/Empresa');

//-------------------- Horario -------------------------//
const Horarios = require('./routes/Horarios');

//------------------- Empresa ------------------//
const settings = require('./routes/settings/settings');
 

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

cors({credentials: true, origin: true})
app.use(cors());

//resolvendo cabeçalho do servidor CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Header", 
        "Origin, X-Requested-With, Accept, Content-Type, Authorization"
        );

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE')
        return res.status(200).send({});
    }
    next();
})


//criando  rotas
app.use('/login', login);
app.use('/cadastro', cadastro);

//rotas users
app.use('/user', users); //{ /all, /getId }//
app.use('/newUser', newUser);

//rotas funcionarios
app.use('/funcionarios', Funcionarios); // {/cadastrar }

//rotas empresa
app.use('/empresa', Empresa); // {/alterar }

app.use('/horarios', Horarios); //{/cadastrar }

//marcar ponto
app.use('/marcaPonto', marcarPonto)

//Settings
app.use('/empresa', settings)


//quando nao encontra a rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado!');
    erro.status = 404;
    next(erro);
});



//resolvendo ERROS
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
      erro: {
          mensagem: error.message 
      }
  })
});


module.exports = app;

