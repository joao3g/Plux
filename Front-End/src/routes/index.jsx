import { useContext } from 'react'
import { Switch, NavLink } from 'react-router-dom'
import Route from './Route'

import { AuthContext } from '../contexts/Auth'

/*** usuario ***/
//import AutenticacaoColaborador from '../pages/Autenticacao'

/**** painel ***/
import Painel from '../pages'

import RegistrosPonto from '../pages/PainelAdmin/Dashboard/registrodeponto/registroPonto'

import Dashboard from '../pages/PainelAdmin/Dashboard'
import Settings from '../pages/PainelAdmin/Settings'

import Users from '../pages/PainelAdmin/Usuarios'
import UserEdit from '../pages/PainelAdmin/Usuarios/Editar'
import NovoUsuario from '../pages/PainelAdmin/Usuarios/NovoUsuario'

import MarcaPonto from '../pages/PainelAdmin/Ponto/MarcaPonto'
import Pontos from '../pages/PainelAdmin/Ponto/Pontos'
import Espelho from '../pages/PainelAdmin/Ponto/Espelho'

import CadastrarFuncionario from '../pages/PainelAdmin/CadastroFuncionario'
import ListarFuncionario from '../pages/PainelAdmin/ListarFuncionario'
import DetalheUsuario from '../pages/PainelAdmin/ListarFuncionario/DetalheUsuario'

import Empresa from '../pages/PainelAdmin/Empresa'

import CadastrarHorario from '../pages/PainelAdmin/CadastroHorario'

//components
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SidebarUsuario from "../components/SidebarUsuario";

//Styling
import Styles from "./styles.css"


export default function Rotas() {
    const { admin } = useContext(AuthContext)
    
    return (
        <Switch>
            Painel
            <Route exact path="/login" component={Painel} />

            <>
                <Topbar />
                <div className='mainContainer'>
                    {admin ? <Sidebar /> : <SidebarUsuario/>}
                    
                    <Route exact path="/dashboard" component={Dashboard} isPrivate />

                    <Route exact path="/usuarios" component={Users} isPrivate />
                    <Route exact path="/usuario/:userId" component={UserEdit} isPrivate />
                    <Route exact path="/novousuario/" component={NovoUsuario} isPrivate />

                    <Route exact path="/marcaponto" component={MarcaPonto} isPrivate />
                    <Route exact path="/pontos" component={Pontos} isPrivate />
                    <Route exact path="/espelho" component={Espelho} isPrivate />
                    <Route exact path="/configuracao" component={Settings} isPrivate />

                    <Route exact path="/cadastrarfuncionario" component={CadastrarFuncionario} isPrivate />
                    <Route exact path="/listarfuncionario" component={ListarFuncionario} isPrivate />

                    <Route exact path="/detalhesusuario" component={DetalheUsuario} isPrivate />

                    <Route exact path="/cadastrarhorario" component={CadastrarHorario} isPrivate />

                    <Route exact path="/empresa" component={Empresa} isPrivate />

                    <Route exact path="/registrodepontos" component={RegistrosPonto} isPrivate />
                </div>
            </>
        </Switch>

    )
}  
