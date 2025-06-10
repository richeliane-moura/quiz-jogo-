/*VARIAVEIS DE CONTROLE DO NOSSO JOGO*/
let perguntasFeitas = [] 

//PERGUNTAS DO JOGO

const perguntas = [
    { 
        pergunta:"Qual dessas linguagens não e considerada uma linguagem de programação?",
        respostas: ["PHP","JavaScript","C++","HTML"],
        correta:"resp3" 
    }, 
    { 
        pergunta:"Em que ano o Brasil foi descoberto?",
        respostas: ["1498","1500","1375","1828"],
        correta:"resp1" 
    }, 
    { 
        pergunta:"O que significa a sigla HTML?",
        respostas: ["Hyper Tonto Maluco Legal","Hyper Text Marckup Language","Hey Trade More Linguage","Hyper Text Mark Lang"],
        correta:"resp1" 
    }, 
    { 
        pergunta:"Qual dessas linguagem é considerada uma linguagem de Marcação?",
        respostas: ["PHP","C++","HTML","JavaScript"],
        correta:"resp2" 
    }, 
    { 
        pergunta:"Quantas vezes o Brasil não foi para Copa?",
        respostas: ["Sempre foi","2","3","1"],
        correta:"resp0" 
    }, 
]

var qtdPerguntas = perguntas.length - 1; 
gerarPergunta(qtdPerguntas); 

function gerarPergunta(maxPerguntas) {
    //GERAR UM NUMERO ALEATORIO
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    //CONVERTER PARA NUMERO 
    aleatorio = Number(aleatorio);
    //MOSTRAR NO CONSOLE QUAL FOI A PERGUNTA SORTEADA
    console.log('A pergunta sorteada foi a: ' + aleatorio); 

    //VERIFICAR SE A PERGUNTA SORTEADA JA FOI FEITA
    if (!perguntasFeitas.includes(aleatorio)) {
        //COLOCAR COMO PERGUNTA FEITA 
        perguntasFeitas.push(aleatorio);

        //PREENCHER O HTML COM OS DADOS DA QUESTAO SORTEADA 
        var p_selecionada = perguntas[aleatorio].pergunta;
        console.log(p_selecionada); 

        //ALIMENTAR A PERGUNTA VINDA DO SORTEIO JQUERY         
        $("#pergunta").html(p_selecionada); 
        $("#pergunta").attr('data-indice', aleatorio); 

        //COLOCAR AS RESPOSTAS
        for (var i=0; i<4; i++){
            $("#resp" + i).html(perguntas[aleatorio].respostas[i]); 
        } 

        /*var resp0 = perguntas[aleatorio].respostas[0];
        var resp1 = perguntas[aleatorio].respostas[1]; 
        var resp2 = perguntas[aleatorio].respostas[2]; 
        var resp3 = perguntas[aleatorio].respostas[3];

        $("#resp0").html(resp0); 
        $("#resp1").html(resp1); 
        $("#resp2").html(resp2); 
        $("#resp3").html(resp3);*/ 

        //EMBARALHAR AS RESPOSTA 
        var pai = $("#respostas"); 
        var botoes = pai.children();
        
        for(var i=1; i<botoes.length; i++) {
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }        
    }else{
        //SE A PERGUNTA JA FOI FEITA 
        console.log('A pergunta já foi feita. Sorteando novamente...');
        if (perguntasFeitas.length < qtdPerguntas + 1){
            return gerarPergunta(maxPerguntas);
        }else{
            console.log('Acabaram as perguntas!');

            $('#quiz').addClass('oculto');
            $('#mensagem').html('Parabéns você Venceu. Acertou todas as perguntas!');
            $('#status').removeClass('oculto'); 
        }
    }

}

$('.resposta').click(function(){
    if ($("#quiz").attr('data-status')!=='travado'){
     //PERCORRER TODAS AS RESPOSTAS E DESMARCAR A CLASE SELECIONADA
     resetaBotoes();

     //ADICIONAR A CLASSE SELECIONADA
     $(this).addClass('selecionada');
    }
});

$("#confirm").click(function(){
    //PEGAR O INDICE DA PERGUNTA 
    var indice = $("#pergunta").attr('data-indice');

    //QUAL E A RESPOSTA CERTA 
    var respCerta = perguntas[indice].correta;

    //QUAL FOI A RESPOSTA QUE O USARIO SELECIONOU
    $('.resposta').each(function(){
        if ($(this).hasClass('selecionada')){
            var respostaEscolhida = $(this).attr('id');

            if (respCerta == respostaEscolhida){
                console.log('Acertoooouuuu!');
                proximaPergunta(); 
            }else{
                console.log('Erroouuuuuuu!');
                $('#quiz').attr('data-status', 'travado');
                $("#confirm").addClass('oculto');
                $('#' + respCerta).addClass('correta');
                $('#' + respostaEscolhida).removeClass('selecionada');
                $('#' + respostaEscolhida).addClass('errada');

                //4 SEGUNDOS PARA DAR GAME OVER
                setTimeout(function(){
                    gameOver();
                },4000);
            }
        }
    })
});

function newGame(){
    $("#confirm").removeClass('oculto'); 
    $('#quiz').attr('data-status', 'ok'); 
    perguntasFeitas = []; 
    resetaBotoes();
    gerarPergunta(qtdPerguntas); 
    $('#quiz').removeClass('oculto');
    $('#status').addClass('oculto'); 
}


function proximaPergunta(){     
    resetaBotoes();
    gerarPergunta(qtdPerguntas); 
}

function resetaBotoes(){
    //PERCORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA
    $('.resposta').each(function(){
        if ($(this).hasClass('selecionada')){
            $(this).removeClass('selecionada');
        }
        if ($(this).hasClass('correta')){
            $(this).removeClass('correta'); 
        }
        if ($(this).hasClass('errada')){
            $(this).removeClass('errada'); 
        }

    });
}

function gameOver(){
    $('#quiz').addClass('oculto'); 
    $('#mensagem').html('Game Over'); 
    $('#status').removeClass('oculto'); 
}

$('#novoJogo').click(function(){
    newGame(); 
});

