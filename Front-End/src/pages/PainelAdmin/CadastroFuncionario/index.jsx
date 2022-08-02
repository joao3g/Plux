import { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom";

import { AuthContext } from '../../../contexts/Auth'

import "./cad_funcionarios.css";

import Input from "../../../components/Input"
import { Box } from "@mui/system";

export default function Home() {

     const { addFunc } = useContext(AuthContext);
     const history = useHistory();

     async function Submit() {
          try {
               console.log(CPF);
               var res = await addFunc(Nome, Email, Telefone, CPF)
               if(res) history.push('/dashboard')

          } catch (e) {
               console.log(e.message ?? 'Deu erro')
          }

     }

     const [CPF, setCPF] = useState('')
     const [Nome, setNome] = useState('')
     const [Telefone, setTelefone] = useState('')
     const [Email, setEmail] = useState('')
     const [Admin, setAdmin] = useState('0')

     return (
          <div className="home">
               {/*<div className="homeWidgets">
                    <WidgetPonto />
               </div>*/}
               <div className="mainForm">
                    <h3 className="formTitle">Informe os dados no formulário abaixo para cadastrar um funcionário:</h3>
                    <div className="lineForm">
                         <Input
                              type="text"
                              label="Nome Completo"
                              value={Nome}
                              onChange={setNome}
                              required
                              style={{
                                   width: 700,
                                   marginRight: 20
                              }}
                         />
                         <Input
                              type="email"
                              label="E-mail"
                              value={Email}
                              onChange={setEmail}
                              required
                              style={{
                                   width: 700
                              }}
                         />
                    </div>
                         <div className="lineForm">
                              <Input
                                   type="text"
                                   label="CPF"
                                   mask="999.999.999-99"
                                   maskChar=""
                                   value={CPF}
                                   onChange={setCPF}
                                   required
                                   style={{
                                        width: 700,
                                        marginRight: 20
                                   }}
                              />
                              <Input
                                   type="text"
                                   label="Telefone"
                                   mask="(99)\99999-9999"
                                   maskChar=""
                                   value={Telefone}
                                   onChange={setTelefone}
                                   required
                                   style={{
                                        width: 700
                                   }}
                              />
                         </div>
                    <Box textAlign="center">
                         <button onClick={Submit} className={`
                              w-1/4 center bg-indigo-500 hover:bg-indigo-400
                              text-white rounded-lg px-4 py-3 mt-6
                         `}>
                              Cadastrar
                         </button>
                    </Box>
               </div>

          </div>
     );
} 