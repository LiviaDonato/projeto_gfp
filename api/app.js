import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors'
import UsuarioRoutes from './src/routes/usuarioRoutes.js'
import ContaRoutes from './src/routes/contasRoutes.js'
import CategoriasRoutes from './src/routes/categoriasRoutes.js'
import SubCategoriasRoutes from './src/routes/subCategoriasRoutes.js'
import TransacaoRoutes from './src/routes/transacaoRoutes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'

const app = express()
testarConexao()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => {
    res.redirect('/api-docs')
})

// Definir as rotas de usuario importadas no arquivo
app.use(UsuarioRoutes)

// Definir as rotas de local de transacao importadas no arquivo
app.use(ContaRoutes)

// Definir as rotas de categorias importadas no arquivo
app.use(CategoriasRoutes)

// Definir as rotas de subcategorias importadas no arquivo
app.use(SubCategoriasRoutes)

// Definir as rotas de transacao importadas no arquivo
app.use(TransacaoRoutes)

// Define a porta do servidor
const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando em: http://localhost:${porta}`);
})