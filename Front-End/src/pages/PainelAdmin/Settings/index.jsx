import "./settings.css";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from '@mui/icons-material';
import React, { useState, useContext, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import ApiCep from '../../../services/ApiCep'


const baseURL = "http://localhost:3010/empresa";



export default function Settings() {

  const [disable, setDisable]           = useState(false);
  const [guardaDados, setGuardaDados]   = useState([])
  const [exibiDados, setExibiDados ]    = useState({})
  const [empresa, setEmpresa]   = useState([]);


  useEffect(() => {
      axios.get(baseURL).then(response => {
        setEmpresa(response.data);
      })
  }, []);


  const mostrarDados = empresa.map((item) => {
    return (
      <div className="userShow">
      <div className="userShowTop">
        <div className="userShowTopTitle">
          <span className="userShowUsername">{item.emp_nomefantasia}</span>
          <span className="userShowUserTitle"></span>
        </div>
      </div>
      <div className="userShowBottom">
        <span className="userShowTitle">Detalhes</span>
        <div className="userShowInfo">
          <PermIdentity className="userShowIcon" />
          <span className="userShowInfoTitle">{item.emp_razaosocial}</span>
        </div>
        <div className="userShowInfo">
          <CalendarToday className="userShowIcon" />
          <span className="userShowInfoTitle"></span>
        </div>
        <span className="userShowTitle">Contatos</span>
        <div className="userShowInfo">
          <PhoneAndroid className="userShowIcon" />
          <span className="userShowInfoTitle"></span>
        </div>
        <div className="userShowInfo">
          <MailOutline className="userShowIcon" />
          <span className="userShowInfoTitle">{item.emp_email}</span>
        </div>
        <div className="userShowInfo">
          <LocationSearching className="userShowIcon" />
          <span className="userShowInfoTitle"></span>
        </div>
        <div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/J6imba81VpcWs" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/sioks-ookami-kodomo-no-ame-to-yuki-J6imba81VpcWs"></a></p>
      </div>
    </div>
    )
  })


  const [customer, setCustomerData] = useState({
    razaoSocial: "",
    nomeFantasia: "",
    email: "",
    telefone: "",
    cnpj: "",
    numero: "",
    complemento: "",
    dadoCep: {}
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({
        ...prev,
          [name]: value 
    }));
  }


  const handleEmailChange = (e) => {
    setCustomerData(prev => ({
        ...prev,
        email: e.target.value
    }))
  }

  const handleCnpjChange = (e) => {
    setCustomerData(prev => ({
        ...prev,
        cnpj: e.target.value
    }))
  }

  // Handle telefone 
  const handleNumberChange = (e) => {
    let val = e.target.value;
    val = val.replace(/[^0-9]/gm, '');

    let num = `${val.substring(0, 3)} ${val.substring(3, 6)} ${val.substring(6, val.length)}`;
    num = num.trim();
    
    setCustomerData(prev => ({
        ...prev,
        telefone: num
    }))
  }

  //CEP
  const [endereco, setEndereco ] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
  })

  const handleDadosCep = (e) => {
    const cep = e.target.value;
    ApiCep.SearchCep(cep)
    .then(res => {
      let rua   =res.data.logradouro
      let bairro = res.data.bairro
      let cidade = res.data.localidade
      let estado = res.data.uf
      setEndereco({
        rua: rua,
        bairro: bairro,
        cidade: cidade,
        estado: estado
      })
      
      console.log("DADOS de endereço" + JSON.stringify(endereco))
      
    }).catch(err => {
      console.log(err)
    })
  }

  const CadastroEmpresa = async (e) => {
    e.preventDefault();
    setCustomerData(prev => ({
      ...prev,
      dadoCep: {endereco}
    }))  
  }

    return (
      <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Dados da Empresa</h1>
      </div>
      <div className="userContainer">
   
      {empresa && mostrarDados}

        <div className="userUpdate">
          <span className="userUpdateTitle">Editar</span>
          <form className="userUpdateForm" >
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Razao Social</label>
                <input
                  type="text"
                  placeholder="Razao Social"
                  className="userUpdateInput"
                  onChange={handleChange} 
                  name="razaoSocial"
                />
              </div>
              <div className="userUpdateItem">
                <label>CNPJ</label>
                <input
                  type="text"
                  placeholder="CNPJ"
                  className="userUpdateInput"
                  onChange={handleCnpjChange}
                  name='cnpj'
                  id='cnpj'
                  maxLength={14}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="email@email.com"
                  className="userUpdateInput"
                  onChange={handleEmailChange} 
                  name="email"
                />
              </div>
              <div className="userUpdateItem">
                <label>Telefone</label>
                <input
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                  type="tel"
                  onChange={handleNumberChange}
                  name='telefone'
                  id='telefone'
                  maxLength={'12'}
                />
              </div>
              <div className="userUpdateItem">
                <label>CEP</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  onBlur={(e) => {handleDadosCep(e)}}
                />
              </div>
              <div className="userUpdateItem">
                <label>Rua</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  value={endereco.rua}
                />
              </div>
              <div className="userUpdateItem">
                <label>Bairro</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  value={endereco.bairro}
                />
              </div>
              <div className="userUpdateItem">
                <label>Numero</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  onChange={handleChange} 
                  name="numero"
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