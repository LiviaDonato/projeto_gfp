import React, { useEffect, useState, useLayoutEffect } from "react"
import { View, Text, TextInput, Switch, TouchableOpacity } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Estilos, { corPrincipal } from "../styles/Estilos"
import { enderecoServidor } from "../utils"

export default function CadContas({ navigation, route }) {
    const [inputNome, setInputNome] = useState('')
    const [inputTipo, setInputTipo] = useState('')
    const [inputSaldo, setInputSaldo] = useState('')
    const [inputContaPadrao, setInputContaPadrao] = useState(false)
    const [usuario, setUsuario] = useState({})

    const botaoSalvar = async () => {
        try {
            const dados = {
                nome: inputNome,
                tipo_conta: inputTipo,
                saldo: inputSaldo,
                conta_padrao: inputContaPadrao
            }
            let endpoint = `${enderecoServidor}/contas`
            let metodo = 'POST'

            if (route.params && route.params.Conta) {
                endpoint = `${enderecoServidor}/contas/${route.params.Conta.id_conta}`
                metodo = 'PATCH'
            }

            const resposta = await fetch(endpoint, {method: metodo,
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${usuario.token}`}, body: JSON.stringify(dados)})
            if (resposta.ok) {
                alert('Conta cadastrada com sucesso!')
                navigation.goBack()
            }
        } catch (error) {
            console.error('Erro ao salvar conta: ', error)
        }
    }

    useEffect(() => {
        buscarUsuarioLogado()
    }, [])

    useEffect(() => {
        if (route.params && route.params.Conta) {
            setInputNome(route.params.Conta.nome)
            setInputTipo(route.params.Conta.tipo_conta)
            setInputSaldo(route.params.Conta.saldo.toString())
            setInputContaPadrao(route.params.Conta.conta_padrao)
        }
    }, [route. params])

    const buscarUsuarioLogado = async () => {
        const UsuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
        if (UsuarioLogado) {
            setUsuario(JSON.parse(UsuarioLogado))
        } else {
            navigation.replace('Login')
        }
    }

    useLayoutEffect(() => {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={botaoSalvar}>
                        <MaterialIcons name="save" size={28} color="#ccc" style={{marginRight: 15}} />
                    </TouchableOpacity>
                )
            })
        }, [navigation, inputNome, inputTipo, inputSaldo, inputContaPadrao])

    return (
        <View style={Estilos.conteudoHeader}>
            <View style={Estilos.conteudoCorpo}>
                <Text>Nome da Conta:</Text>
                <TextInput placeholder="Digite o nome da Conta" value={inputNome} onChangeText={setInputNome} style={Estilos.inputCad} />
                <Text>Tipo da Conta:</Text>
                <TextInput placeholder="Digite o tipo da Conta" value={inputTipo} onChangeText={setInputTipo} style={Estilos.inputCad} />
                <Text>Saldo:</Text>
                <TextInput placeholder="Digite o nome da Conta" value={inputSaldo} onChangeText={setInputSaldo} style={Estilos.inputCad} keyboardType="numeric" />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Switch value={inputContaPadrao} onValueChange={setInputContaPadrao} />
                    <Text>Conta Padrão</Text>
                </View>
            </View>
        </View>
    )
}