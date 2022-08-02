import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from '@mui/icons-material';
  
  import { Link } from "react-router-dom";

  import "./editar.css";
  

  export default function User() {
    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Editar Usuario</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <div className="userShowTopTitle">
                <span className="userShowUsername">João Gabriel de Almeida Silva</span>
                <span className="userShowUserTitle">Engenheiro de Software</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Detalhes da Conta</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">joao</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">31.05.2001</span>
              </div>
              <span className="userShowTitle">Detalhes de Contato</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">(38) 9 91794066</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">joao@email.com</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">Montes Claros</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Editar</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Login</label>
                  <input
                    type="text"
                    placeholder="joao"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Senha</label>
                  <input
                    type="text"
                    placeholder="***"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>CPF</label>
                  <input
                    type="text"
                    placeholder="130.918.606-55"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <button className="userUpdateButton">Atualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }