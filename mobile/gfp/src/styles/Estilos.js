import { Button } from "react-native"

export const corPrincipal = '#663399'
export const corSecundaria = '#25003d'
export const corTextos = '#ccc'
export const corFundo = '#0d0d0d'
export const corInput = '#ababd1'

const Estilos = {
    conteudo: {
        flex: 1,
        width: '100%',
        backgroundColor: corFundo
    },
    conteudoHeader: {
        flex: 1,
        backgroundColor: corSecundaria
    },
    conteudoCorpo: {
        flex: 1,
        backgroundColor: '#ccc',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 15
    },
    imagemLista: {
        width: 35,
        height: 35,
        marginRight: 10
    },
    itemLista: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#262626',
        paddingVertical: 7
    },
    textConteiner: {
        flex: 1
    },
    nomeLista: {
        fontSize: 16,
        fontWeight: 'bold',
        color: corSecundaria
    },
    inputCad: {
        marginTop: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff'
    },
    icons: {
        borderRadius: 20,
        width: 40,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    modalConteudo: {
        backgroundColor: corSecundaria,
        padding: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    modalTitulo: {
        fontSize: 30,
        color: corTextos,
        marginBottom: 16
    },
    inputModal: {
        backgroundColor: corInput,
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 16
    },
    modalBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    corBotao: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 8,
        borderWidth: 3,
        borderColor: corInput
    },
    iconeBotao: {
        width: 40,
        height: 40,
        padding: 8,
        backgroundColor: corInput,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    seletorContainer: {
        backgroundColor: corSecundaria,
        padding: 16,
        borderRadius: 16,
    },
    listaModal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8
    },
    button: {
        backgroundColor: '#663399',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: corTextos,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    }
}

export default Estilos