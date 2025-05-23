import Contas from "../models/contas.js"

class ContasController {
    static async novaConta(req, res) {
        const { nome, tipo_conta, saldo, conta_padrao } = req.body

        try {
            // Chama o metodo na classe Conta para criar um nova conta
            const contas = await Contas.novaConta(nome, tipo_conta, saldo, conta_padrao)
            return res.status(201).json(contas) // Retorna a conta criada com status
        } catch(error) {
            console.error('Erro ao criar a conta', error)
            return res.status(500).json({message: 'Erro ao criar conta', error: error.message})
        }
    }

    static async listar(req, res) {
        try {
            const contas = await Contas.listar() // Chamar o metodo listar na model conta
            return res.status(200).json(contas) // Retorna a lista de conta
        } catch(error) {
            return res.status(500).json({message: 'Erro ao listar as contas', error: error.message})
        }
    }

    static async consultar(req, res) {
        const { id_conta } = req.params
        try {
            const contas = await Contas.consultar(id_conta) // Chamar o metodo consultar na model conta
            return res.status(200).json(contas) // Retorna a lista de conta
        } catch(error) {
            return res.status(500).json({message: 'Erro ao consultar a conta', error: error.message})
        }
    }

    static async atualizarTodos(req, res) {
        const { id_conta } = req.params
        const { nome, tipo_conta, saldo, conta_padrao } = req.body

        try {
            const contas = await Contas.atualizarTodos(nome, tipo_conta, saldo, conta_padrao, id_conta) // Chamar o metodo atualizar na model conta
            return res.status(200).json(contas) // Retorna a lista de conta
        } catch(error) {
            return res.status(500).json({message: 'Erro ao atualizar toda a conta', error: error.message})
        }
    }

    static async atualizar(req, res) {
        const { id_conta } = req.params
        const { nome, tipo_conta, saldo, conta_padrao } = req.body

        try {
            const contas = await Contas.atualizar(nome, tipo_conta, saldo, conta_padrao, id_conta) // Chamar o metodo atualizar na model conta
            return res.status(200).json(contas) // Retorna a lista de conta
        } catch(error) {
            res.status(500).json({message: 'Erro ao atualizar os conta', error: error.message})
        }
    }

    static async deletar(req, res) {
        const { id_conta } = req.params
        try {
            const contas = await Contas.deletar(id_conta) // Chamar o metodo deletar na model conta
            return res.status(200).json(contas) // Retorna a lista de conta
        } catch(error) {
            return res.status(500).json({message: 'Erro ao deletar os conta', error: error.message})
        }
    }

        // filtar por tipo de conta
    static async filtrarConta(req, res) {
        const { nome } = req.query
        try {
            const contas = await Contas.filtrar(nome) // Chamar o metodo deletar na model conta
            return res.status(200).json(contas) // Retorna a lista de conta
        } catch(error) {
            console.error('Erro ao filtrar conta', error)
            return res.status(500).json({message: 'Erro ao filtrar conta', error: error.message})
        }
    }
}

export default ContasController