import { BD } from '../db.js'

class Transacao {
    // Função estatica para novo local de transacao
    static async novaTransacao(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual) {
        const resultado = await BD.query(`INSERT INTO transacoes(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`, [valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual])
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
    static async atualizarTodos(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual, id_transacao) {
        const resultado = await BD.query('UPDATE transacoes SET valor = $1, descricao = $2, data_vencimento = $3, data_pagamento = $4, tipo_transacao = $5, id_local_transacao = $6, id_categoria = $7, id_subcategoria = $8, id_usuario = $9, num_parcelas = $10, parcela_atual = $11 WHERE id_transacao = $12 RETURNING *',
            [valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual, id_transacao]) // Comando SQL para atualizar o transacao
        return resultado.rows[0]
    }
    static async atualizar(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual, id_transacao) {
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
        if (id_local_transacao !== undefined) {
            campos.push(`id_local_transacao = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(id_local_transacao)
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
}

export default Transacao