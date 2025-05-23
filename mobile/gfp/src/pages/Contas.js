import React, { useEffect, useLayoutEffect, useState } from "react"
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Estilos, { corPrincipal } from "../styles/Estilos"
import { enderecoServidor } from "../utils"
import { useIsFocused } from "@react-navigation/native"

export default function Contas({ navigation }) {
    const [dadosLista, setDadosLista] = useState([])
    const [usuario, setUsuario] = useState({})

    // Hook para verificar se a tela está em foco
    const isFocused = useIsFocused()

    const buscarDadosAPI = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/contas`, {
                method: 'GET', headers: { 'Authorization': `Bearer ${usuario.token}` }
            })
            const dados = await resposta.json()
            setDadosLista(dados)
        } catch(error) {
            console.error('Erro ao buscar dados:', error)
        }
    }

    const buscarUsuarioLogado = async () => {
        const UsuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
        if (UsuarioLogado) {
            setUsuario(JSON.parse(UsuarioLogado))
        } else {
            navigation.replace('Login')
        }
    }

    // Executa essa função quando o componente é criado [] vazio
    useEffect(() => {
        buscarUsuarioLogado()
    }, [])

    // Executa essa função quando o usuario é alteriado
    useEffect(() => {
        if (isFocused && usuario?.token) {
        buscarDadosAPI()
        }
    }, [usuario, isFocused])

    const botaoExcluir = async (id) => {
        try {
            if (!confirm("Tem certeza que deseja excluir está conta?")) return
            const resposta = await fetch(`${enderecoServidor}/contas/${id}`, {
                method: 'DELETE', headers: { 'Authorization': `Bearer ${usuario.token}` }
            })
            if (resposta.ok) {
                buscarDadosAPI()
            }
        } catch(error) {
            console.error('Erro ao excluir:', error)
        }
    }

    const exibirItemLista = ({item}) => {
        return (
            <TouchableOpacity style={Estilos.itemLista}>
                <Image source={require('../assets/logo.png')} style={Estilos.imagemLista} />
                <View style={Estilos.textConteiner}>
                    <Text>{item.tipo_conta}</Text>
                    <Text style={Estilos.nomeLista}>{item.nome}</Text>
                </View>
                <MaterialIcons name="edit" size={24} color={corPrincipal} onPress={() => navigation.navigate('CadContas', {Conta: item})} />
                <MaterialIcons name="delete" size={24} color={corPrincipal} onPress={() => botaoExcluir(item.id_conta)} />
            </TouchableOpacity>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('CadContas')}>
                    <MaterialIcons name="add" size={28} color="#ccc" style={{marginRight: 15}} />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View style={Estilos.conteudoHeader}>
            <View style={Estilos.conteudoCorpo}>
            <FlatList data={dadosLista} renderItem={exibirItemLista} keyExtractor={(item) => item.id_conta} />
            </View>
        </View>
    )
}