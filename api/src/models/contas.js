import { BD } from '../../db.js'

class Contas {
    // Função estatica para nova conta
    static async novaConta(nome, tipo_conta, saldo, conta_padrao) {
        const resultado = await BD.query(`INSERT INTO contas(nome, tipo_conta, saldo, conta_padrao)
            VALUES($1, $2, $3, $4) RETURNING *`, [nome, tipo_conta, saldo, conta_padrao])
        return resultado.rows[0]
    }
    static async listar() {
        const resultado = await BD.query('SELECT * FROM contas WHERE ativo = true')
        return resultado.rows // retornar todos os local de transacao
    }
    static async consultar(id_conta) {
        const resultado = await BD.query('SELECT * FROM contas WHERE id_conta = $1 AND ativo = true', [id_conta])
        return resultado.rows
    }
    static async atualizarTodos(nome, tipo_conta, saldo, conta_padrao, id_conta) {
        const resultado = await BD.query('UPDATE contas SET nome = $1, tipo_conta = $2, saldo = $3, conta_padrao = $4 WHERE id_conta = $5 RETURNING *',
            [nome, tipo_conta, saldo, conta_padrao, id_conta]) // Comando SQL para atualizar a conta
        return resultado.rows[0]
    }
    static async atualizar(nome, tipo_conta, saldo, conta_padrao, id_conta) {
        // Inicializar arrays(vetores) para armazenar os campos e vetores a serem atualizados
        const campos = []
        const valores = []

        // Verificar quais campos foram fornecidos
        if (nome !== undefined) {
            campos.push(`nome = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(nome)
        }
        if (tipo_conta !== undefined) {
            campos.push(`tipo_conta = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(tipo_conta)
        }
        if (saldo !== undefined) {
            campos.push(`saldo = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(saldo)
        }
        if (conta_padrao !== undefined) {
            campos.push(`conta_padrao = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(conta_padrao)
        }
        if (campos.length === 0) {
            return res.status(400).json({message: 'Nenhum campo fornencido para atualização'})
        }

        // Montamos a query dinamicamente
        const query = `UPDATE contas SET ${campos.join(", ")} WHERE id_conta = ${id_conta} RETURNING *`
        // Executando nossa query
        const resultado = await BD.query(query, valores)
        // Varifica se o usuário foi atualizado
        if (resultado.rows.length === 0) {
            return res.status(404).json({message: 'Local de transacao não encontrado'})
        }
        return resultado.rows[0]
    }
    static async deletar(id_conta) {
        const resultado = await BD.query('UPDATE contas SET ativo = false WHERE id_conta = $1 RETURNING *', [id_conta])
        return resultado.rows[0]
    }
    static async filtrar(nome) {
        console.log(nome);
        
        const query = `SELECT * FROM contas WHERE nome LIKE $1 AND ativo = true ORDER BY nome DESC`
        const valores = [`%${nome}%`]
        const resultado = await BD.query(query, valores)
        return resultado.rows
    }
}

export default Contas