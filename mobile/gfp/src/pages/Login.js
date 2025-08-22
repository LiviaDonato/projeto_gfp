import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import { enderecoServidor } from "../utils";
import asyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

// Recebemos como props o navigation para navegar entre as telas
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

  useEffect(() => {
    const buscarUsuarioLogado = async () => {
      const UsuarioLogado = await asyncStorage.getItem("UsuarioLogado");
      if (UsuarioLogado) {
        const usuario = JSON.parse(UsuarioLogado);
        if (usuario.lembrar == true) {
          navigation.navigate("MenuDrawer");
        }
      }
    };
    buscarUsuarioLogado();
  }, []);

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
        asyncStorage.setItem(
          "UsuarioLogado",
          JSON.stringify({ ...dados, lembrar })
        );
        navigation.replace("MenuDrawer");
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%", // <-- ESSENCIAL
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Switch value={lembrar} onValueChange={setLembrar} />
          <Text style={{ color: "#ccc" }}>Lembrar-me</Text>
        </View>

        <TouchableOpacity>
          <Text style={{ color: "#ccc" }}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={botaoEntrar} style={styles.buttonContainer}>
        <Text style={styles.text}>Acessar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    pointerEvents: 'auto'
  },
  title: {
    fontSize: 60,
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
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    backgroundColor: '#ababd1',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Login;
