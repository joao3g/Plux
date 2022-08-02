import React, { Component, useState, useEffect, createContext } from 'react'

import Axios from 'axios'

export const TimeContext = createContext({});

export default function TimeProvider({ children }) {


     async function getTime() {
          const res = Axios.get('http://localhost:3010/horarios/now');

          return res.data;
     }

     async function newPoint(time, cpf) {

          const res = Axios.post('http://localhost:3010/horarios/new', {
               time: time,
               cpf: cpf
          });

          return res.data;
     }

     return (
          //reconhece como verdadeiro caso seja nulo
          <TimeContext.Provider value={{
               getTime: getTime,
               newPoint
          }}
          >
               {children}
          </TimeContext.Provider>
     )
}