import express from "express"
import UsuarioController from "../controllers/usuarioController.js"

const router = express.Router()

router.post('/usuarios', UsuarioController.novoUsuario)
router.get('/usuarios', UsuarioController.listar)
router.get('/usuarios/:id_usuario', UsuarioController.consultar)
router.put('/usuarios/:id_usuario', UsuarioController.atualizarTodos)
router.patch('/usuarios/:id_usuario', UsuarioController.atualizar)
router.delete('/usuarios/:id_usuario', UsuarioController.deletar)
router.post('/usuarios/login', UsuarioController.login)

export default router