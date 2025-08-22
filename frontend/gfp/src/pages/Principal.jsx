import React, { useState, useEffect, useContext } from "react"
import { UsuarioContext } from "../UsuarioContext";
import { useNavigate, Link, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Contas from "./Contas";
import logo from '../assets/logo.png'
import {
    MdAdd,
    MdCached,
    MdClose,
    MdCreditCard,
    MdGridView,
    MdLogout,
    MdMenu,
    MdOutlineLocalOffer,
    MdPeople
} from 'react-icons/md'
import CadContas from "./CadContas";

export default function Principal() {
    const { dadosUsuario, setDadosUsuario, carregando } = useContext(UsuarioContext)
    const [menuAberto, setMenuAberto] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!carregando && !dadosUsuario) {
            navigate('/login')
        }
    }, [dadosUsuario, carregando, navigate])

    const botaoLogout = () => {
        localStorage.removeItem('UsuarioLogado')
        setDadosUsuario(null)
        navigate("/")
    }

    return (
        <div className="flex h-screen font-sans bg-gradient-to-r from-[#6a6ab0] to-[#25003d]">
            {/* Div para fechar o menu clicando fora */}
            <div className={`fixed inset-0 bg-[rgba(0,0,0,0.3)] z-30 md:hidden ${menuAberto == true ? 'block' : 'hidden'}`} onClick={() => setMenuAberto(false)}></div>
            {/* Sidebar */}
            <section
                className={`fixed top-0 left-0 h-full w-64 bg-[rgba(102,51,153,0.9)] backdrop-blur-md text-white flex flex-col z-40 transform transition-transform
                md:relative md:w-20 lg:w-64 md:translate-x-0 ${menuAberto ? 'translate-x-0' : '-translate-x-full'} shadow-lg`}
            >
                <div className="flex justify-between items-center mb-6 p-4 border-b border-purple-300">
                    <div className="flex gap-2 items-center">
                        <img src={logo} alt="Logo GFP" className="w-8 h-8" />
                        <span className="text-xl font-bold md:hidden lg:block">GFP</span>
                    </div>
                    <button className="md:hidden" onClick={() => setMenuAberto(false)}>
                        <MdClose className="w-6 h-6 hover:text-purple-200" />
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex-1">
                    {[
                        { path: '/dashboard', icon: <MdGridView className="w-8 h-8" />, label: 'Dashboard' },
                        { path: '/transacoes', icon: <MdCached className="w-8 h-8" />, label: 'Transações' },
                        { path: '/contas', icon: <MdCreditCard className="w-8 h-8" />, label: 'Contas' },
                        { path: '/categorias', icon: <MdOutlineLocalOffer className="w-8 h-8" />, label: 'Categorias' }
                    ].map((item, index) => (
                        <div className="px-4 lg:px-6 mb-2" key={index}>
                            <Link
                                to={item.path}
                                onClick={() => setMenuAberto(false)}
                                className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-300
                                    ${location.pathname === item.path
                                        ? 'bg-purple-500 text-white shadow-md'
                                        : 'hover:bg-purple-700/70'
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium md:hidden lg:block">{item.label}</span>
                            </Link>
                        </div>
                    ))}
                </nav>

                {/* Nova Transação */}
                <div className="p-4 lg:p-6 border-t border-purple-300">
                    <button className="flex w-full items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all">
                        <MdAdd className="w-8 h-8" />
                        <span className="md:hidden lg:block">Nova Transação</span>
                    </button>
                </div>

                {/* Perfil + Logout */}
                <div className="border-t border-purple-300 pt-4">
                    <div className="flex items-center p-2">
                        <MdPeople className="w-10 h-10 p-2 bg-purple-500 text-purple-100 rounded-full" />
                        <div className="ml-3 md:hidden lg:block">
                            <p className="font-bold text-white">{dadosUsuario?.nome}</p>
                            <p className="text-purple-200">{dadosUsuario?.email}</p>
                        </div>
                    </div>
                    <button
                        className="flex gap-2 items-center w-full justify-center p-3 text-purple-300 hover:text-purple-100 transition-colors"
                        onClick={botaoLogout}
                    >
                        <MdLogout className="w-8 h-8" />
                        <span className="md:hidden lg:block">Sair</span>
                    </button>
                </div>
            </section>

            {/* Conteúdo Principal */}
            <section className="flex-1 p-4 text-gray-100 overflow-auto">
                <header className="flex items-center mb-3">
                    <button className="md:hidden">
                        <MdMenu className="w-8 h-8" onClick={() => setMenuAberto(true)} />
                    </button>
                    <div className="flex items-center justify-center flex-1 gap-2">
                        <img src={logo} alt="Logo GFP" className="w-8 h-8" />
                        <span className="font-bold text-xl">GFP</span>
                    </div>
                </header>
                <main className="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-lg min-h-[calc(100vh-6rem)]">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/contas" element={<Contas />} />
                        <Route path="/cadcontas" element={<CadContas />} />
                    </Routes>
                </main>
            </section>
        </div>
    )
}
