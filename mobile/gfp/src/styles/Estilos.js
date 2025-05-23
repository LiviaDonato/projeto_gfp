export const corPrincipal = '#663399'
export const corSecundaria = '#25003d'
export const corTextos = '#ccc'
export const corFundo = '#0d0d0d'
export const corFundo2 = '#262626'

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
    }
}

export default Estilos