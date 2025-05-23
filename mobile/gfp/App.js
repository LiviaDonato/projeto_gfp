import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from './src/pages/Login'
import MenuDrawer from './src/pages/MenuDrawer'
import CadContas from "./src/pages/CadContas"
import { corSecundaria, corTextos } from "./src/styles/Estilos"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // Estilo da barra superior
            headerStyle: {
              backgroundColor: corSecundaria,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTintColor: corTextos
          }}
      >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="MenuDrawer" component={MenuDrawer} options={{headerShown: false}} />
        <Stack.Screen name="CadContas" component={CadContas} options={{title: 'Cadastro de Contas'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}