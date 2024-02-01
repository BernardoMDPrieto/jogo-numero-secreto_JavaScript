let listaDeNumerosSorteados = []
let intervaloDeNumeros = 10
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1


function exibirTexto(tag, texto){
    let campo = document.getElementById(tag)
    campo.innerHTML = texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2})
}
function exibirMensagemInicial(){
    exibirTexto("titulo_jogo","Jogo do número secreto")
    exibirTexto("texto_paragrafo","Escolha um número entre 1 e 10")
}
exibirMensagemInicial()

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * intervaloDeNumeros) + 1
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio()
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido
    }

}

function verificarChute(){
    let chute = document.getElementById("resposta_input").value

    if(chute == numeroSecreto){
        var mensagem = tentativas > 1 ? `Você acertou com ${tentativas} tentativas` : `Você acertou com ${tentativas} tentativa`
        exibirTexto("titulo_jogo","Acertou!")
        exibirTexto("texto_paragrafo", mensagem)
        document.getElementById("reiniciar").removeAttribute("disabled")
    } else{
        if(chute > numeroSecreto){
            exibirTexto("titulo_jogo", "O número secreto é menor")
        } else{
            exibirTexto("titulo_jogo", "O número secreto é maior")
        }
        tentativas++
        limpaValor()
    }
    
}
function limpaValor(){
    chute = document.getElementById("resposta_input")
    chute.value = ""
}

function novoJogo(){
    if(listaDeNumerosSorteados.length == intervaloDeNumeros){
        listaDeNumerosSorteados.length = 0
    }
    tentativas = 1
    numeroSecreto = gerarNumeroAleatorio()
    limpaValor()
    exibirMensagemInicial()
    document.getElementById("reiniciar").setAttribute("disabled",true)
}