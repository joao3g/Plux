import { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom";

import { AuthContext } from '../../../contexts/Auth'

import "./horario.css";

import Input from "../../../components/Input"
import { Box } from "@mui/system";

import Select from 'react-select'


export default function Home() {

     const { listFuncHorarios, addHorario } = useContext(AuthContext);
     const history = useHistory();

     useEffect(async () => {
          const response = await listFuncHorarios();
          var onlyCPF = [];
          response.data.map((user) =>{
               onlyCPF.push({
                    value: user.fun_cpf,
                    label: user.horario_codigo ? user.fun_nome + " (Desabilitado)" : user.fun_cpf,
                    disabled: user.horario_codigo ? true : false
               })
          }
          )
          setCPFs(onlyCPF)
     }, []);

     const customStyles = {
          option: (provided, state) => ({
               ...provided,
               color: state.isDisabled ? '#0f0d35' : (state.isSelected ? '#fff' : '#2e384d'),
               backgroundColor: state.isDisabled ? '#2e384d' : (state.isSelected ? '#0f0d35' : '#fff'),
               padding: 20,
          }),
          control: (provided) => ({
               ...provided,
               // none of react-select's styles are passed to <Control />
               width: 500,
               backgroundColor: '#fff',
               flexDirection: 'row'
          }),
          singleValue: (provided, state) => {
               const opacity = state.isDisabled ? 0.5 : 1;
               const transition = 'opacity 300ms';

               return { ...provided, opacity, transition };
          },
          menu: () => ({
               width: 500,
               padding: 20,
               backgroundColor: '#fff'
          })
     }

     async function Submit() {
          try {
               var res = await addHorario(Entrada1, Saida1, Entrada2, Saida2, CPF)
               if (res) history.push('/dashboard')

          } catch (e) {
               console.log(e.message ?? 'Deu erro')
          }

     }

     const [CPF, setCPF] = useState('')
     const [CPFs, setCPFs] = useState([{}])
     const [Entrada1, setEntrada1] = useState('')
     const [Saida1, setSaida1] = useState('')
     const [Entrada2, setEntrada2] = useState('')
     const [Saida2, setSaida2] = useState('')

     return (
          <div className="home">
               <div className="mainForm">
                    <h3 className="formTitle">Informe os dados no formulário abaixo para cadastrar um horário:</h3>
                    <div className="lineForm">
                         <div className="groupForm">
                              <fieldset>
                                   <legend>Horário 1</legend>
                                   <Input
                                        type="text"
                                        label="Entrada"
                                        value={Entrada1}
                                        mask="h9:m9:00"
                                        maskChar={null}
                                        maskPlaceholder="-"
                                        formatChars={{ "9": "[0-9]", "h": "[0-2]", "m": "[0-5]" }}
                                        onChange={setEntrada1}
                                        required
                                        style={{
                                             width: 300,
                                             marginRight: 20
                                        }}
                                   />
                                   <Input
                                        type="text"
                                        label="Saida"
                                        mask="h9:m9:00"
                                        value={Saida1}
                                        maskChar={null}
                                        maskPlaceholder="-"
                                        formatChars={{ "9": "[0-9]", "h": "[0-2]", "m": "[0-5]" }}
                                        onChange={setSaida1}
                                        required
                                        style={{
                                             width: 300,
                                             marginRight: 20
                                        }}
                                   />
                              </fieldset>
                              <fieldset>
                                   <legend>Horário 2 (Opcional)</legend>
                                   <Input
                                        type="text"
                                        label="Entrada"
                                        value={Entrada2}
                                        mask="h9:m9:00"
                                        maskChar={null}
                                        maskPlaceholder="-"
                                        formatChars={{ "9": "[0-9]", "h": "[0-2]", "m": "[0-5]" }}
                                        onChange={setEntrada2}
                                        required
                                        style={{
                                             width: 300,
                                             marginRight: 20
                                        }}
                                   />
                                   <Input
                                        type="text"
                                        label="Saida"
                                        mask="h9:m9:00"
                                        value={Saida2}
                                        maskChar={null}
                                        maskPlaceholder="-"
                                        formatChars={{ "9": "[0-9]", "h": "[0-2]", "m": "[0-5]" }}
                                        onChange={setSaida2}
                                        required
                                        style={{
                                             width: 300,
                                             marginRight: 20
                                        }}
                                   />
                              </fieldset>
                         </div>

                         <div className="selectForm">
                              <Select
                                   styles={customStyles}
                                   placeholder="Selecione um funcionário"
                                   options={CPFs}
                                   onChange={e => setCPF(e.value)}
                                   isOptionDisabled={(option) => option.disabled}
                              />
                         </div>
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