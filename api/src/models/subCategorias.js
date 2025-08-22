import { BD } from '../../db.js'

class SubCategorias {
    // Função estatica para novo local de transacao
    static async novaSubCategoria(nome, gasto_fixo, id_categoria) {
        const resultado = await BD.query(`INSERT INTO subcategorias(nome, gasto_fixo, id_categoria)
            VALUES($1, $2, $3) RETURNING *`, [nome, gasto_fixo, id_categoria])
        return resultado.rows[0]
    }
    static async listar() {
        const resultado = await BD.query('SELECT s.nome as "Nome Subcategoria", s.gasto_fixo, s.id_subcategoria, s.id_categoria, c.nome as "Nome Categoria" FROM subcategorias as s LEFT JOIN categorias as c ON s.id_categoria = c.id_categoria WHERE s.ativo = true')
        console.log(resultado.rows);
        return resultado.rows // retornar todos os local de transacao
    }
    static async consultar(id_subcategoria) {
        const resultado = await BD.query('SELECT s.nome as "Nome Subcategoria", s.gasto_fixo, s.id_subcategoria, s.id_categoria, c.nome as "Nome Categoria" FROM subcategorias as s LEFT JOIN categorias as c ON s.id_categoria = c.id_categoria WHERE id_subcategoria = $1 AND s.ativo = true', [id_subcategoria])
        return resultado.rows
    }
    static async atualizarTodos(nome, gasto_fixo, id_categoria, id_subcategoria) {
        const resultado = await BD.query('UPDATE subcategorias SET nome = $1, gasto_fixo = $2, id_categoria = $3 WHERE id_subcategoria = $4 RETURNING *',
            [nome, gasto_fixo, id_categoria, id_subcategoria]) // Comando SQL para atualizar o subcategoria
        return resultado.rows[0]
    }
    static async atualizar(nome, gasto_fixo, id_categoria, id_subcategoria) {
        // Inicializar arrays(vetores) para armazenar os campos e vetores a serem atualizados
        const campos = []
        const valores = []

        // Verificar quais campos foram fornecidos
        if (nome !== undefined) {
            campos.push(`nome = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(nome)
        }
        if (gasto_fixo !== undefined) {
            campos.push(`gasto_fixo = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(gasto_fixo)
        }
        if (id_categoria !== undefined) {
            campos.push(`id_categoria = $${valores.length + 1}`) // Usa o tamanho da array para determinar o campo
            valores.push(id_categoria)
        }
        if (campos.length === 0) {
            return res.status(400).json({message: 'Nenhum campo fornencido para atualização'})
        }

        // Montamos a query dinamicamente
        const query = `UPDATE subcategorias SET ${campos.join(", ")} WHERE id_subcategoria = ${id_subcategoria} RETURNING *`
        // Executando nossa query
        const resultado = await BD.query(query, valores)
        // Varifica se o usuário foi atualizado
        if (resultado.rows.length === 0) {
            return res.status(404).json({message: 'subCategoria não encontrada'})
        }
        return resultado.rows[0]
    }
    static async deletar(id_subcategoria) {
        const resultado = await BD.query('UPDATE subcategorias SET ativo = false WHERE id_subcategoria = $1 RETURNING *', [id_subcategoria])
        return resultado.rows[0]
    }
}

export default SubCategorias