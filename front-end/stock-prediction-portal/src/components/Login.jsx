import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassWord] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userData = { username, password };
        console.log("userData==>", userData);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/token/", userData);
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            console.log("Sucesso Login");
            navigate("/");
        } catch (errors) {
            console.error("Senha Inválida !");
            setError("Usuário ou senha inválidos!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleLogin} className="register-form">
                <h2>Tela de Login</h2>

                <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {error && <small className="text-danger">{error}</small>}

                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassWord(e.target.value)}
                    required
                />
                
                <button type="submit" disabled={loading}>
                    {loading ? "Entrando..." : "Login"}
                </button>

                {error && <div className="alert alert-danger">{error}</div>}
            </form>
        </div>
    );
};

export default Login;
