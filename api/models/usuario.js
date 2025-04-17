import { BD } from '../db.js'

class Usuario {
    // Função estatica para novo usuário
    static async novoUsuario(nome, email, senhaCriptografada, tipo_acesso) {
        const resultado = await BD.query(`INSERT INTO usuarios(nome, email, senha, tipo_acesso)
            VALUES($1, $2, $3, $4) RETURNING *`, [nome, email, senhaCriptografada, tipo_acesso])
        return resultado.rows[0]
    }
    static async listar() {
        const resultado = await BD.query('SELECT * FROM usuarios WHERE ativo = true')
        return resultado.rows // retornar todos os usuarios
    }
    static async consultar(id_usuario) {
        const resultado = await BD.query('SELECT * FROM usuarios WHERE id_usuario = $1 AND ativo = true', [id_usuario])
        return resultado.rows
    }
    static async atualizarTodos(nome, email, senhaCriptografada, tipo_acesso, id_usuario) {
        const resultado = await BD.query('UPDATE usuarios SET nome = $1, email = $2, senha = $3, tipo_acesso = $4 WHERE id_usuario = $5 RETURNING *',
            [nome, email, senhaCriptografada, tipo_acesso, id_usuario]) // Comando SQL para atualizar o usuario
        return resultado.rows[0]
    }
    static async atualizar(nome, email, senhaCriptografada, tipo_acesso, id_usuario) {
        // Inicializar arrays(vetores) para armazenar os campos e vetores a serem atualizados
        const campos = []
        const valores = []

        // Verificar quais campos foram fornecidos
        if (nome !== undefined) {
            campos.push(`nome = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(nome)
        }
        if (email !== undefined) {
            campos.push(`email = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(email)
        }
        if (senhaCriptografada !== undefined) {
            campos.push(`senha = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(senhaCriptografada)
        }
        if (tipo_acesso !== undefined) {
            campos.push(`tipo_acesso = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(tipo_acesso)
        }
        if (campos.length === 0) {
            return res.status(400).json({message: 'Nenhum campo fornencido para atualização'})
        }

        // Montamos a query dinamicamente
        const query = `UPDATE usuarios SET ${campos.join(", ")} WHERE id_usuario = ${id_usuario} RETURNING *`
        // Executando nossa query
        const resultado = await BD.query(query, valores)
        // Varifica se o usuário foi atualizado
        if (resultado.rows.length === 0) {
            return res.status(404).json({message: 'Usuário não encontrado'})
        }
        return resultado.rows[0]
    }
    static async deletar(id_usuario) {
        const resultado = await BD.query('UPDATE usuarios SET ativo = false WHERE id_usuario = $1 RETURNING *', [id_usuario])
        return resultado.rows[0]
    }
}

export default Usuario