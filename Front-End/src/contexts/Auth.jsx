import React, { Component, useState, useEffect, createContext } from 'react'

import Axios from 'axios'
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [admin, setAdmin] = useState(0)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        function loadStorage() {

            const storageUser = localStorage.getItem('SistemaUser')

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }
        loadStorage();
    }, [])

    //Login usuario
    async function LoginAuth(cpf, senha) {

        setLoadingAuth(true)

        await Axios.post('http://localhost:3010/login', {
            cpf: cpf,
            senha: senha
        }).then(async (response, value) => {
            if (response.data.message) {
                setLoadingAuth(false);
                toast.error("Usuario ou senha incorretos!", {
                    icon: "☹️"
                });
            } else {
                const dataUser = await response.data[0];
                const firstName = dataUser.fun_nome.split(" ")[0]

                let data = {
                    cpf: dataUser.usu_login,
                    ativo: dataUser.isAtivo,
                    admin: dataUser.usu_isAdmin,
                    primeiroAcesso: dataUser.usu_isPrimeiroAcesso,
                    nome: dataUser.fun_nome,
                    primeiroNome: firstName,
                    email: dataUser.fun_email
                }

                setUser(data)
                setAdmin(data.admin)
                storegeUser(data)
                setLoadingAuth(false)

                toast.success(`Bem vindo ${data.primeiroNome}!`);
            }
        }).catch((error) => {
            console.log(error);
            toast.error("Ops algo deu errado !", {
                icon: "☹️"
            });
            setLoadingAuth(false);
        })
    }

    async function getUserInfo(cpf){
        const res = await Axios.post('http://localhost:3010/funcionarios/buscar', {cpf: cpf});

        return res
    }

    async function changeUserPassword(cpf, senha){
        const res = await Axios.post('http://localhost:3010/funcionarios/alterarsenha', {cpf: cpf, senha: senha});

        return res
    }

    //Cadatro usuario ADM
    async function addFunc(nome, email, telefone, cpf) {
        try {
            setLoadingAuth(true)

            const res = await fetch('http://localhost:3010/funcionarios/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    cpf: cpf,
                    email: email,
                    telefone: telefone
                })
            })

            const ok = res.ok
            if (ok) {
                setLoadingAuth(false);
                toast.success("Funcionário cadastrado!", {
                    icon: "🚀"
                });

                return true

            } else {
                setLoadingAuth(false);
                toast.error("CPF já cadastrado!", {
                    icon: "☹️"
                });

                return false
            }
        } catch (err) {
            console.log(err)
            setLoadingAuth(false);
            return false
        } finally {


        }
    }

    async function alterFunc(nome, email, telefone, cpf, cpfAntigo, admin){
        const res = await Axios.post('http://localhost:3010/funcionarios/alterar', {
            nome: nome,
            email: email,
            telefone: telefone,
            cpf: cpf,
            cpfAntigo: cpfAntigo,
            admin: admin
        });

        return res.data;
    }

    async function addHorario(entrada1, saida1, entrada2, saida2, cpf) {
        setLoadingAuth(true)

        if(entrada2.length==0){
            entrada2 = saida2 = null;
        };

        try {
            setLoadingAuth(true)

            const res = await fetch('http://localhost:3010/horarios/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cpf: cpf,
                    entrada1: entrada1,
                    saida1: saida1,
                    entrada2: entrada2,
                    saida2: saida2
                })
            })

            const ok = res.ok
            console.log(res)
            if (ok) {
                setLoadingAuth(false);
                toast.success("Horário cadastrado!", {
                    icon: "🚀"
                });

                return true

            } else {
                setLoadingAuth(false);
                toast.error("CPF já cadastrado!", {
                    icon: "☹️"
                });

                return false
            }
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async function listAllFunc() {
        const res = await Axios.get('http://localhost:3010/funcionarios/ativos')

        return res
    }

    async function listEmp() {
        const res = await Axios.get('http://localhost:3010/empresa')

        return res
    }

    async function alterEmp(cnpj, cep, cidade, bairro, rua, numero, razaoSocial, email, telefone, nomeFantasia){
        const res = await Axios.post('http://localhost:3010/empresa/alterar', {
            cnpj,
            cep,
            cidade,
            bairro,
            rua,
            numero,
            razaoSocial,
            email,
            telefone,
            nomeFantasia
        });

        return res.data;
    }

    async function deleteUser(cpf){
        const res = await Axios.post(`http://localhost:3010/funcionarios/delete`, {cpf: cpf});

        return res;
    }

    async function listFuncHorarios(){
        const res = await Axios.get('http://localhost:3010/funcionarios/horarios')

        return res
    }

    function storegeUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data))
    }


    const signOut = () => {

        localStorage.removeItem('SistemaUser');
        setUser(null);
    }


    return (
        //reconhece como verdadeiro caso seja nulo
        <AuthContext.Provider value={{
            signed: !!user,
            admin,
            user,
            loading,
            addFunc,
            alterFunc,
            listAllFunc,
            changeUserPassword,
            getUserInfo,
            listEmp,
            alterEmp,
            deleteUser,
            listFuncHorarios,
            addHorario,
            signOut,
            LoginAuth,
            loadingAuth,
            setUser,
            storegeUser,

        }}
        >
            {children}
        </AuthContext.Provider>
    )
}