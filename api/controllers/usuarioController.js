import { BD } from "../db.js"
import bcrypt from "bcrypt"
import Usuario from "../models/usuario.js"
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'chave_api_livro_aberto'

class UsuarioController {
    static async novoUsuario(req, res) {
        const { nome, email, senha, tipo_acesso } = req.body

        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        try {
            // Chama o metodo na classe Usuario para criar um novo usuario
            const usuario = await Usuario.novoUsuario(nome, email, senhaCriptografada, tipo_acesso)
            return res.status(201).json(usuario) // Retorna o usuario criado com status
        } catch(error) {
            console.error('Erro ao criar o usuario', error)
            return res.status(500).json({message: 'Erro ao criar usuario', error: error.message})
        }
    }

    static async listar(req, res) {
        try {
            const usuarios = await Usuario.listar() // Chamar o metodo listar na model usuario
            return res.status(200).json(usuarios) // Retorna a lista de usuarios
        } catch(error) {
            return res.status(500).json({message: 'Erro ao listar os usuarios', error: error.message})
        }
    }

    static async consultar(req, res) {
        const { id_usuario } = req.params
        try {
            const usuarios = await Usuario.consultar(id_usuario) // Chamar o metodo consultar na model usuario
            return res.status(200).json(usuarios) // Retorna a lista de usuarios
        } catch(error) {
            return res.status(500).json({message: 'Erro ao consultar os usuarios', error: error.message})
        }
    }

    static async atualizarTodos(req, res) {
        const { id_usuario } = req.params
        const { nome, email, senha, tipo_acesso } = req.body

        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        try {
            const usuarios = await Usuario.atualizarTodos(nome, email, senhaCriptografada, tipo_acesso, id_usuario) // Chamar o metodo atualizar na model usuario
            return res.status(200).json(usuarios) // Retorna a lista de usuarios
        } catch(error) {
            return res.status(500).json({message: 'Erro ao atualizar todos os usuarios', error: error.message})
        }
    }

    static async atualizar(req, res) {
        const { id_usuario } = req.params
        const { nome, email, senha, tipo_acesso } = req.body

        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        try {
            const usuarios = await Usuario.atualizar(nome, email, senhaCriptografada, tipo_acesso, id_usuario) // Chamar o metodo atualizar na model usuario
            return res.status(200).json(usuarios) // Retorna a lista de usuarios
        } catch(error) {
            res.status(500).json({message: 'Erro ao atualizar os usuarios', error: error.message})
        }
    }

    static async deletar(req, res) {
        const { id_usuario } = req.params
        try {
            const usuarios = await Usuario.deletar(id_usuario) // Chamar o metodo deletar na model usuario
            return res.status(200).json(usuarios) // Retorna a lista de usuarios
        } catch(error) {
            return res.status(500).json({message: 'Erro ao deletar os usuarios', error: error.message})
        }
    }

    static async login(req, res) {
        const { email, senha } = req.body

        try {
            const resultado = await BD.query('SELECT id_usuario, nome, email, senha FROM usuarios WHERE email = $1', [email])
            if (resultado.rows.length === 0) {
                return res.status(401).json({message: 'Email e senha inválidos'})
            }
            const usuario = resultado.rows[0]
            const senhaValida = await bcrypt.compare(senha, usuario.senha)

            if(!senhaValida) {
                return res.status(401).json('Email ou senha invalido')
            }
            // Gerar um novo token para o usuário
            const token = jwt.sign(
                // Payload
                {id_usuario: usuario.id_usuario, nome: usuario.nome, email: usuario.email},
                // Signature
                SECRET_KEY, {expiresIn: '1h'}
            )

            // res.status(200).json({message: 'Login realizado com sucesso', usuario})
            res.status(200).json({message: 'Login realizado com sucesso', usuario, token})
        } catch(error) {
            console.error('Erro ao realizar login: ', error)
            return res.status(500).json({message: 'Erro ao realizar login: ', error: error.message})
        }
    }
}
// Middleware(função) para proteger rotas privadas
export function autenticarToken(req, res, next) {
    // Extrair do token o cabeçalho da requisição
    const token = req.headers['authorization'] // Bearer<token>

    // Verificar se o tokenfoi fornecido na requisicão
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({ mensagem: 'Token não fornecido' });
    }

    // Verificar a validade do token
    // jwt.verify que valida se o token é legitimo
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, usuario) => {
        if(err) return res.status(403).json({mensagem: 'Token invalido'})

        // Se o token for valido, adiciona os dados do usuário (decodificados no token)
        // tornando essa informação disponivel nas rotas que precisam de autenticação
        req.usuario = usuario
        next()
    })
}

export default UsuarioController