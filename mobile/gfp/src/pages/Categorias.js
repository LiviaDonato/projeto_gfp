import React, { useEffect, useLayoutEffect, useState } from "react"
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Estilos, { corPrincipal, corSecundaria } from "../styles/Estilos"
import { enderecoServidor } from "../utils"

export default function Categorias({ navigation }) {
    const [dadosLista, setDadosLista] = useState([])
    const [usuario, setUsuario] = useState({})
    const [atualizando, setAtualizando] = useState(false)

    const buscarDadosAPI = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/categorias`, {
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
        if (usuario?.token) {
        buscarDadosAPI()
        }
    }, [usuario])

    const botaoExcluir = async (id) => {
        try {
            if (!confirm("Tem certeza que deseja excluir está categoria?")) return
            const resposta = await fetch(`${enderecoServidor}/categorias/${id}`, {
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
        console.log(item.cor)
        return (
            <TouchableOpacity style={Estilos.itemLista}>
                <View style={[Estilos.icons, {backgroundColor: item.cor}]}>
                <MaterialIcons name={item.icone} size={25} color='#fff' />
                </View>
                <View style={Estilos.textConteiner}>
                    <Text style={Estilos.nomeLista}>{item.nome}</Text>
                    <Text>R$0,00</Text>
                </View>
                <MaterialIcons name="edit" size={24} color={corPrincipal} />
                <MaterialIcons name="delete" size={24} color={corPrincipal} onPress={() => botaoExcluir(item.id_categoria)} />
            </TouchableOpacity>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity>
                    <MaterialIcons name="add" size={28} color="#ccc" style={{marginRight: 15}} />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View style={Estilos.conteudoHeader}>
            <View style={Estilos.conteudoCorpo}>
            <FlatList data={dadosLista} renderItem={exibirItemLista} keyExtractor={(item) => item.id_categoria} refreshControl={
                <RefreshControl refreshing={atualizando} onRefresh={buscarDadosAPI} colors={[corSecundaria]} />
            } />
            </View>
        </View>
    )
}