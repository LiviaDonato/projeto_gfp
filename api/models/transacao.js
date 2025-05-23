import { BD } from '../db.js'

class Transacao {
    // Função estatica para novo local de transacao
    static async novaTransacao(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual) {
        const resultado = await BD.query(`INSERT INTO transacoes(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`, [valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual])
        return resultado.rows[0]
    }
    static async listar() {
        const resultado = await BD.query('SELECT * FROM transacoes')
        return resultado.rows // retornar todos os local de transacao
    }
    static async consultar(id_transacao) {
        const resultado = await BD.query('SELECT * FROM transacoes WHERE id_transacao = $1', [id_transacao])
        return resultado.rows
    }
    static async atualizarTodos(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual, id_transacao) {
        const resultado = await BD.query('UPDATE transacoes SET valor = $1, descricao = $2, data_vencimento = $3, data_pagamento = $4, tipo_transacao = $5, id_conta = $6, id_categoria = $7, id_subcategoria = $8, id_usuario = $9, num_parcelas = $10, parcela_atual = $11 WHERE id_transacao = $12 RETURNING *',
            [valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual, id_transacao]) // Comando SQL para atualizar o transacao
        return resultado.rows[0]
    }
    static async atualizar(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual, id_transacao) {
        // Inicializar arrays(vetores) para armazenar os campos e vetores a serem atualizados
        const campos = []
        const valores = []

        // Verificar quais campos foram fornecidos
        if (valor !== undefined) {
            campos.push(`valor = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(valor)
        }
        if (descricao !== undefined) {
            campos.push(`descricao = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(descricao)
        }
        if (data_vencimento !== undefined) {
            campos.push(`data_vencimento = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(data_vencimento)
        }
        if (data_pagamento !== undefined) {
            campos.push(`data_pagamento = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(data_pagamento)
        }
        if (tipo_transacao !== undefined) {
            campos.push(`tipo_transacao = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(tipo_transacao)
        }
        if (id_conta !== undefined) {
            campos.push(`id_conta = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(id_conta)
        }
        if (id_categoria !== undefined) {
            campos.push(`id_categoria = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(id_categoria)
        }
        if (id_subcategoria !== undefined) {
            campos.push(`id_subcategoria = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(id_subcategoria)
        }
        if (id_usuario !== undefined) {
            campos.push(`id_usuario = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(id_usuario)
        }
        if (num_parcelas !== undefined) {
            campos.push(`num_parcelas = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(num_parcelas)
        }
        if (parcela_atual !== undefined) {
            campos.push(`parcela_atual = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(parcela_atual)
        }
        if (campos.length === 0) {
            return res.status(400).json({message: 'Nenhum campo fornencido para atualização'})
        }

        // Montamos a query dinamicamente
        const query = `UPDATE transacoes SET ${campos.join(", ")} WHERE id_transacao = ${id_transacao} RETURNING *`
        // Executando nossa query
        const resultado = await BD.query(query, valores)
        // Varifica se o usuário foi atualizado
        if (resultado.rows.length === 0) {
            return res.status(404).json({message: 'Transacao não encontrado'})
        }
        return resultado.rows[0]
    }
    static async deletar(id_transacao) {
        const resultado = await BD.query('DELETE FROM transacoes WHERE id_transacao = $1 RETURNING *', [id_transacao])
        return resultado.rows[0]
    }
    static async filtrar(colunaData, data_inicio, data_fim) {
        const query = `SELECT t.*, u.nome AS npme_usuario, ct.nome FROM transacoes AS t 
            LEFT JOIN usuarios AS u ON t.id_usuario = u.id_usuario JOIN contas AS ct ON t.id_conta = ct.id_conta 
            WHERE ${colunaData} BETWEEN $1 AND $2 ORDER BY ${colunaData} ASC`
        const resultado = await BD.query(query, [data_inicio, data_fim])
        return resultado.rows[0]
    }
    static async somarTransacoes(tipo, id_usuario) {
        const tipoTransacao = tipo.toUpperCase()
        const query =`SELECT SUM(valor) AS total FROM transacoes WHERE tipo_transacao = $1 AND id_usuario = $2`
        const resultado = await BD.query(query, [tipoTransacao, id_usuario])
        let total = resultado.rows[0].total
        if (total === null) {
            total = 0
        }
        return parseFloat(total)
    }
    static async transacoesVencidas(id_usuario) {
        const query = `SELECT t.valor, t.data_transacao, t.data_vencimento, t.data_pagamento,
            u.nome AS nome_usuario, c.nome AS nome_conta, ct.nome AS nome_categoria, sct.nome AS nome_subcategoria FROM transacoes AS t 
            LEFT JOIN usuarios AS u ON t.id_usuario = u.id_usuario 
            LEFT JOIN contas AS c ON t.id_conta = c.id_conta
            LEFT JOIN categorias AS ct ON t.id_categoria = ct.id_categoria 
            LEFT JOIN subcategorias AS sct ON t.id_subcategoria = sct.id_subcategoria
            WHERE t.data_vencimento < CURRENT_DATE              -- filtra transacoes vencidas
            AND t.id_usuario = $1 ORDER BY t.data_vencimento ASC`
        const resultado = await BD.query(query, [id_usuario])

        // Função para formatar data
        const formatarDataBR = (data) => {
            if (!data) return null
            return new Date(data).toLocaleDateString('pt-br') // Converte a data no padrão br
        }
        const dadosFormatados = resultado.rows.map(t => ({
            ...t, // Copia todas as propriedades originais da resultado para a t
            data_transacao: formatarDataBR(t.data_transacao),
            data_vencimento: formatarDataBR(t.data_vencimento),
            data_pagamento: formatarDataBR(t.data_pagamento)
        }))
        return dadosFormatados
    }
}

export default Transacao