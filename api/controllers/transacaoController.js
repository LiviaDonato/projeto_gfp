import Transacao from "../models/transacao.js"

class TransacaoController {
    static async novaTransacao(req, res) {
        const { valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual } = req.body

        try {
            // Chama o metodo na classe Transacao para criar uma nova transacao
            const transacao = await Transacao.novaTransacao(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual)
            return res.status(201).json(transacao) // Retorna a transacao criado com status
        } catch(error) {
            console.error('Erro ao criar a transacao', error)
            return res.status(500).json({message: 'Erro ao criar a transacao', error: error.message})
        }
    }

    static async listar(req, res) {
        try {
            const transacao = await Transacao.listar() // Chamar o metodo listar na model transacao
            return res.status(200).json(transacao) // Retorna a lista de transacao
        } catch(error) {
            return res.status(500).json({message: 'Erro ao listar as transacoes', error: error.message})
        }
    }

    static async consultar(req, res) {
        const { id_transacao } = req.params
        try {
            const transacao = await Transacao.consultar(id_transacao) // Chamar o metodo consultar na model transacao
            return res.status(200).json(transacao) // Retorna a lista de transacao
        } catch(error) {
            return res.status(500).json({message: 'Erro ao consultar os transacao', error: error.message})
        }
    }

    static async atualizarTodos(req, res) {
        const { id_transacao } = req.params
        const { valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual } = req.body

        try {
            const transacao = await Transacao.atualizarTodos(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual, id_transacao) // Chamar o metodo atualizar na model transacao
            return res.status(200).json(transacao) // Retorna a lista de transacao
        } catch(error) {
            return res.status(500).json({message: 'Erro ao atualizar todos os transacao', error: error.message})
        }
    }

    static async atualizar(req, res) {
        const { id_transacao } = req.params
        const { valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual } = req.body

        try {
            const transacao = await Transacao.atualizar(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual, id_transacao) // Chamar o metodo atualizar na model transacao
            return res.status(200).json(transacao) // Retorna a lista de transacao
        } catch(error) {
            res.status(500).json({message: 'Erro ao atualizar os transacao', error: error.message})
        }
    }

    static async deletar(req, res) {
        const { id_transacao } = req.params
        try {
            const transacao = await Transacao.deletar(id_transacao) // Chamar o metodo deletar na model transacao
            return res.status(200).json(transacao) // Retorna a lista de transacao
        } catch(error) {
            return res.status(500).json({message: 'Erro ao deletar os transacao', error: error.message})
        }
    }

    // Criar uma rota que permite filtrar transações por data de vencimento ou data de pagamento
    // dentro de um itervalo especifico
    static async filtrarData(req, res) {
        const { data_inicio, data_fim, tipo_data } = req.query
        let colunaData
        if (tipo_data == 'vencimento') {
            colunaData = 'data_vencimento'
        } else if (tipo_data == 'pagamento') {
            colunaData = 'data_pagamento'
        } else {
            return res.status(400).json({
                message: "Tipo_data inválido, use vencimento ou pagamento"
            })
        }
        try {
            const transacao = await Transacao.filtrar(colunaData, data_inicio, data_fim) // Chamar o metodo deletar na model transacao
            return res.status(200).json(transacao) // Retorna a lista de transacao
        } catch(error) {
            console.error('Erro ao filtrar transacao', error)
            return res.status(500).json({message: 'Erro ao filtrar transacao', error: error.message})
        }
    }

    // Somando trnasacoes entrada ou saida
    static async somarTransacoes(req, res) {
        const { tipo, id_usuario } = req.query
        try {
            const transacao = await Transacao.somarTransacoes(tipo, id_usuario) // Chamar o metodo deletar na model transacao
            return res.status(200).json({total_valor: transacao})
        } catch(error) {
            console.error('Erro ao somar transacoes', error)
            return res.status(500).json({message: 'Erro ao somar transacoes', error: error.message})
        }
    }

    static async transacoesVencidas(req, res) {
        const { id_usuario } = req.params
        try {
            const transacao = await Transacao.transacoesVencidas(id_usuario) // Chamar o metodo deletar na model transacao
            return res.status(200).json(transacao) // Retorna a lista de transacao
        } catch(error) {
            console.error('Erro ao buscar transacoes vencidas', error)
            return res.status(500).json({message: 'Erro ao buscar transacoes vencidas', error: error.message})
        }
    }
}

export default TransacaoController