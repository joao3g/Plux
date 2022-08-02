import { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom";

import { AuthContext } from '../../../contexts/Auth'

import "./empresa.css";

import Input from "../../../components/Input"
import { Box } from "@mui/system";

import { toast } from 'react-toastify';

export default function Home() {

     const { listEmp, alterEmp } = useContext(AuthContext);
     const history = useHistory();

     async function organize() {
          const response = await listEmp();

          setCNPJ(response.data.response[0].emp_cnpj);
          setRazaoSocial(response.data.response[0].emp_razaoSocial);
          setNomeFantasia(response.data.response[0].emp_nomeFantasia);
          setBairro(response.data.response[0].emp_bairro);
          setRua(response.data.response[0].emp_rua);
          setNumero(response.data.response[0].emp_numero);
          setCidade(response.data.response[0].emp_cidade);
          setTelefone(response.data.response[0].emp_telefone);
          setEmail(response.data.response[0].emp_email);
          setCEP(response.data.response[0].emp_cep);

          return;
     }

     useEffect(() => {
          organize();
     }, []);

     async function Submit() {
          setLoading(true);
          var res = await alterEmp(CNPJ, CEP, cidade, bairro, rua, numero, razaoSocial, email, telefone, nomeFantasia);

          setLoading(false);
          if (res.ok) {
               history.push('/dashboard');
               toast.success(res.message);
               return true;
          }
          toast.error("Erro ao atualizar dados da empresa.");
          console.error(res.err);
          return false;
     }

     const [CNPJ, setCNPJ] = useState('')
     const [CEP, setCEP] = useState('')
     const [cidade, setCidade] = useState('')
     const [bairro, setBairro] = useState('')
     const [rua, setRua] = useState('')
     const [numero, setNumero] = useState('')
     const [razaoSocial, setRazaoSocial] = useState('')
     const [telefone, setTelefone] = useState('')
     const [email, setEmail] = useState('')
     const [nomeFantasia, setNomeFantasia] = useState('')
     const [loading, setLoading] = useState(false);

     return (
          <div className="home">
               {/*<div className="homeWidgets">
                    <WidgetPonto />
               </div>*/}
               <div className="mainEmp">
                    <h3 className="formTitle">Detalhes da Empresa:</h3>
                    <div className="groupEmp">

                         <fieldset className="columnEmp">
                              <legend>Localização</legend>
                              <Input
                                   type="text"
                                   label="CEP"
                                   value={CEP}
                                   mask="99999-999"
                                   maskChar=''
                                   onChange={setCEP}
                                   required
                                   style={{
                                        width: 620,
                                        marginRight: 20
                                   }}
                              />
                              <div className="lineEmp">

                                   <Input
                                        type="text"
                                        label="Cidade"
                                        value={cidade}
                                        maskChar=''
                                        onChange={setCidade}
                                        required
                                        style={{
                                             width: 300,
                                             marginRight: 20
                                        }}
                                   />
                                   <Input
                                        type="text"
                                        label="Bairro"
                                        value={bairro}
                                        maskChar=''
                                        onChange={setBairro}
                                        required
                                        style={{
                                             width: 300,
                                             marginRight: 20
                                        }}
                                   />
                              </div>
                              <div className="lineEmp">
                                   <Input
                                        type="text"
                                        label="Rua"
                                        value={rua}
                                        maskChar=''
                                        onChange={setRua}
                                        required
                                        style={{
                                             width: 300,
                                             marginRight: 20
                                        }}
                                   />
                                   <Input
                                        type="text"
                                        label="Numero"
                                        value={numero}
                                        mask="999"
                                        maskChar=''
                                        onChange={setNumero}
                                        required
                                        style={{
                                             width: 300,
                                             marginRight: 20
                                        }}
                                   />
                              </div>
                         </fieldset>

                         <fieldset className="columnEmp">
                              <legend>Dados</legend>
                              <Input
                                   type="text"
                                   label="CNPJ"
                                   value={CNPJ}
                                   mask="99.999.999/\0\0\02-99"
                                   formatChars={{ "9": "[0-9]", "2": "[1-2]" }}
                                   maskChar=''
                                   onChange={setCNPJ}
                                   required
                                   style={{
                                        width: 620,
                                        marginRight: 20
                                   }}
                              />
                              <div className="lineEmp">

                                   <Input
                                        type="text"
                                        label="Razao Social"
                                        value={razaoSocial}
                                        maskChar=''
                                        onChange={setRazaoSocial}
                                        required
                                        style={{
                                             width: 300,
                                             marginRight: 20
                                        }}
                                   />
                                   <Input
                                        type="text"
                                        label="Nome Fantasia"
                                        value={nomeFantasia}
                                        maskChar=''
                                        onChange={setNomeFantasia}
                                        required
                                        style={{
                                             width: 300,
                                             marginRight: 20
                                        }}
                                   />
                              </div>
                              <div className="lineEmp">
                                   <Input
                                        type="text"
                                        label="E-mail"
                                        value={email}
                                        maskChar=''
                                        onChange={setEmail}
                                        required
                                        style={{
                                             width: 300,
                                             marginRight: 20
                                        }}
                                   />
                                   <Input
                                        type="text"
                                        label="Telefone"
                                        value={telefone}
                                        mask="(99)?9999-9999"
                                        maskChar=''
                                        formatChars={{ "9": "[0-9]", "?": "[0-9 ]" }}
                                        onChange={setTelefone}
                                        required
                                        style={{
                                             width: 300,
                                             marginRight: 20
                                        }}
                                   />
                              </div>
                         </fieldset>
                    </div>

                    <Box textAlign="center">
                         <button onClick={() => Submit()} className={`
                              w-1/4 center bg-indigo-500 hover:bg-indigo-400
                              text-white rounded-lg px-4 py-3 mt-6
                         `}>
                              Alterar Dados
                         </button>
                    </Box>
               </div>

          </div>
     );
} 