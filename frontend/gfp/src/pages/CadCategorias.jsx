import React, { useState, useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { UsuarioContext } from "../UsuarioContext"
import { MdCreditCard, MdSave, MdClose } from "react-icons/md"
import Estilos from "../styles/Estilos"
import { enderecoServidor } from "../utils"

export default function CadCategorias() {
    const navigate = useNavigate()
    const location = useLocation()
    const { dadosUsuario } = useContext(UsuarioContext)

    const [nome, setNome] = useState("")
    const [tipoConta, setTipoConta] = useState("CONTA_CORRENTE")
    const [saldoInicial, setSaldoInicial] = useState(0)
    const itemAlterar = location.state?.itemAlterar || null

    useEffect(() => {
        if (itemAlterar) {
            setNome(itemAlterar.nome)
            setTipoConta(itemAlterar.tipo_conta)
            setSaldoInicial(itemAlterar.saldo)
        }
    }, [itemAlterar])

    const botaoSalvar = async () => {
        if (nome.trim() == '') {
            alert("Informe o nome da conta")
            return
        }
        const dados = {
            nome: nome,
            tipo_conta: tipoConta,
            saldo: parseFloat(saldoInicial) || 0
        }
        try {
            let endpoint = `${enderecoServidor}/categorias`
            let metodo = 'POST'

            if (itemAlterar) {
                endpoint = `${enderecoServidor}/categorias/${itemAlterar.id_categoria}`
                metodo = 'PATCH'
            }

            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${dadosUsuario.token}` }, body: JSON.stringify(dados)
            })
            if (resposta.ok) {
                alert('Conta cadastrada com sucesso!')
                navigate('/categorias')
            }
        } catch (error) {
            alert("Erro ao salvar conta: " + error.message)
            console.error("Erro ao salvar conta: ", error)
        }
    }

    return (
        <div className="flex justify-center py-6 px-4">
            <section className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl text-gray-700 animate-fade-in">
                {/* Cabeçalho */}
                <header className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-200">
                    <MdCreditCard className="text-cyan-600 h-9 w-9" />
                    <h2 className="text-2xl font-bold tracking-wide">
                        { itemAlterar ? 'Editar Conta' : 'Nova Conta' }
                    </h2>
                </header>

                {/* Formulário */}
                <div className="space-y-5">
                    <label className={Estilos.labelCadastro}>Nome da Categoria</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Ex.: Carteira"
                        className={Estilos.inputCadastro}
                    />

                    <label className={Estilos.labelCadastro}>Tipo de Categoria</label>
                    <select
                        value={tipoConta}
                        onChange={(e) => setTipoConta(e.target.value)}
                        className={Estilos.inputCadastro}
                    >
                        <option value="CONTA_CORRENTE">Conta Corrente</option>
                        <option value="POUPANCA">Poupança</option>
                        <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                        <option value="CARTAO_DEBITO">Cartão de Débito</option>
                        <option value="DINHEIRO">Dinheiro</option>
                        <option value="INVESTIMENTO">Investimento</option>
                    </select>

                    <label className={Estilos.labelCadastro}>Saldo Inicial</label>
                    <input
                        type="number"
                        value={saldoInicial}
                        onChange={(e) => setSaldoInicial(e.target.value)}
                        className={Estilos.inputCadastro}
                    />

                    {/* Botões */}
                    <div className="flex justify-end gap-3 mt-8">
                        <button className={Estilos.botaoOutline} onClick={() => navigate("/categorias")}>
                            <MdClose /> Cancelar
                        </button>
                        <button className={Estilos.botao} onClick={botaoSalvar}>
                            <MdSave /> Salvar
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
