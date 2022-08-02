const chai = require('chai');
const axios = require('axios');
const expect = chai.expect;

describe('Registrar Funcionario', () => {
     it('Funcionario 1', async () => {
          const payload = { 
               "cpf": '456.789.123-05',
               "nome": 'João Gabriel',
               "email": 'joao@email.com',
               "telefone": '38991794066'
          }

          let res = await axios.post(
               'http://localhost:3010/funcionarios/cadastrar', payload);
          
          expect(res.status).be.equal(200);

     });

     it('Funcionario 2', async () => {
          const payload = { 
               "cpf": '321.987.654-77',
               "nome": 'Marcos Samuel',
               "email": 'marcos@email.com',
               "telefone": '38998530074'
          }

          let res = await axios.post(
               'http://localhost:3010/funcionarios/cadastrar', payload);
          
          expect(res.status).be.equal(200);
          
     });

     it('Funcionario 3', async () => {
          const payload = { 
               "cpf": '987.654.321-01',
               "nome": 'Fabiano Alves',
               "email": 'fabiano@email.com',
               "telefone": '38998522598'
          }

          let res = await axios.post(
               'http://localhost:3010/funcionarios/cadastrar', payload);
          
          expect(res.status).be.equal(200);
          
     });

     it('Funcionario 4', async () => {
          const payload = { 
               "cpf": '123.456.789-10',
               "nome": 'Enzo Honorato',
               "email": 'enzo@email.com',
               "telefone": '38998063722'
          }

          let res = await axios.post(
               'http://localhost:3010/funcionarios/cadastrar', payload);
          
          expect(res.status).be.equal(200);
          
     });
     
});
