import express from "express"
import UsuarioController, { autenticarToken } from "../controllers/usuarioController.js"

const router = express.Router()

router.post('/usuarios', autenticarToken, UsuarioController.novoUsuario)
router.get('/usuarios', autenticarToken, UsuarioController.listar)
router.get('/usuarios/:id_usuario', autenticarToken, UsuarioController.consultar)
router.put('/usuarios/:id_usuario', autenticarToken, UsuarioController.atualizarTodos)
router.patch('/usuarios/:id_usuario', autenticarToken, UsuarioController.atualizar)
router.delete('/usuarios/:id_usuario', autenticarToken, UsuarioController.deletar)
router.post('/usuarios/login', UsuarioController.login)

export default router