/*OBSERVAÇÕES
    - nesse arquivo estão as funções que vão rendezir as cartas em tela de maneira aleatoria
    - a array imgParrots é onde estão os src das imagens utilizadas no verso da carta
    - a array selecionados é usada pela função sortearParrot para armazenar temporarimente os src necessário para o jogo com base na quantidade de cartas escolhidas
    - caso se necessário aumentar a quantidade máxima de quantas:
        - primeiro: deve-se incluir mais src na array ImgParrots
        - segundo: deve-se ajustar no while da função iniciarJogo a condição máxima de cartas que atualmente é "|| (qtdCartas > 14)"
        - obs: o aumento de 1 src em imgParrot deve produzir um aumento de 2 unidades na quantidade máx. de cartas
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
];

//---------------------------------------------------------------------array com os parrots sorteado pelo total de cartas
var selecionados = [];

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

//---------------------------------------------------------------------------------sorteando os papagaios
function sortearParrots(qtdCartas){
    for(var i = 0; i < qtdCartas/2; i++){
        var indiceSorteio = Math.floor(imgParrots.length * Math.random());
        selecionados.push(imgParrots[indiceSorteio]);
        selecionados.push(imgParrots[indiceSorteio]);
        imgParrots.splice(indiceSorteio,1);
    }
}

//---------------------------------------------------------------------------------escrevendo o tempo de jogo em tela
function renderizaTempo(tempoSegundos){
    var aside = document.querySelector(".cronometro");

    //-------------------------------------------------limpar o numero que está lá e inserir o novo numero
    aside.innerText = "";
    aside.innerText = tempoSegundos;

    var body = document.querySelector('body');
    body.appendChild(aside);
}