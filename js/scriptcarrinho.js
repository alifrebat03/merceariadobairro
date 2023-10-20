//IMPORTANDO MÓDULO
import { listaItens, removeItem, alteraQuantidade } from './item.js'

//PEGANDO ELEMENTOS HTML (DOM)
const divPedidoBloco = document.querySelector("#pedido")
const divVlrSubtotal = document.querySelector("#vlrSubtotal")
const divVLrTaxa = document.querySelector("#vlrTaxa")
const divVlrTotal = document.querySelector("#vlrTotal")


//CRIANDO VARIÁVEIS PARA CÁLCULOS
let valorSubtotal = 0.0
let valorTaxa = 5.0
let valorTotal = 0.0

//CARREGANDO CARRINHO
listaItens().map((elem, i) => {
    const divItem = document.createElement("div")
    divItem.setAttribute("class", "item")

    const divImgItem = document.createElement("div")
    divImgItem.setAttribute("class","imgItem")

    const imgItem = document.createElement("img")
    imgItem.setAttribute("src", elem.caminhoImg)
    imgItem.setAttribute("text", elem.descricao)

    divImgItem.appendChild(imgItem)

    const divDescricaoValorUnitario = document.createElement("div")
    divDescricaoValorUnitario.setAttribute("class","descricaoValorUnitario")

    const divDescricaoItem = document.createElement("div")
    divDescricaoItem.setAttribute("class", "descricaoItem")
    divDescricaoItem.innerHTML = elem.descricao

    const divVlrResumo = document.createElement("div")
    divVlrResumo.setAttribute("class","vlrResumo")
    divVlrResumo.innerHTML = `R$ ${elem.preco.toFixed(2).replace(".",",")} ${elem.unidade}`

    divDescricaoValorUnitario.appendChild(divDescricaoItem)
    divDescricaoValorUnitario.appendChild(divVlrResumo)

    const divQuantInput = document.createElement("div")
    divQuantInput.setAttribute("class","quantInput")

    const inputQuant = document.createElement("input")
    inputQuant.setAttribute("type","text")
    inputQuant.setAttribute("name","quantidade"+i)
    inputQuant.setAttribute("id","quantidade"+i)
    inputQuant.setAttribute("class","input")
    inputQuant.setAttribute("maxlength","3")
    inputQuant.setAttribute("value", elem.quantidade)
    
    divQuantInput.appendChild(inputQuant)

    let calcItem = elem.preco * elem.quantidade
    valorSubtotal += calcItem
    valorTotal = valorSubtotal + valorTaxa

    const divVlrResumoCalc = document.createElement("div")
    divVlrResumoCalc.setAttribute("class","vlrResumo")
    divVlrResumoCalc.innerHTML = `R$ ${calcItem.toFixed(2).replace(".",",")}`

    const divBtnRemover = document.createElement("div")
    divBtnRemover.setAttribute("class","btnRemover")

    const imgBtnRemover = document.createElement("img")
    imgBtnRemover.setAttribute("src", "imagens/icones/remover.png")
    imgBtnRemover.setAttribute("title","Retira "+ elem.descricao+" do carrinho")
    imgBtnRemover.addEventListener("click", ()=>{
        if(window.confirm("Deseja retirar "+ elem.descricao +" do carrinho?"))
            removeItem(i)
        window.location="carrinho.html"
    })

    divBtnRemover.appendChild(imgBtnRemover)

    divItem.appendChild(divImgItem)
    divItem.appendChild(divDescricaoValorUnitario)
    divItem.appendChild(divQuantInput)
    divItem.appendChild(divVlrResumoCalc)
    divItem.appendChild(divBtnRemover)

    divPedidoBloco.appendChild(divItem)

    divVlrSubtotal.innerHTML = `<span> R$ </span> ${valorSubtotal.toFixed(2).replace(".",",")}`
    divVLrTaxa.innerHTML = `<span> R$ </span> ${valorTaxa.toFixed(2).replace(".",",")}`
    divVlrTotal.innerHTML = `<span> R$ </span> ${valorTotal.toFixed(2).replace(".",",")}`

})

//CRIANDO EVENTOS
const inputsQuant = [...document.querySelectorAll(".input")]

inputsQuant.map((elem, i)=>{
    elem.addEventListener("change",(evt)=>{
        evt.preventDefault()
        alteraQuantidade(evt.target.value, i)
        window.location="carrinho.html"
    })
})

