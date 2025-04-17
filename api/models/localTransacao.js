import { BD } from '../db.js'

class LocalTransacao {
    // Função estatica para novo local de transacao
    static async novoLocalTransacao(nome, tipo_local, saldo) {
        const resultado = await BD.query(`INSERT INTO local_transacao(nome, tipo_local, saldo)
            VALUES($1, $2, $3) RETURNING *`, [nome, tipo_local, saldo])
        return resultado.rows[0]
    }
    static async listar() {
        const resultado = await BD.query('SELECT * FROM local_transacao WHERE ativo = true')
        return resultado.rows // retornar todos os local de transacao
    }
    static async consultar(id_local_transacao) {
        const resultado = await BD.query('SELECT * FROM local_transacao WHERE id_local_transacao = $1 AND ativo = true', [id_local_transacao])
        return resultado.rows
    }
    static async atualizarTodos(nome, tipo_local, saldo, id_local_transacao) {
        const resultado = await BD.query('UPDATE local_transacao SET nome = $1, tipo_local = $2, saldo = $3 WHERE id_local_transacao = $4 RETURNING *',
            [nome, tipo_local, saldo, id_local_transacao]) // Comando SQL para atualizar o local_transacao
        return resultado.rows[0]
    }
    static async atualizar(nome, tipo_local, saldo, id_local_transacao) {
        // Inicializar arrays(vetores) para armazenar os campos e vetores a serem atualizados
        const campos = []
        const valores = []

        // Verificar quais campos foram fornecidos
        if (nome !== undefined) {
            campos.push(`nome = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(nome)
        }
        if (tipo_local !== undefined) {
            campos.push(`tipo_local = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(tipo_local)
        }
        if (saldo !== undefined) {
            campos.push(`saldo = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(saldo)
        }
        if (campos.length === 0) {
            return res.status(400).json({message: 'Nenhum campo fornencido para atualização'})
        }

        // Montamos a query dinamicamente
        const query = `UPDATE local_transacao SET ${campos.join(", ")} WHERE id_local_transacao = ${id_local_transacao} RETURNING *`
        // Executando nossa query
        const resultado = await BD.query(query, valores)
        // Varifica se o usuário foi atualizado
        if (resultado.rows.length === 0) {
            return res.status(404).json({message: 'Local de transacao não encontrado'})
        }
        return resultado.rows[0]
    }
    static async deletar(id_local_transacao) {
        const resultado = await BD.query('UPDATE local_transacao SET ativo = false WHERE id_local_transacao = $1 RETURNING *', [id_local_transacao])
        return resultado.rows[0]
    }
}

export default LocalTransacao