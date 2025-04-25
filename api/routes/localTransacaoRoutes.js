import express from "express"
import LocalTransacaoController from "../controllers/localTransacaoController.js"
import { autenticarToken } from "../controllers/usuarioController.js"

const router = express.Router()

router.post('/localTransacao', autenticarToken, LocalTransacaoController.novoLocalTransacao)
router.get('/localTransacao', LocalTransacaoController.listar)
router.get('/localTransacao/:id_local_transacao', LocalTransacaoController.consultar)
router.put('/localTransacao/:id_local_transacao', autenticarToken, LocalTransacaoController.atualizarTodos)
router.patch('/localTransacao/:id_local_transacao', autenticarToken, LocalTransacaoController.atualizar)
router.delete('/localTransacao/:id_local_transacao', autenticarToken, LocalTransacaoController.deletar)

export default router