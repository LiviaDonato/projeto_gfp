import express from "express"
import SubCategoriasController from "../controllers/subCategoriasController.js"
import { autenticarToken } from "../controllers/usuarioController.js"

const router = express.Router()

router.post('/subCategorias', autenticarToken, SubCategoriasController.novaSubCategoria)
router.get('/subCategorias', autenticarToken, SubCategoriasController.listar)
router.get('/subCategorias/:id_subcategoria', autenticarToken, SubCategoriasController.consultar)
router.put('/subCategorias/:id_subcategoria', autenticarToken, SubCategoriasController.atualizarTodos)
router.patch('/subCategorias/:id_subcategoria', autenticarToken, SubCategoriasController.atualizar)
router.delete('/subCategorias/:id_subcategoria', autenticarToken, SubCategoriasController.deletar)

export default router