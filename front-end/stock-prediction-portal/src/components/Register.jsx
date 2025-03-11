// import React from "react";
import React, {useState} from 'react'
import axios from 'axios'
import "./register.css"; 


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail]  = useState('')
    const [password, setPassWord] = useState('')
    const [errors, setErrors] = useState({})
    const [sucess, setSucess] = useState(false)

    const handleRegistration = async (e) =>{
        e.preventDefault();

        const userData = {
            username, email, password
        }

    

        /* Configuração do EndPoint*/
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
            console.log('response.data==>', response.data)
            console.log('Registrado com sucesso');
            setErrors({})
            setSucess(true)
        }catch(error){
            setErrors(error.response.data)
            console.error('❌ Erro ao registrar:', error.response?.data || error.message);

            // alert("Erro ao registrar: " + JSON.stringify(error.response?.data, null, 2));
            
        }
    }

    return (
        <div className="register-container">
            <form onSubmit={handleRegistration} className="register-form">
                <h2>Criar Conta</h2>

                <input type="text" placeholder="Digite seu nome" value = {username} onChange={(e) => setUsername(e.target.value)} required />
                <small>{errors.username && <div className='text-danger'>{errors.username}</div>}</small>
                <input type="email" placeholder="Digite seu e-mail" value = {email} onChange={(e) => setEmail(e.target.value)} required />
                <small>{errors.email && <div className='text-danger'>{errors.email}</div>}</small>
                <input type="password" placeholder="Digite sua senha" value = {password} onChange={(e) => setPassWord(e.target.value)}  required />
                
                <button type="submit">Registrar</button>
                {sucess && <div className='alert alert-sucess'>Registrado com Sucesso</div>}
            </form>
        </div>
    );
};

export default Register;
