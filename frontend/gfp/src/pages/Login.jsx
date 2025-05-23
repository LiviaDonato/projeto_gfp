import React, { useState, useEffect } from "react"
import { enderecoServidor } from "../utils"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [lembrar, setLembrar] = useState(false);

    useEffect(() => {
        const buscarUsuarioLogado = async () => {
            const UsuarioLogado = await localStorage.getItem("UsuarioLogado");
            if (UsuarioLogado) {
                const usuario = JSON.parse(UsuarioLogado);
                if (usuario.lembrar === true) {
                    navigate("/principal");
                }
            }
        };
        buscarUsuarioLogado();
    }, [[navigate]])

    async function botaoEntrar(e) {
        e.preventDefault()

        try {
            if (email === '' || senha === '') {
                throw new Error('Preencha todos os campos')
            }

            const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            })

            if (resposta.ok) {
                const dados = await resposta.json()
                localStorage.setItem('UsuarioLogado', JSON.stringify({ ...dados, lembrar }))
                navigate("/Principal")
            } else {
                throw new Error('Email ou senha incorretos')
            }

        } catch (error) {
            console.error('Erro ao realizar login:', error)
            alert(error.message)
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
                    <label>
                        <input
                            type="checkbox"
                            checked={lembrar}
                            onChange={(e) => setLembrar(e.target.checked)}
                        />
                        Lembrar-me
                    </label>
                    <button onClick={botaoEntrar} style={estilos.botao}>Entrar</button>
                </div>
            </div>
            <div style={estilos.metadeDireita}>
                <h1 style={{ color: '#fff' }}>Bem-vindo à plataforma GFP!</h1>
            </div>
        </div>
    )
}

const estilos = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw'
    },
    metadeEsquerda: {
        width: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#663399'
    },
    metadeDireita: {
        width: '40%',
        backgroundColor: '#25003d',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    card: {
        width: '100%',
        maxWidth: '350px',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    titulo: {
        textAlign: 'center',
        marginBottom: '10px',
        color: '#6a6ab0',
        fontSize: '35px'
    },
    input: {
        height: '40px',
        padding: '10 10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        backgroundColor: '#E6E6FA'
    },
    botao: {
        height: '40px',
        backgroundColor: '#6a6ab0',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    mensagem: {
        textAlign: 'center',
        marginTop: '10px',
        fontWeight: 'bold'
    }
}

export default Login
