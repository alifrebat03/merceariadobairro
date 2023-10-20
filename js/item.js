//IMPORTANDO MÓDULO

//DECLAÇÃO DA CLASSE ITEM
class Item {
    constructor(id, descricao, preco, unidade, caminhoImg, quantidade) {
        this.id = id
        this.descricao = descricao
        this.preco = preco
        this.unidade = unidade
        this.caminhoImg = caminhoImg
        if (quantidade > 1) {
            this.quantidade = quantidade
        } else {
            this.quantidade = 1
        }
    }
}

//DECLARAÇÃO DE FUNÇÕES
const addSession = (itensSession) => {
    sessionStorage.setItem("itensSelecionado", JSON.stringify(itensSession))
}

const listaSession = () => {
    return JSON.parse(sessionStorage.getItem("itensSelecionado"))
}

const addItem = (pItem) => {
    const item = new Item(pItem.id, pItem.descricao, pItem.preco, pItem.und, pItem.caminhoimg, 1)
    addItens(item)
}

const addItens = (pitens) => {
    const itensSession = listaSession() ?? []
    let resultadoItem = -1

    for (let i in itensSession) {
        if (itensSession[i].id == pitens.id) {
            resultadoItem = i
            break;
        }
    }

    if (resultadoItem == -1) {
        itensSession.push(pitens)
    } else {
        itensSession[resultadoItem].quantidade += parseInt(1)
    }

    addSession(itensSession)
}

const listaItens = () => {
    return listaSession()
}

const removeItem = (index) => {
    const itensSession = listaSession() ?? []
    itensSession.splice(index, 1)

    addSession(itensSession)

    listaItens()
}

const alteraQuantidade = (quant, pos) => {
    const itensSession = listaSession()

    if (quant > -1) {
        itensSession[pos].quantidade = parseInt(quant)
    }else{
        itensSession[pos].quantidade = parseInt(1)
    }

    addSession(itensSession)

    listaItens()
}

const quantItens = () => {
    return itens.length
}

//EXPORTANDO FUNÇÕES
export { addItem, listaItens, removeItem, alteraQuantidade }