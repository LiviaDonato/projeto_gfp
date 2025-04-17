import Categorias from "../models/categorias.js"

class CategoriasController {
    static async novaCategoria(req, res) {
        const { nome, tipo_transacao, gasto_fixo, id_usuario } = req.body

        try {
            // Chama o metodo na classe Categoria para criar um novo categoria
            const categoria = await Categorias.novaCategoria(nome, tipo_transacao, gasto_fixo, id_usuario)
            return res.status(201).json(categoria) // Retorna o categoria criado com status
        } catch(error) {
            console.error('Erro ao criar o categoria', error)
            return res.status(500).json({message: 'Erro ao criar categoria', error: error.message})
        }
    }

    static async listar(req, res) {
        try {
            const categorias = await Categorias.listar() // Chamar o metodo listar na model categoria
            return res.status(200).json(categorias) // Retorna a lista de categoria
        } catch(error) {
            return res.status(500).json({message: 'Erro ao listar as categorias', error: error.message})
        }
    }

    static async consultar(req, res) {
        const { id_categoria } = req.params
        try {
            const categorias = await Categorias.consultar(id_categoria) // Chamar o metodo consultar na model categoria
            return res.status(200).json(categorias) // Retorna a lista de categoria
        } catch(error) {
            return res.status(500).json({message: 'Erro ao consultar as categorias', error: error.message})
        }
    }

    static async atualizarTodos(req, res) {
        const { id_categorias } = req.params
        const { nome, tipo_transacao, gasto_fixo, id_usuario } = req.body

        try {
            const categorias = await Categorias.atualizarTodos(nome, tipo_transacao, gasto_fixo, id_usuario, id_categorias) // Chamar o metodo atualizar na model categoria
            return res.status(200).json(categorias) // Retorna a lista de categoria
        } catch(error) {
            return res.status(500).json({message: 'Erro ao atualizar todos as categorias', error: error.message})
        }
    }

    static async atualizar(req, res) {
        const { id_categorias } = req.params
        const { nome, tipo_transacao, gasto_fixo, id_usuario } = req.body

        try {
            const categorias = await Categorias.atualizar(nome, tipo_transacao, gasto_fixo, id_usuario, id_categorias) // Chamar o metodo atualizar na model categoria
            return res.status(200).json(categorias) // Retorna a lista de categoria
        } catch(error) {
            res.status(500).json({message: 'Erro ao atualizar as categorias', error: error.message})
        }
    }

    static async deletar(req, res) {
        const { id_categorias } = req.params
        try {
            const categorias = await Categorias.deletar(id_categorias) // Chamar o metodo deletar na model categoria
            return res.status(200).json(categorias) // Retorna a lista de categoria
        } catch(error) {
            return res.status(500).json({message: 'Erro ao deletar as categorias', error: error.message})
        }
    }
}

export default CategoriasController