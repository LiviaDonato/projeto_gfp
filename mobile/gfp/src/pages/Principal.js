import React, { useState, useEffect } from 'react'
import { Text, View, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Principal({ navigation }) {
    const [usuario, setUsuario] = useState({})
    useEffect(() => {
        const buscarUsuarioLogado = async () => {
            const UsuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
            if (UsuarioLogado) {
                setUsuario(JSON.parse(UsuarioLogado))
            } else {
                navigation.replace('Login')
            }
        }
        buscarUsuarioLogado()
    }, [])
    const botaoLogout = () => {
        AsyncStorage.removeItem('UsuarioLogado')
        navigation.navigate('Login')
    }

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', gap: '5px'}}>
                <Text>Usuário: {usuario.nome}</Text>
                <Button title='Sair' onPress={botaoLogout}/>
            </View>
            <Text>Principal</Text>
        </View>
    )
}