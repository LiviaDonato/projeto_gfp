import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { enderecoServidor } from "../utils";
import asyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

// Recebemos como props o navigation para navegar entre as telas
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function botaoEntrar() {
    try {
      if (email === "" || senha === "") {
        throw new Error("Preencha todos os campos");
      }

      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        asyncStorage.setItem("UsuarioLogado", JSON.stringify(dados));
        navigation.navigate('Principal')
      } else {
        throw new Error("Email ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert(error.message);
    }
  }

  return (
    <LinearGradient
      colors={["#663399", "#25003d"]} // ROXO ESCURO → ROSA ESCURO
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>ENTRAR</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        placeholder="Digite seu email"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <Text style={styles.label}>Senha:</Text>
      <TextInput
        placeholder="Digite sua senha"
        style={styles.input}
        onChangeText={setSenha}
        value={senha}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Acessar" color="#6a6ab0" onPress={botaoEntrar} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 40,
    marginBottom: 100,
    fontWeight: "bold",
    color: "#ccc",
  },
  label: {
    fontSize: 24,
    alignSelf: "flex-start",
    color: "#ccc",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ababd1",
    backgroundColor: "#ababd1",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
});

export default Login;
