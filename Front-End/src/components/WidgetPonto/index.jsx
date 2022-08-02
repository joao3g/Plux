import React, { useState, useContext } from "react";
import './widgetPonto.css'
import Clock from "../../hook/useClock";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { getTime, newPoint } from '../../Functions/times-functions'
import { toast } from 'react-toastify';


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


const Featured = () => {

  const [open, setOpen] = useState();
  const [hora, setHora] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setLoading(true);
    const res = await getTime();

    setLoading(false);
    if(res.data.ok){
      setHora(res.data.time);
      setOpen(true);
      return;
    }
    
    toast.error('Erro ao buscar horário no servidor!');
    setOpen(false);
    return;
  };

  const handlePoint = async () => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem('SistemaUser'));
    const cpf = user.cpf;

    const res = await newPoint(hora, cpf);

    setLoading(false);
    if(res.data.ok){
      toast.success(res.data.message);
      setOpen(false);
      return;
    }
    
    toast.error(res.data.message);
    setOpen(false);
    return;
  };

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">ZL Tecnologia</h1>
        <h1 className="title">PLUX</h1>
      </div>

      <div className="divContainer">
        <div className="clock">
          <Clock />
        </div>
        <div className="divModal">
          <button onClick={() => handleOpen()}>Marcar Ponto</button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="Bater Ponto"
            aria-describedby="Modal para efetuar registro de ponto"
          >
            <Box sx={{ ...style, width: 350, borderRadius: 2 }}>
              <div className="point_mainDiv">
                <span className="point_hour">{hora}</span>
                <div className="point_ButtonsDiv">
                  <button className="point_registerButton" type="submit" onClick={() => handlePoint(hora)} disabled={loading}>{loading ? 'Registrando...' : 'Registrar'}</button>
                  <button className="point_cancelButton" type="submit" onClick={() => setOpen(false)}>Cancelar</button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>

    </div>
  );
};

export default Featured;