import { useState, useContext, useEffect, useRef } from "react"
import Input from "../components/Input"
//import { IconAtencao } from "../../components/Icons/Icon"
import { AuthContext } from '../contexts/Auth'
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import './autenticacao.css';

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
  pb: 3
}

export default function () {

  const { changeUserPassword, getUserInfo, LoginAuth, loadingAuth } = useContext(AuthContext);

  let history = useHistory();
  const [senha, setSenha] = useState('')
  const [novasenha, setNovaSenha] = useState('')
  const [logIn, setLogIn] = useState('')
  const [open, setOpen] = useState('')
  const [loading, setLoading] = useState(false)


  async function handlePrimeiroAcesso() {
    try {
      const res = await changeUserPassword(logIn, novasenha);
      setOpen(false)

      if (res.data.ok) await LoginAuth(logIn, novasenha);
      else {
        toast.error("Erro na consulta ao banco de dados!")
      }
    } catch (e) {
      console.log(e);
      toast.error('Erro ao realizar logIn!')
    }

  }

  async function Submit() {
    try {
      const res = await getUserInfo(logIn);

      if (res.data.ok) {
        const user = res.data.result[0];
        if (user.usu_isPrimeiroAcesso) {
          return setOpen(true);
        }
        else {
          await LoginAuth(logIn, senha);
          return;
        }
      }
    } catch (e) {
      console.log(e);
      toast.error('Erro ao realizar logIn!')
    }

  }

  const keyDownHandler = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); const style = {
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
        pb: 3
      }


      // 👇️ call submit function here
      Submit();
    }
  };


  useEffect(() => {

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler]);

  return (
    <div className="flex  h-screen items-center justify-center Section">
      <div className={`hidden md:block md:w-1/2  lg:w-2/3`}>
        <img src={require("../Pic/background.avif")}
          alt="Imagem de tela zltecnologia"
          className={`h-screen w-full object-cover`}
        />
      </div>
      <div className='m-10 md:w-1/2 w-full lg:w-1/3'>
        <h1 className={`
                text-3xl font-bold mb-5
            `}>Faça login</h1>

        <Input
          type="text"
          label="CPF"
          value={logIn}
          mask="999.999.999-99"
          maskChar=""
          onChange={(e) => setLogIn(e)}
          required
        />

        <Input
          type="password"
          label="Senha"
          value={senha}
          onChange={(e) => setSenha(e)}
          required
        />

        <button onClick={() => Submit()} className={`
                w-full bg-indigo-500 hover:bg-indigo-400
                text-white rounded-lg px-4 py-3 mt-6
            `}>
          Entrar
        </button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="Bater Ponto"
          aria-describedby="Modal para efetuar registro de ponto"
        >
          <Box sx={{ ...style, width: 350, borderRadius: 2 }}>
            <div className="fa_mainDiv">
              <span className="fa_title">Primeiro Acesso</span>
              <Input
                type="password"
                label="Insira sua nova senha"
                value={novasenha}
                mask=""
                maskChar={null}
                onChange={setNovaSenha}
                required
                style={{
                  width: 300,
                  marginRight: 20
                }}
              />
              <div className="fa_ButtonsDiv">
                <button className="fa_registerButton" type="submit" onClick={() => handlePrimeiroAcesso()} disabled={loading}>{loading ? 'Alterando...' : 'Mudar senha'}</button>
                <button className="fa_cancelButton" type="submit" onClick={() => setOpen(false)}>Cancelar</button>
              </div>
            </div>
          </Box>
        </Modal>
        <center><p className={`mt-8`} >
          <a className={`text-blue-500 hover:text-blue-700 font-semibold
                    cursor-pointer`} onClick={() => /*setModo('cadastro')*/ console.log('Clicou em: Esqueceu sua senha?')}>Esqueceu sua senha?</a>
        </p></center>

      </div>
    </div>
  )

}