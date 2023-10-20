//IMPORTANDO MÓDULO
import { addItem } from './item.js'

//PEGANDO ELEMENTOS DO HTML (DOM)
const divProdutos = document.querySelector("#produtos")
const endPoint = "https://aleatorio--alissonfreire.repl.co/"

//DECLARÇÃO DE FUNÇÕES
const carregaProdutos = (dados) => {

    dados.sort((a, b) => {
        if (a.descricao > b.descricao)
            return 1
        if (a.descricao > b.descricao)
            return -1
        return 0
    })

    dados.map((elem, i) => {
        const divItem = document.createElement("div")
        divItem.setAttribute("class", "item")

        const divItemImg = document.createElement("div")
        divItemImg.setAttribute("class", "itemImg")
        divItemImg.setAttribute("title", elem.descricao)

        const imgProd = document.createElement("img")
        imgProd.setAttribute("src", elem.caminhoimg)
        imgProd.setAttribute("text", elem.descricao)

        divItemImg.appendChild(imgProd)

        const divTxtItem = document.createElement("div")
        divTxtItem.setAttribute("class", "txtItem")
        divTxtItem.innerHTML = elem.descricao

        const divVlrItem = document.createElement("div")
        divVlrItem.setAttribute("class", "vlrItem")
        divVlrItem.innerHTML = `R$ ${elem.preco.toFixed(2)} ${elem.und}`

        const btnAdd = document.createElement("button")
        btnAdd.setAttribute("class", "btnAdd")
        btnAdd.addEventListener("click", (evt) => {
            addItem(elem)

            window.location = "carrinho.html"
        })
        btnAdd.innerHTML = "ADICIONAR"

        divItem.appendChild(divItemImg)
        divItem.appendChild(divTxtItem)
        divItem.appendChild(divVlrItem)
        divItem.appendChild(btnAdd)

        divProdutos.appendChild(divItem)
    })

}

//PEGANDO OS DADOS DA API (REPLIT)
fetch(endPoint)
    .then(reposta => reposta.json())
    .then(dados => {
        carregaProdutos(dados)
    }).catch(error => {
        console.log(`NÃO POSSÍVEL CARREGAR OS PRODUTOS`)
    })








