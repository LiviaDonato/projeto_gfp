import React, { useState } from "react"
import { enderecoServidor } from "../utils"

const Aula14_Login = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [mensagem, setMensagem] = useState("")

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
                setMensagem('✅ Login bem-sucedido!')
                localStorage.setItem('UsuarioLogado', JSON.stringify(dados))
            } else {
                setMensagem('❌ Email ou senha incorretos')
                throw new Error('Email ou senha incorretos')
            }

        } catch (error) {
            console.error('Erro ao realizar login:', error)
            alert(error.message)
        }
    }

    return (
        <div style={estilos.container}>
            {/* LADO ESQUERDO - LOGIN */}
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
                    <button onClick={botaoEntrar} style={estilos.botao}>Entrar</button>
                    <button onClick={() => {
                        setEmail("");
                        setSenha("");
                        setMensagem("");
                    }} style={{ ...estilos.botao, backgroundColor: '#75b5ce' }}>
                        Limpar
                    </button>
                    {mensagem && <p style={estilos.mensagem}>{mensagem}</p>}
                </div>
            </div>

            {/* LADO DIREITO - DIV EXTRA */}
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
        backgroundColor: '#DDA0DD'
    },
    metadeDireita: {
        width: '40%',
        backgroundColor: '#75b5ce',
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
        gap: '15px'
    },
    titulo: {
        textAlign: 'center',
        marginBottom: '10px',
        color: '#8c2fa3',
        fontSize: '35px'
    },
    input: {
        height: '40px',
        padding: '0 10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        backgroundColor: '#FFF0F5'
    },
    botao: {
        height: '40px',
        backgroundColor: '#BA55D3',
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

export default Aula14_Login
