import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext";
import { enderecoServidor } from "../utils";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { setDadosUsuario } = useContext(UsuarioContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [lembrar, setLembrar] = useState(false);

    useEffect(() => {
        const buscarUsuarioLogado = async () => {
            const UsuarioLogado = localStorage.getItem("UsuarioLogado");
            if (UsuarioLogado) {
                const usuario = JSON.parse(UsuarioLogado);
                if (usuario.lembrar === true) {
                    setDadosUsuario(usuario);
                    navigate("/principal");
                }
            }
        };
        buscarUsuarioLogado();
    }, [navigate, setDadosUsuario]);

    async function botaoEntrar(e) {
        e.preventDefault();
        try {
            if (!email || !senha) throw new Error("Preencha todos os campos");
            const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });
            if (!resposta.ok) throw new Error("Email ou senha incorretos");
            const dados = await resposta.json();
            localStorage.setItem("UsuarioLogado", JSON.stringify({ ...dados, lembrar }));
            setDadosUsuario(dados);
            navigate("/principal");
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            alert(error.message);
        }
    }

    return (
        <div style={estilos.container}>
            <div style={estilos.metadeEsquerda}>
                <div style={estilos.card}>
                    <h2 style={estilos.titulo}>Login</h2>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        style={estilos.input}
                    />
                    <label>Senha</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Digite sua senha"
                        style={estilos.input}
                    />
                    <label style={estilos.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={lembrar}
                            onChange={(e) => setLembrar(e.target.checked)}
                            style={estilos.checkbox}
                        />{" "}
                        Lembrar-me
                    </label>
                    <button onClick={botaoEntrar} style={estilos.botao}>Entrar</button>
                </div>
            </div>

            <div style={estilos.metadeDireita}>
                <h1 style={estilos.bemVindo}>Bem-vindo à plataforma GFP!</h1>
                {/* <img
                    src=""
                    alt="Financeiro e tecnologia"
                    style={estilos.imagem}
                /> */}
            </div>
        </div>
    );
};

const estilos = {
    container: {
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #6a6ab0, #25003d)",
    },
    metadeEsquerda: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(102, 51, 153, 0.8)",
        padding: "20px",
    },
    metadeDireita: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
    },
    card: {
        width: "100%",
        maxWidth: "350px",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    titulo: {
        fontSize: "36px",
        color: "#6a6ab0",
        marginBottom: "10px",
        textAlign: "center",
    },
    input: {
        height: "42px",
        padding: "6px",
        borderRadius: "6px",
        fontSize: "16px",
        border: "1px solid #ccc",
        backgroundColor: "#E6E6FA",
    },
    checkboxLabel: {
        fontSize: "14px",
        color: "#333",
    },
    checkbox: {
        marginRight: "8px",
    },
    botao: {
        height: "50px",
        backgroundColor: "#6a6ab0",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    botaoHover: {
        backgroundColor: "#554aa0",
    },
    bemVindo: {
        fontSize: "32px",
        marginBottom: "20px",
    },
    imagem: {
        maxWidth: "300px",
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.35)",
        marginTop: "15px",
    },
    // Responsividade mobile via media query (injetado globalmente, se preferir)
    "@media (max-width: 768px)": {
        container: {
            flexDirection: "column",
        },
        metadeEsquerda: {
            width: "100%",
            height: "50%",
        },
        metadeDireita: {
            width: "100%",
            height: "50%",
        },
    },
};

export default Login;
