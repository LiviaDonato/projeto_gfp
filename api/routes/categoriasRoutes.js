import express from "express"
import CategoriasController from "../controllers/categoriasController.js"
import { autenticarToken } from "../controllers/usuarioController.js"

const router = express.Router()

router.post('/categorias', autenticarToken, CategoriasController.novaCategoria)
router.get('/categorias', autenticarToken, CategoriasController.listar)
router.get('/categorias/:id_categoria', autenticarToken, CategoriasController.consultar)
router.put('/categorias/:id_categoria', autenticarToken, CategoriasController.atualizarTodos)
router.patch('/categorias/:id_categoria', autenticarToken, CategoriasController.atualizar)
router.delete('/categorias/:id_categoria', autenticarToken, CategoriasController.deletar)

export default router