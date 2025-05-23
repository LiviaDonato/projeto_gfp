import express from "express"
import TransacaoController from "../controllers/transacaoController.js"
import { autenticarToken } from "../controllers/usuarioController.js"

const router = express.Router()

router.get('/transacao/filtrodata', autenticarToken, TransacaoController.filtrarData)
router.get('/transacao/somarTransacoes', autenticarToken, TransacaoController.somarTransacoes)
router.get('/transacao/transacoesVencidas/:id_usuario', autenticarToken, TransacaoController.transacoesVencidas)
router.post('/transacao', autenticarToken, TransacaoController.novaTransacao)
router.get('/transacao', autenticarToken, TransacaoController.listar)
router.get('/transacao/:id_transacao', autenticarToken, TransacaoController.consultar)
router.put('/transacao/:id_transacao', autenticarToken, TransacaoController.atualizarTodos)
router.patch('/transacao/:id_transacao', autenticarToken, TransacaoController.atualizar)
router.delete('/transacao/:id_transacao', autenticarToken, TransacaoController.deletar)

export default router