import SubCategorias from "../models/subCategorias.js"

class SubCategoriasController {
    static async novaSubCategoria(req, res) {
        const { nome, gasto_fixo, id_categoria } = req.body

        try {
            // Chama o metodo na classe Categoria para criar um novo categoria
            const subCategorias = await SubCategorias.novaSubCategoria(nome, gasto_fixo, id_categoria)
            return res.status(201).json(subCategorias) // Retorna o categoria criado com status
        } catch(error) {
            console.error('Erro ao criar o categoria', error)
            return res.status(500).json({message: 'Erro ao criar categoria', error: error.message})
        }
    }

    static async listar(req, res) {
        try {
            const subCategorias = await SubCategorias.listar() // Chamar o metodo listar na model categoria
            return res.status(200).json(subCategorias) // Retorna a lista de categoria
        } catch(error) {
            return res.status(500).json({message: 'Erro ao listar as categorias', error: error.message})
        }
    }

    static async consultar(req, res) {
        const { id_subcategoria } = req.params
        try {
            const subCategorias = await SubCategorias.consultar(id_subcategoria) // Chamar o metodo consultar na model categoria
            return res.status(200).json(subCategorias) // Retorna a lista de categoria
        } catch(error) {
            return res.status(500).json({message: 'Erro ao consultar as categorias', error: error.message})
        }
    }

    static async atualizarTodos(req, res) {
        const { id_subcategoria } = req.params
        const { nome, gasto_fixo, id_categoria } = req.body

        try {
            const subCategorias = await SubCategorias.atualizarTodos(nome, gasto_fixo, id_categoria, id_subcategoria) // Chamar o metodo atualizar na model categoria
            return res.status(200).json(subCategorias) // Retorna a lista de categoria
        } catch(error) {
            return res.status(500).json({message: 'Erro ao atualizar todos as categorias', error: error.message})
        }
    }

    static async atualizar(req, res) {
        const { id_subcategoria } = req.params
        const { nome, gasto_fixo, id_categoria } = req.body

        try {
            const subCategorias = await SubCategorias.atualizar(nome, gasto_fixo, id_categoria, id_subcategoria) // Chamar o metodo atualizar na model categoria
            return res.status(200).json(subCategorias) // Retorna a lista de categoria
        } catch(error) {
            res.status(500).json({message: 'Erro ao atualizar as categorias', error: error.message})
        }
    }

    static async deletar(req, res) {
        const { id_subcategoria } = req.params
        try {
            const subCategorias = await SubCategorias.deletar(id_subcategoria) // Chamar o metodo deletar na model categoria
            return res.status(200).json(subCategorias) // Retorna a lista de categoria
        } catch(error) {
            return res.status(500).json({message: 'Erro ao deletar as categorias', error: error.message})
        }
    }
}

export default SubCategoriasController