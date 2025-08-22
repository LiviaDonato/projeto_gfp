import React, { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { UsuarioContext } from "../UsuarioContext"
import { enderecoServidor } from "../utils"
import { MdCreditCard, MdSave, MdClose } from 'react-icons/md'
import Estilos from "../styles/Estilos";

export default function CadContas() {
    const navigate = useNavigate()
    const location = useLocation()
    const { dadosUsuario } = useContext(UsuarioContext)

    return (
        <div>
            Cadastro de Contas
        </div>
    )
}