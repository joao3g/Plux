import { useState, useContext, useEffect } from "react"

import "./listar_funcionario.css";

import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { toast } from 'react-toastify';

import { AuthContext } from '../../../contexts/Auth'

import { Link, useHistory } from "react-router-dom";

const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 900,
     bgcolor: 'background.paper',
     border: '1 solid #000',
     boxShadow: 24,
     pt: 2,
     px: 4,
     pb: 3,

}

export default function Home() {

     const [users, setUsers] = useState([]);
     const [userDelete, setUserDelete] = useState('');
     const [cpfDelete, setCPFDelete] = useState('');
     const [loading, setLoading] = useState(false);
     const [open, setOpen] = useState(false);
     
     const { listAllFunc, deleteUser } = useContext(AuthContext);
     const history = useHistory();

     async function organize() {
          const response = await listAllFunc();

          return setUsers(response.data)
     }

     function handleDeleteModal(user) {
          setUserDelete(user.fun_nome);
          setCPFDelete(user.fun_cpf);
          setOpen(true);
          return;
     }

     async function handleDeleteUser(cpf) {
          setLoading(true);
          const response = await deleteUser(cpf);
          
          setLoading(false);
          setOpen(false);
          if(response.data.ok){
               history.push('/dashboard');
               toast.success(response.data.message);
               return true;
          }
          toast.error('Erro ao excluir usuário!');
          console.error(response.data.err);
          return false
     }

     useEffect(() => {
          organize();
     }, []);

     return (
          <div className="home">
               <div className="mainDiv">
                    <h3 className="formTitle">Todos os funcionários:</h3>
                    <div className="funcHeader">
                         <div className="funcInfo">
                              <span className="cpf" style={{ marginLeft: 40, marginRight: 240 }}>CPF</span>
                              <span className="nome">NOME COMPLETO</span>
                         </div>
                    </div>
                    {users.map((user, index) => {
                         return (<div key={index} className="func">
                              <div className="funcInfo">
                                   <span className="cpf">{user.fun_cpf}</span>
                                   <span className="nome">{user.fun_nome}</span>
                              </div>
                              <div className="funcDetails">
                                   <DeleteIcon className="Icon deleteIcon" onClick={() => handleDeleteModal(user)} />
                                   <Link to={{ pathname: '/detalhesusuario', state: { user: user } }}>
                                        <ManageAccountsIcon className="settingsIcon Icon" />
                                   </Link>
                              </div>
                         </div>)
                    })}
                    <Modal
                         open={open}
                         onClose={() => setOpen(false)}
                         aria-labelledby="Delete"
                         aria-describedby="Modal para deletar usuário"
                    >
                         <Box sx={{ ...style, width: 700, borderRadius: 2 }}>
                              <div className="deletedMain">
                                   <p>Tem certeza que quer deletar <span className="userDeleted">{userDelete}</span>?</p>
                                   <div className="buttonsDiv">
                                        <button className="deleteButton" type="submit" onClick={() => handleDeleteUser(cpfDelete)} disabled={loading}>{loading ? 'Deletando...' : 'Deletar'}</button>
                                        <button className="cancelButton" type="submit" onClick={() => setOpen(false)}>Cancelar</button>
                                   </div>
                              </div>
                         </Box>
                    </Modal>
               </div>
          </div >
     );
}