import { useState, useContext, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom";

import { AuthContext } from '../../../../contexts/Auth'

import "./detalhe.css";

import Input from "../../../../components/Input"
import { Box } from "@mui/system";

import { toast } from 'react-toastify';

export default function Home() {

     const { alterFunc } = useContext(AuthContext);
     const history = useHistory();
     const location = useLocation();

     async function Submit() {
          setLoading(true);
          var res = await alterFunc(Nome, Email, Telefone, CPF, CPFAntigo, Admin);

          setLoading(false);
          if (res.ok) {
               history.push('/dashboard');
               toast.success(res.message);
               return true;
          }
          toast.error("Erro ao atualizar dados do usuário.");
          console.error(res.err);
          return false;
     }

     const [CPFAntigo, setCPFAntigo] = useState(location.state.user.fun_cpf)
     const [CPF, setCPF] = useState(location.state.user.fun_cpf)
     const [Nome, setNome] = useState(location.state.user.fun_nome)
     const [Telefone, setTelefone] = useState(location.state.user.fun_telefone)
     const [Email, setEmail] = useState(location.state.user.fun_email)
     const [Admin, setAdmin] = useState(location.state.user.usu_isAdmin)
     const [loading, setLoading] = useState(false);

     return (
          <div className="home">
               {/*<div className="homeWidgets">
                    <WidgetPonto />
               </div>*/}
               <div className="mainForm">
                    <h3 className="formTitle">Detalhes do Usuário:</h3>
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
                         <div className="columnForm">
                              <Input
                                   type="text"
                                   label="CPF"
                                   mask="999.999.999-99"
                                   maskChar=""
                                   value={CPF}
                                   onChange={setCPF}
                                   required
                                   style={{
                                        width: 700
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

                         <div className="groupForm">
                              <div className="radioForm">
                                   <h1 id="radioTitle">Administrador:</h1>
                                   <div className="radioInput">
                                        <input
                                             type="radio"
                                             id="sim"
                                             value="1"
                                             name="isAdmin"
                                             checked={Admin == 1}
                                             onChange={e => setAdmin(e.target.value)}
                                        />
                                        <label htmlFor="sim"> Sim </label>
                                   </div>
                                   <div className="radioInput">
                                        <input
                                             type="radio"
                                             id="nao"
                                             value="0"
                                             name="isAdmin"
                                             checked={Admin == 0}
                                             onChange={e => setAdmin(e.target.value)}
                                        />
                                        <label htmlFor="nao"> Não </label>
                                   </div>
                              </div>
                         </div>

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