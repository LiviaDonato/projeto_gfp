import express from "express"
import contasController from "../controllers/contasController.js"
import { autenticarToken } from "../controllers/usuarioController.js"

const router = express.Router()

router.get('/contas/filtrarConta', autenticarToken, contasController.filtrarConta)
router.post('/contas', autenticarToken, contasController.novaConta)
router.get('/contas', autenticarToken, contasController.listar)
router.get('/contas/:id_conta', autenticarToken, contasController.consultar)
router.put('/contas/:id_conta', autenticarToken, contasController.atualizarTodos)
router.patch('/contas/:id_conta', autenticarToken, contasController.atualizar)
router.delete('/contas/:id_conta', autenticarToken, contasController.deletar)

export default router