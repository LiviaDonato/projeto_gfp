import { createDrawerNavigator } from "@react-navigation/drawer"
import Principal from './Principal'
import Contas from "./Contas"
import { corPrincipal, corSecundaria, corTextos } from "../styles/Estilos"
import Categorias from "./Categorias"

const Drawer = createDrawerNavigator()

export default function MenuDrawer() {
    return (
        <Drawer.Navigator
            screenOptions={{
                // Estilo da barra superior
                headerStyle: {
                    backgroundColor: corSecundaria,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTintColor: corTextos,

                // Estilo do Drawer (menu lateral)
                drawerStyle: {
                    backgroundColor: corSecundaria,
                    width: 240,
                },
                drawerLabelStyle: {
                    color: corTextos,
                    fontSize: 16,
                    marginLeft: 8,
                },
                drawerActiveTintColor: corPrincipal,
                drawerInactiveTintColor: corTextos,
                drawerActiveBackgroundColor: '#3a1a5a',
            }}
        >
            <Drawer.Screen name="Principal" component={Principal} />
            <Drawer.Screen name="Contas" component={Contas} />
            <Drawer.Screen name="Categorias" component={Categorias} />
        </Drawer.Navigator>
    )
}
