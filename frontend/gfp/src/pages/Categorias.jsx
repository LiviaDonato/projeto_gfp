import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UsuarioContext } from "../UsuarioContext"
import { enderecoServidor } from "../utils"
import { MdAdd, MdEdit, MdDelete, MdCreditCard, MdAccountBalance, MdEmail, MdFeaturedPlayList, MdAttachMoney, MdAutoGraph } from 'react-icons/md'
import Estilos from "../styles/Estilos";

export default function Categorias() {
    const navigate = useNavigate()
    const { dadosUsuario, setDadosUsuario, carregando } = useContext(UsuarioContext)
    const [dadosLista, setDadosLista] = useState([])

    const buscarDadosAPI = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/categorias`, {
                method: 'GET', headers: { 'Authorization': `Bearer ${dadosUsuario.token}` }
            })
            const dados = await resposta.json()
            setDadosLista(dados)
        } catch (error) {
            console.error('Erro ao buscar dados:', error)
        }
    }

    // Executa essa função quando o componente é criado [] vazio
    useEffect(() => {
        if (!carregando || dadosUsuario) {
            buscarDadosAPI()
        }
    }, [dadosUsuario])

    const botaoExcluir = async (id) => {
        try {
            if (!window.confirm("Tem certeza que deseja excluir está categoria?")) return
            const resposta = await fetch(`${enderecoServidor}/categorias/${id}`, {
                method: 'DELETE', headers: { 'Authorization': `Bearer ${dadosUsuario.token}` }
            })
            if (resposta.ok) {
                buscarDadosAPI()
            }
        } catch (error) {
            console.error('Erro ao excluir:', error)
        }
    }

    const exibirItemLista = (item) => {
        return (
            <div key={item.id} className={Estilos.linhaListagem}>
                <div className="p-2 bg-violet-100 text-violet-600 rounded-full">
                    {}
                </div>
                <div className="flex-1 ml-4">
                    <p className="font-bold text-purple-900">{item.nome}</p>
                    <p className="text-sm text-purple-800">0</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button className={Estilos.botaoAlterar} onClick={() => navigate('/cadcategorias', { state: {itemAlterar: item} })}><MdEdit className="h-6 w-6" /></button>
                    <button className={Estilos.botaoExcluir} onClick={() => botaoExcluir(item.id_categoria)}><MdDelete className="h-6 w-6" /></button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <p className="text-3xl font-bold mb-6">Categorias</p>
            <section className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-violet-800">Gerenciar Categorias</h3>
                    <button onClick={() => navigate('/cadcategorias')} className={Estilos.botaoCadastro}>
                        <MdAdd className="h-8 w-8" /> Nova Categoria
                    </button>
                </div>
                {/* Lista das categorias cadastradas */}
                <section>
                    {dadosLista.map(item => exibirItemLista(item))}
                </section>
            </section>
        </div>
    )
}