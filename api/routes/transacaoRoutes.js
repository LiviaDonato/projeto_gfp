import express from "express"
import LocalTransacaoController from "../controllers/localTransacaoController.js"

const router = express.Router()

router.post('/localTransacao', LocalTransacaoController.novoLocalTransacao)
router.get('/localTransacao', LocalTransacaoController.listar)
router.get('/localTransacao/:id_local_transacao', LocalTransacaoController.consultar)
router.put('/localTransacao/:id_local_transacao', LocalTransacaoController.atualizarTodos)
router.patch('/localTransacao/:id_local_transacao', LocalTransacaoController.atualizar)
router.delete('/localTransacao/:id_local_transacao', LocalTransacaoController.deletar)

export default router