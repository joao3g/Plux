import './usuarios.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//import { userRows } from '../../datas/dummyData'

import axios from 'axios'

export default function UserList() {

    //const [data, setData] = useState(userRows);
    const [users, setUsers] = useState([])
    const [lastUser,setLastUser] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)


    const handleDelete = (id) => {
        setUsers(users.filter(item => item.id !== id))
    }

    const columns = [
      { field: "codigo", headerName: "Codigo", width: 90 },
      {
        field: "login",
        headerName: "Usuário",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="userListUser">
              {/*<img className="userListImg" src={params.row.avatar} alt="" />*/}
              {params.row.login}
            </div>
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
      },
      {
        field: "Perfil",
        headerName: "perfil",
        width: 160,
      },
      {
        field: "action",
        headerName: "Opção",
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <Link to={"/usuario/" + params.row.id}>
                <button className="userListEdit">Editar</button>
              </Link>
              <DeleteOutline
                className="userListDelete"
                onClick={() => handleDelete(params.row.id)}
              />
            </>
          );
        },
      },
    ];
  
    useEffect(() =>{
      getUsers()
      return() => {

      }
    }, [])

    //Usa pra buscar todos os usuarios
    const getUsers = async () => {
      await axios.get('http://localhost:3010/user/all')
      .then((response) => {
        //console.log('get usuarios' + JSON.stringify(response.data));
        updateState(response.data);
        console.log('usuarios do get ' + JSON.stringify(response.data))
      }).catch((err) => {
        console.log('error: ' + err)
        setLoadingMore(false)
      })
      setLoading(false)
    }

    //verifincado se tem dados dos funcionarios cadastrados 
    const updateState = async (dados) => {
      const isDataEmpty = dados.size === 0;

      if(!isDataEmpty){
        let lista = [];

        dados.forEach(element => {
          lista.push({
            codigo: element.usu_codigo,
            login: element.usu_login,
            perfil: element.usu_isAdmin,
            status: element.usu_isPrimeiroAcesso
          })
        });
        
        const LastUserr = dados[(dados.length-1)]
        setUsers(users => [...users, ...lista ])
        setLastUser(LastUserr)
        console.log('USUARIOS DA LISTA'+JSON.stringify(lista))
        console.log('Usuarios agora'+ users)
      }else{  
        setIsEmpty(true)
      }
      setLoadingMore(false);
    }

    async function handleMore(){
      setLoadingMore(true);
    
      //var isDataListFunc = listFuncionario.indexOf(listFuncionario[listFuncionario.length -1])
    
      //var isDataLastFunc = lastFuncionario[lastFuncionario.length -1]

        await axios.post('http://localhost:3010/user/getId',{
          ultimoId: lastUser['usu_id'],
        }).then((response) => {
          console.log("ultimos arrays"+response.data)
          updateState(response.data)
        })
        setIsEmpty(true)
    }
  

    return(
      <>
      <div className="userList">
      <div className="user">
      <div className="userTitleContainer">
      <h1 className="userTitle">Editar Usuários</h1>
      </div>
      </div>
            <DataGrid 
             rows={users}
             disableSelectionOnClick
             getRowId={(row) => row.codigo}
             columns={columns}
             pageSize={8}
             checkboxSelection
            />
        </div>
      
        </>

    )



}