import express from "express"
import CategoriaController from "../controllers/categoriasController.js"

const router = express.Router()

router.post('/categorias', CategoriaController.novaCategoria)
router.get('/categorias', CategoriaController.listar)
router.get('/categorias/:id_categoria', CategoriaController.consultar)
router.put('/categorias/:id_categoria', CategoriaController.atualizarTodos)
router.patch('/categorias/:id_categoria', CategoriaController.atualizar)
router.delete('/categorias/:id_categoria', CategoriaController.deletar)

export default router