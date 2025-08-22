import { BD } from '../../db.js'

class Categorias {
    // Função estatica para novo local de transacao
    static async novaCategoria(nome, tipo_transacao, gasto_fixo, id_usuario, cor, icone) {
        const resultado = await BD.query(`INSERT INTO categorias(nome, tipo_transacao, gasto_fixo, id_usuario, cor, icone)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [nome, tipo_transacao, gasto_fixo, id_usuario, cor, icone])
        return resultado.rows[0]
    }
    static async listar() {
        const resultado = await BD.query('SELECT c.*, u.nome as nome_usuario FROM categorias as c LEFT JOIN usuarios as u ON c.id_usuario = u.id_usuario WHERE c.ativo = true')
        return resultado.rows // retornar todos os local de transacao
    }
    static async consultar(id_categoria) {
        const resultado = await BD.query('SELECT c.*, u.nome FROM categorias as c LEFT JOIN usuarios as u ON c.id_usuario = u.id_usuario WHERE id_categoria = $1 AND c.ativo = true', [id_categoria])
        return resultado.rows
    }
    static async atualizarTodos(nome, tipo_transacao, gasto_fixo, id_usuario, cor, icone, id_categoria) {
        const resultado = await BD.query('UPDATE categorias SET nome = $1, tipo_transacao = $2, gasto_fixo = $3, id_usuario = $4, cor = $5, icone = $6 WHERE id_categoria = $7 RETURNING *',
            [nome, tipo_transacao, gasto_fixo, id_usuario, cor, icone, id_categoria]) // Comando SQL para atualizar o categoria
        return resultado.rows[0]
    }
    static async atualizar(nome, tipo_transacao, gasto_fixo, id_usuario, cor, icone, id_categoria) {
        // Inicializar arrays(vetores) para armazenar os campos e vetores a serem atualizados
        const campos = []
        const valores = []

        // Verificar quais campos foram fornecidos
        if (nome !== undefined) {
            campos.push(`nome = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(nome)
        }
        if (tipo_transacao !== undefined) {
            campos.push(`tipo_transacao = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(tipo_transacao)
        }
        if (gasto_fixo !== undefined) {
            campos.push(`gasto_fixo = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(gasto_fixo)
        }
        if (id_usuario !== undefined) {
            campos.push(`id_usuario = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(id_usuario)
        }
        if (cor !== undefined) {
            campos.push(`cor = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(cor)
        }
        if (icone !== undefined) {
            campos.push(`icone = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(icone)
        }
        if (campos.length === 0) {
            return res.status(400).json({message: 'Nenhum campo fornencido para atualização'})
        }

        // Montamos a query dinamicamente
        const query = `UPDATE categorias SET ${campos.join(", ")} WHERE id_categoria = ${id_categoria} RETURNING *`
        // Executando nossa query
        const resultado = await BD.query(query, valores)
        // Varifica se o usuário foi atualizado
        if (resultado.rows.length === 0) {
            return res.status(404).json({message: 'Categoria não encontrada'})
        }
        return resultado.rows[0]
    }
    static async deletar(id_categoria) {
        const resultado = await BD.query('UPDATE categorias SET ativo = false WHERE id_categoria = $1 RETURNING *', [id_categoria])
        return resultado.rows[0]
    }
    static async filtrar(tipo_transacao) {
        const query = `SELECT * FROM categorias WHERE tipo_transacao = $1 AND ativo = true ORDER BY nome DESC`
        const valores = [tipo_transacao]
        const resultado = await BD.query(query, valores)
        return resultado.rows
    }
}

export default Categorias