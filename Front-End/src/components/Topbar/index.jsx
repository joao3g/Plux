
import React from "react";
import "./topbar.css";
import { NotificationsNone, Settings } from '@mui/icons-material';
import HoraAtual from '../HoraAtual';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Plux</span>
          <span className="slogan">Sistema de controle de ponto da ZL Tecnologia</span>
        </div>
        <div className="topRight">
          <span className="horaAtual"> <HoraAtual /> </span>
        </div>
      </div>
    </div>
  );
}