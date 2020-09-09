/*

ao clicar a carta tem que girar

se for a primeira carta do par ela tem que ficar parada até selecionar a segunda
    se acertar: mantem as duas viradas
    se errar: volta as duas cartas para a posição inicial após 1 segundo
ao final do jogo informar o numero de jogadas -> numero de cliques / 2
 */

//-------------------------------------------------------------------------------array com os parrots
var imgParrots = [
    "imagens/bobrossparrot.gif",
    "imagens/explodyparrot.gif",
    "imagens/fiestaparrot.gif",
    "imagens/metalparrot.gif",
    "imagens/revertitparrot.gif",
    "imagens/tripletsparrot.gif",
    "imagens/unicornparrot.gif"
]


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
function iniciar(){
    var qtdCartas = parseInt(prompt("Quantas cartas você quer jogar? \n Escolha um nº entre 4 e 14"));

    // verificação se o nº é par, maior que quatro e menor que 14
    while((qtdCartas % 2 !== 0) || (qtdCartas < 4) || (qtdCartas > 14)){
        qtdCartas = parseInt(prompt("Você precisa escolher um nº par entre 4 e 14. Com quantas cartas você quer jogar?"));
    }
    renderizaCartas(qtdCartas);
}
iniciar();

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

        var indiceSorteio = Math.floor(imgParrots.length * Math.random());
        var urlAleatorio = selecionados[indiceSorteio];
        imgCarta.setAttribute('src', urlAleatorio);
        
        //-------------------------------------------------remover essa imagem da lista de selecionados para não repetir
        selecionados.splice(indiceSorteio,1);

        //-------------------------------------------------inserir display none na imagem do parrot
        imgCarta.style.display = "none";

        //-------------------------------------------------vincular essa imagem ao li da carta criada
        carta.appendChild(imgCarta);

        //-------------------------------------------------selecionar ul onde estão as cartas e vincular a carta
        var ul = document.querySelector(".cartas");
        ul.appendChild(carta);
    }
}

function virarCarta(element){
    element.style.transform = "rotateY(180deg)";
    console.log(element);
}