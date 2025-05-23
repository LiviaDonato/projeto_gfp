import { response } from "express"
import swaggerJSDoc from "swagger-jsdoc"

const swaggerDefinition = {
    openapi: '3.0.4',
    info: {
        title: 'API do Gestor Financeiro Pessoal',
        version: '1.0.0',
        description: `API para gerenciamento financeiro pessoal desenvolvida no curso Técnico de Desenvolvimento de Sistemas do SENAI`
    },
    servers: [
        {
            url: 'http://localhost:3000/',
            description: 'Servidor Local'
        },
        {
            url: 'http://192.168.0.237:3000',
            description: 'Servidor de API do Douglas'
        }
    ],
    tags: [
        {
            name: 'Usuarios',
            description: 'Rotas para cadastro, leitura, login, atualização e desativação de usuários'
        },
        {
            name: 'Categorias',
            description: 'Rotas para cadastro, leitura, atualizacao e desativação de categorias'
        },
        {
            name: 'Contas',
            description: 'Rotas para cadastro, leitura, atualizacao e desativação de contas'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    paths: {
        '/usuarios': {
            post: {
                tags: ['Usuarios'],
                summary: 'Cadastrar novo usuário',
                description: 'Método utilizado para cadastrar novos usuários',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'email', 'senha', 'tipo_acesso'],
                                properties: {
                                    nome: { type: 'string', example: 'João Silva' },
                                    email: { type: 'string', example: 'joao@example.com' },
                                    senha: { type: 'string', example: '123' },
                                    tipo_acesso: { type: 'string', example: 'adm' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Usuário cadastrado com sucesso'
                    },
                    '201': {
                        description: 'Usuário cadastrado com sucesso'
                    },
                    '400': {
                        description: 'Erro ao cadastrar usuário'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
            get: {
                tags: ['Usuarios'],
                summary: 'Listar todos os usuários',
                description: 'Método utilizado para listar todos os usuários cadastrados',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Lista de usuários',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id_usuario: { type: 'integer', example: 1 },
                                            nome: { type: 'string', example: 'João Silva' },
                                            email: { type: 'string', example: 'joao@example.com' },
                                            senha: { type: 'string', example: '123' },
                                            tipo_acesso: { type: 'string', example: 'adm' },
                                            ativo: { type: 'boolean', example: true },
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },
        '/usuarios/{id_usuario}': {
            get: {
                tags: ['Usuarios'],
                summary: 'Consultar usuario',
                description: 'Rota para consultar usuario',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id_usuario',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Usuario consultado com sucesso!'
                    },
                    '500': {
                        description: 'Erro ao consultar usuario'
                    }
                }
            },
            put: {
                tags: ['Usuarios'],
                summary: 'Atualizar todos os campos de usuario',
                description: 'Rota para atualizar todos os campos de usuario',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'email', 'senha', 'tipo_acesso'],
                                properties: {
                                    nome: { type: 'string', example: 'João Silva' },
                                    email: { type: 'string', example: 'joao@example.com' },
                                    senha: { type: 'string', example: '123' },
                                    tipo_acesso: { type: 'string', example: 'adm' }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id_usuario',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Usuario atualizado com sucesso!'
                    },
                    '500': {
                        description: 'Erro ao atualizar usuario'
                    }
                }
            },
            patch: {
                tags: ['Usuarios'],
                summary: 'Atualizar usuario',
                description: 'Rota para atualizar usuario',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'email', 'senha', 'tipo_acesso'],
                                properties: {
                                    nome: { type: 'string', example: 'João Silva' }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id_usuario',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Usuario atualizado com sucesso!'
                    },
                    '500': {
                        description: 'Erro ao atualizar usuario'
                    }
                }
            },
            delete: {
                tags: ['Usuarios'],
                summary: 'Desativar usuario',
                description: 'Rota para desativar usuario',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id_usuario',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Usuario desativado com sucesso!'
                    },
                    '500': {
                        description: 'Erro ao desativar usuario'
                    }
                }
            }
        },
        '/usuarios/login': {
            post: {
                tags: ['Usuarios'],
                summary: 'Login do usuário',
                description: 'Método utilizado para efetuar o login do usuário e gerar o token',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'senha'],
                                properties: {
                                    email: { type: 'string', example: 'teste@teste' },
                                    senha: { type: 'string', example: '123' },
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Usuário encontrado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            token: { type: 'string', example: 'jkdnaskjdbaskjndlaksnmmlmcaj21lekn1lkn213n12jb3kj 21' },
                                            id_usuario: { type: 'integer', example: 1 },
                                            nome: { type: 'string', example: 'João Silva' },
                                            email: { type: 'string', example: 'joao@example.com' },
                                            senha: { type: 'string', example: '123' },
                                            tipo_acesso: { type: 'string', example: 'adm' },
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Erro ao encontrar usuário'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },

        },
        '/categorias': {
            post: {
                tags: ['Categorias'],
                summary: 'Cadastrar nova categoria',
                description: 'Rota para cadastrar nova categoria',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'tipo_transacao', 'gasto_fixo', 'id_usuario', 'cor', 'icone'],
                                properties: {
                                    nome: {type: 'string', example: 'Alimentação'},
                                    tipo_transacao: {type: 'string', example: 'ENTRADA'},
                                    gasto_fixo: {type: 'boolean', example: true},
                                    id_usuario: {type: 'integer', example: 6},
                                    cor: {type: 'string', example: '#fff'},
                                    icone: {type: 'string', example: 'save'}
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Categorias cadastradas'
                    },
                    '400': {
                        description: 'Erro ao cadastrar categoria'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
            get: {
                tags: ['Categorias'],
                summary: 'Listar todas as categorias',
                description: 'Método utilizado para listar todas as categorias cadastradas',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Lista de categorias',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id_usuario: { type: 'integer', example: 1 },
                                            nome: { type: 'string', example: 'João Silva' },
                                            email: { type: 'string', example: 'joao@example.com' },
                                            senha: { type: 'string', example: '123' },
                                            tipo_acesso: { type: 'string', example: 'adm' },
                                            ativo: { type: 'boolean', example: true },
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },
        '/categorias/{id_categoria}': {
            get: {
                tags: ['Categorias'],
                summary: 'Consultar categoria',
                description: 'Rota para consultar categoria',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id_categoria',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'categoria consultado com sucesso!'
                    },
                    '500': {
                        description: 'Erro ao consultar categoria'
                    }
                }
            },
            put: {
                tags: ['Categorias'],
                summary: 'Atualizar todos os campos de categoria',
                description: 'Rota para atualizar todos os campos de categoria',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'email', 'senha', 'tipo_acesso'],
                                properties: {
                                    nome: { type: 'string', example: 'João Silva' },
                                    email: { type: 'string', example: 'joao@example.com' },
                                    senha: { type: 'string', example: '123' },
                                    tipo_acesso: { type: 'string', example: 'adm' }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id_categoria',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'categoria atualizado com sucesso!'
                    },
                    '500': {
                        description: 'Erro ao atualizar categoria'
                    }
                }
            },
            patch: {
                tags: ['Categorias'],
                summary: 'Atualizar categoria',
                description: 'Rota para atualizar categoria',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'email', 'senha', 'tipo_acesso'],
                                properties: {
                                    nome: { type: 'string', example: 'João Silva' }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id_categoria',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'categoria atualizado com sucesso!'
                    },
                    '500': {
                        description: 'Erro ao atualizar categoria'
                    }
                }
            },
            delete: {
                tags: ['Categorias'],
                summary: 'Desativar categoria',
                description: 'Rota para desativar categoria',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id_categoria',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'categoria desativado com sucesso!'
                    },
                    '500': {
                        description: 'Erro ao desativar categoria'
                    }
                }
            }
        },
        '/contas': {
            post: {
                tags: ['Contas'],
                summary: 'Cadastrar nova conta',
                description: 'Rota para cadastrar nova conta',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [nome, tipo_conta, saldo, conta_padrao],
                                properties: {
                                    nome: {type: 'string', example: 'Alimentação'},
                                    tipo_conta: {type: 'string', example: 'pix'},
                                    saldo: {type: 'boolean', example: true},
                                    id_usuario: {type: 'integer', example: 6},
                                    cor: {type: 'string', example: '#fff'},
                                    icone: {type: 'string', example: 'save'}
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'contas cadastradas'
                    },
                    '400': {
                        description: 'Erro ao cadastrar conta'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
            get: {
                tags: ['Contas'],
                summary: 'Listar todas as contas',
                description: 'Método utilizado para listar todas as contas cadastradas',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Lista de contas',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id_usuario: { type: 'integer', example: 1 },
                                            nome: { type: 'string', example: 'João Silva' },
                                            email: { type: 'string', example: 'joao@example.com' },
                                            senha: { type: 'string', example: '123' },
                                            tipo_acesso: { type: 'string', example: 'adm' },
                                            ativo: { type: 'boolean', example: true },
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },
        '/contas/{id_conta}': {
            get: {
                tags: ['Contas'],
                summary: 'Consultar conta',
                description: 'Rota para consultar conta',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id_conta',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'conta consultado com sucesso!'
                    },
                    '500': {
                        description: 'Erro ao consultar conta'
                    }
                }
            },
            put: {
                tags: ['Contas'],
                summary: 'Atualizar todos os campos de conta',
                description: 'Rota para atualizar todos os campos de conta',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'email', 'senha', 'tipo_acesso'],
                                properties: {
                                    nome: { type: 'string', example: 'João Silva' },
                                    email: { type: 'string', example: 'joao@example.com' },
                                    senha: { type: 'string', example: '123' },
                                    tipo_acesso: { type: 'string', example: 'adm' }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id_conta',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'conta atualizado com sucesso!'
                    },
                    '500': {
                        description: 'Erro ao atualizar conta'
                    }
                }
            },
            patch: {
                tags: ['Contas'],
                summary: 'Atualizar conta',
                description: 'Rota para atualizar conta',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'email', 'senha', 'tipo_acesso'],
                                properties: {
                                    nome: { type: 'string', example: 'João Silva' }
                                }
                            }
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id_conta',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'conta atualizado com sucesso!'
                    },
                    '500': {
                        description: 'Erro ao atualizar conta'
                    }
                }
            },
            delete: {
                tags: ['Contas'],
                summary: 'Desativar conta',
                description: 'Rota para desativar conta',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: 'id_conta',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'conta desativado com sucesso!'
                    },
                    '500': {
                        description: 'Erro ao desativar conta'
                    }
                }
            }
        }
    }
}

const options = {
    swaggerDefinition,
    apis: []
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec