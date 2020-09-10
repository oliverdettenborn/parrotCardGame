
//---------------------------------------------------------------------------------variaveis globais para controle do jogo
var countJogada = 0;
var countAcerto = 0;
var cartasViradas = [];
var acertosParaFinalizar = 0;
var ul = document.querySelector(".cartas");


//-------------------------------------------------------------------------------array com os parrots
var imgParrots = [
    "imagens/bobrossparrot.gif",
    "imagens/explodyparrot.gif",
    "imagens/fiestaparrot.gif",
    "imagens/metalparrot.gif",
    "imagens/revertitparrot.gif",
    "imagens/tripletsparrot.gif",
    "imagens/unicornparrot.gif"
];


//---------------------------------------------------------------------array com os parrots sorteado pelo total de cartas
var selecionados = [];

//---------------------------------------------------------------------------------sorteando os papagaios
function sortearParrots(qtdCartas){
    for(var i = 0; i < qtdCartas/2; i++){
        var indiceSorteio = Math.floor(imgParrots.length * Math.random());
        selecionados.push(imgParrots[indiceSorteio]);
        selecionados.push(imgParrots[indiceSorteio]);
        imgParrots.splice(indiceSorteio,1);
    }
}

//---------------------------------------------------------------------------------função para o user escolher o nº cartas
function iniciarJogo(){
    var qtdCartas = parseInt(prompt("Quantas cartas você quer jogar? \n Escolha um nº entre 4 e 14"));

    // verificação se o nº é par, maior que quatro e menor que 14
    while((qtdCartas % 2 !== 0) || (qtdCartas < 4) || (qtdCartas > 14)){
        qtdCartas = parseInt(prompt("Você precisa escolher um nº par entre 4 e 14. Com quantas cartas você quer jogar?"));
    }

    var widthJogo = ((qtdCartas / 2) * 150);
    ul.style.width = widthJogo + "px";
    renderizaCartas(qtdCartas);
}
iniciarJogo();

//---------------------------------------------------------------------------------inserir as cartas do jogo
function renderizaCartas(qtdCartas){
    sortearParrots(qtdCartas);

    while(selecionados.length !== 0){
        //---------------------------------------------------------criar uma carta
        var carta = document.createElement("li");

        //---------------------------------------------------------insererir função onclick na carta
        carta.setAttribute('onclick','virarCarta(this)');

        //---------------------------------------------------------inserir uma imagem aleatoriamente nela
        var imgCarta = document.createElement('img');

        var indiceSorteio = Math.floor(selecionados.length * Math.random());
        
        var urlAleatorio = selecionados[indiceSorteio];
        imgCarta.setAttribute('src', urlAleatorio);
        
        //-------------------------------------------------remover essa imagem da lista de selecionados para não repetir
        selecionados.splice(indiceSorteio,1);

        //-------------------------------------------------inserir display none na imagem do parrot
        imgCarta.style.display = "none";

        //-------------------------------------------------vincular essa imagem ao li da carta criada
        carta.appendChild(imgCarta);

        //-------------------------------------------------selecionar ul onde estão as cartas e vincular a carta
        ul.appendChild(carta);
    };
    acertosParaFinalizar = qtdCartas;
}


//---------------------------------------------------------------------------------função que vira a carta ao clicar
function virarCarta(element){
    mostraVerso(element);
    countJogada++;
    cartasViradas.push(element);

    if(cartasViradas.length === 2){
        segundoClique();
    };

    if(countAcerto === acertosParaFinalizar){
        finalizaJogo();
    };
}

//-----------------------------------------------------------------------------função que confere a segunda carta clicada
function segundoClique(){
    var primeiraCarta = pegaSrc(0);
    var segundaCarta = pegaSrc(1);
    
    //-------------------------------------------------verificar se as cartas são iguais
    var saoIguais = verificaCartasIguais(primeiraCarta,segundaCarta);

    if(saoIguais === true){
        cartasViradas = [];
        countAcerto +=2;
    }else if (saoIguais === false){
        setTimeout(function () {
            mostraFrente(cartasViradas[0]);
            mostraFrente(cartasViradas[1]);
            cartasViradas = [];
        }, 1000);
    }
}


//-----------------------------------------------------------------função para pegar o scr da imagem do elemento clicado
function pegaSrc(i){
    var carta = cartasViradas[i].querySelector("img");
    var parrot = carta.getAttribute('src');
    return parrot;
}

//---------------------------------------------------------------------------- verificando se as cartas tem o mesmo parrot
function verificaCartasIguais(primeiraCarta,segundaCarta){
    if(primeiraCarta === segundaCarta)
        return true;
    else
        return false;
}

//---------------------------------------------------------------------------- verificando se o jogo acabou
function finalizaJogo(){
    setTimeout(function(){
        alert("Você ganhou em " + countJogada + " jogadas!");
        reiniciarJogo()
    }, 500);
}

//---------------------------------------------------------------------------- função para reiniciar o jogo
function reiniciarJogo(){
    var querReiniciar = prompt("Você quer reiniciar o jogo?");

    while(querReiniciar !== "sim"){
        querReiniciar = prompt("Para reiniciar o jogo, digite a palavra sim");
    };
    
    resetarJogo();
    iniciarJogo();
}

//------------------------------------------------------------------------função que reseta a array com os src dos parrot
function resetarJogo(){
    ul.innerHTML = "";
    
    imgParrots = [
        "imagens/bobrossparrot.gif",
        "imagens/explodyparrot.gif",
        "imagens/fiestaparrot.gif",
        "imagens/metalparrot.gif",
        "imagens/revertitparrot.gif",
        "imagens/tripletsparrot.gif",
        "imagens/unicornparrot.gif"
    ];

    countJogada = 0;
    countAcerto = 0;
    cartasViradas = [];
    acertosParaFinalizar = 0;
    selecionados = [];
}

//---------------------------------------------------------------------------------mostra verso da carta
function mostraVerso(element){
    element.style.transform = "rotateY(180deg)";
    element.style.backgroundImage = "none";
    var img = element.querySelector('img');
    img.style.display = "initial";
}
//---------------------------------------------------------------------------------mostra frente da carta
function mostraFrente(element){
    element.style.transform = "rotateY(0deg)";
    element.style.backgroundImage = "url(imagens/front.png)";
    var img = element.querySelector('img');
    img.style.display = "none";
}