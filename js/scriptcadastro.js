const inputCep = document.querySelector("#numCep")
const inputNum = document.querySelector("#numero")
const divEnd = document.querySelector(".divEnd")

const carregaInputsCep = (dados) => {
    divEnd.classList.remove("divEnd")
    
    for (let i in dados) {
        if (document.querySelector("#" + i) && (dados[i] ?? "")) {
            document.querySelector("#" + i).value = dados[i]
            document.querySelector("#" + i).setAttribute("disabled", "disabled")
        }
    }

}

//CONSUMINDO API DO VIA CEP
inputCep.addEventListener("blur", (evt) => {
    let cep = evt.target.value.replace("-", "")

    if ((cep ?? null) && (cep.length == 8)) {
        const endPoint = `https://viacep.com.br/ws/${cep}/json/`
        carregaDadosAPI(endPoint)
    } else {
        divEnd.classList.add("divEnd")
    }
})

const carregaDadosAPI = (endPoint) => {
    fetch(endPoint)
        .then(resposta => resposta.json())
        .then(dados => {

            carregaInputsCep(dados)

            inputNum.focus()
        }).catch(error => {
            console.log(`NÃO FOI POSSÍVEL CARREGAR`)
        })
}

