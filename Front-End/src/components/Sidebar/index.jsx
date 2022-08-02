import React, { useContext, useState, } from 'react';
import './sidebar.css'
import { LineStyle, Timeline, Settings, Logout, SupervisedUserCircle } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PeopleIcon from '@mui/icons-material/People';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth"


export default function Sidebar() {

  const { signOut } = useContext(AuthContext)

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Meu ponto</h3>
          <ul className="sidebarList">
            <Link to="/dashboard" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Registrar Ponto
              </li>
            </Link>
            <Link to="/registrodepontos" className="link">
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Meus Registros
              </li>
            </Link>

          </ul>
        </div><ToastContainer autoClose={2500} position="top-right" />

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Funcionários</h3>
          <ul className="sidebarList">
            <Link to="/cadastrarfuncionario" className="link">
              <li className="sidebarListItem ">
                <PersonAddAlt1Icon className="sidebarIcon" />
                Cadastrar Funcionários
              </li>
            </Link>
            <Link to="/listarfuncionario" className="link">
              <li className="sidebarListItem ">
                <PeopleIcon className="sidebarIcon" />
                Listar Funcionários
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Horários</h3>
          <ul className="sidebarList">
            <Link to="/cadastrarhorario" className="link">
              <li className="sidebarListItem ">
                <MoreTimeIcon className="sidebarIcon" />
                Cadastrar Horário
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Empresa</h3>
          <ul className="sidebarList">
            <Link to="/empresa" className="link">
              <li className="sidebarListItem">
                <AssignmentIcon className="sidebarIcon" />
                Alterar Informações
              </li>
            </Link>
          </ul>
          <br/>
          <ul className="sidebarList">
            <li className="sidebarListItemLogout">
              <button
                onClick={() => signOut()}
              >
                <Logout className="sidebarIconLogout" />
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}