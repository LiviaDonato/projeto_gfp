import LocalTransacao from "../models/localTransacao.js"

class LocalTransacaoController {
    static async novoLocalTransacao(req, res) {
        const { nome, tipo_local, saldo } = req.body

        try {
            // Chama o metodo na classe LocalTransacao para criar um novo local de transacao
            const localTransacao = await LocalTransacao.novoLocalTransacao(nome, tipo_local, saldo)
            return res.status(201).json(localTransacao) // Retorna o local de transacao criado com status
        } catch(error) {
            console.error('Erro ao criar o localTransacao', error)
            return res.status(500).json({message: 'Erro ao criar localTransacao', error: error.message})
        }
    }

    static async listar(req, res) {
        try {
            const localTransacao = await LocalTransacao.listar() // Chamar o metodo listar na model local de transacao
            return res.status(200).json(localTransacao) // Retorna a lista de local de transacao
        } catch(error) {
            return res.status(500).json({message: 'Erro ao listar os localTransacao', error: error.message})
        }
    }

    static async consultar(req, res) {
        const { id_local_transacao } = req.params
        try {
            const localTransacao = await LocalTransacao.consultar(id_local_transacao) // Chamar o metodo consultar na model local de transacao
            return res.status(200).json(localTransacao) // Retorna a lista de local de transacao
        } catch(error) {
            return res.status(500).json({message: 'Erro ao consultar os localTransacao', error: error.message})
        }
    }

    static async atualizarTodos(req, res) {
        const { id_local_transacao } = req.params
        const { nome, tipo_local, saldo } = req.body

        try {
            const localTransacao = await LocalTransacao.atualizarTodos(nome, tipo_local, saldo, id_local_transacao) // Chamar o metodo atualizar na model local de transacao
            return res.status(200).json(localTransacao) // Retorna a lista de local de transacao
        } catch(error) {
            return res.status(500).json({message: 'Erro ao atualizar todos os localTransacao', error: error.message})
        }
    }

    static async atualizar(req, res) {
        const { id_local_transacao } = req.params
        const { nome, tipo_local, saldo } = req.body

        try {
            const localTransacao = await LocalTransacao.atualizar(nome, tipo_local, saldo, id_local_transacao) // Chamar o metodo atualizar na model local de transacao
            return res.status(200).json(localTransacao) // Retorna a lista de local de transacao
        } catch(error) {
            res.status(500).json({message: 'Erro ao atualizar os localTransacao', error: error.message})
        }
    }

    static async deletar(req, res) {
        const { id_local_transacao } = req.params
        try {
            const localTransacao = await LocalTransacao.deletar(id_local_transacao) // Chamar o metodo deletar na model local de transacao
            return res.status(200).json(localTransacao) // Retorna a lista de local de transacao
        } catch(error) {
            return res.status(500).json({message: 'Erro ao deletar os localTransacao', error: error.message})
        }
    }
}

export default LocalTransacaoController