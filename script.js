/*

inserir as cartas no ul.cartas
    criar uma array com as url dos parrot
    todos as cartas inseridas vao ter que ser inseridos seu par 

inserir aleatoriamente no verso os gifs dos parrot
    criar um .random para inserir um indice aleatorio da array
        -> sortear os nº e jogar num novo array com 2 vezes cada parrot e fazer um novo .random nesse array do sorteio para inserir aleatroiamente as posições dos parrot

ao clicar a carta tem que girar

se for a primeira carta do par ela tem que ficar parada até selecionar a segunda
    se acertar: mantem as duas viradas
    se errar: volta as duas cartas para a posição inicial após 1 segundo
ao final do jogo informar o numero de jogadas -> numero de cliques / 2
 */


//---------------------------------------------------------------------------------função para o user escolher o nº cartas
function iniciar(){
    var qtdCartas = parseInt(prompt("Quantas cartas você quer jogar? \n Escolha um nº entre 4 e 14"));

    // verificação se o nº é par, maior que quatro e menor que 14
    while((qtdCartas % 2 !== 0) || (qtdCartas < 4) || (qtdCartas > 14)){
        qtdCartas = parseInt(prompt("Você precisa escolher um nº par entre 4 e 14. Com quantas cartas você quer jogar?"));
    }
    alert("iniciou o jogo");
}
iniciar();