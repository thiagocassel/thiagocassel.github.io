var proximoJogador = "";
var vencedor = "";
var tamanho = 0;
var pontosVazios = [];
var pontosJogados = [];
var comeco = "Vamos ver quem começa... <br> Cara ou coroa?<br><select id='selecao'><option value='cara'>Cara</option><option value='coroa'>Coroa</option></select>" +
            "<br><br><input type='button' id='sortear' value='Sortear' onclick='sorteioInicio()'>";

function sorteioInicio()
{
    var escolha = document.getElementById('selecao').value;
    
    var sorteio = Math.random();
    if (sorteio < 0.5) resultado = "cara";    
    else resultado = "coroa"; 

    if (resultado == escolha && resultado == "cara")
    {
        document.getElementById('inicio').innerHTML = "Cara! Você começa! <br> <img src='images/cara.png'>";
        proximoJogador = "usuario";
    }
    if (resultado != escolha && resultado == "cara") 
    {    
        document.getElementById('inicio').innerHTML = "Cara! Eu começo! <br> <img src='images/cara.png'>";
        proximoJogador = "computador";
    }
    if (resultado == escolha && resultado == "coroa") 
    {
        document.getElementById('inicio').innerHTML = "Coroa! Você começa! <br> <img src='images/coroa.png'>";
        proximoJogador = "usuario";
    }
    if (resultado != escolha && resultado == "coroa") 
    {    
        document.getElementById('inicio').innerHTML = "Coroa! Eu começo! <br> <img src='images/coroa.png'>";
        proximoJogador = "computador";
    }    

    document.getElementById('escolhaTamanho').innerHTML = "Escolha o tamanho do tabuleiro <br> <input id= 'tamanho' type='number' min='3' max='5'> <br> <br>" +
                                                  "<input type='button' value=Início onclick='desenhaTabuleiro()'>";

}

function desenhaTabuleiro()
{
    tamanho = parseInt(document.getElementById('tamanho').value);
    if (tamanho < 3 || tamanho > 5) alert("Dimensão mínima: 3x3 , Dimensão máxima: 5x5")
    else
    {
        var tabuleiro = "<table border='1'>";
        var pos = 0;

        for (var i = 1 ; i <= tamanho ; i++)
        {
            tabuleiro += "<tr>";
            for (var j = 1 ; j <= tamanho ; j++)
            {
                pos = j + (tamanho * (i-1));
                tabuleiro += "<td id='" + pos + "' onmouseover='realce(this)' onmouseout='desrealce(this)' onclick='fazJogada(this)'></td>";
            }
            tabuleiro += "</tr>";
        }
        tabuleiro += "</table>";
        document.getElementById('tabuleiro').innerHTML = tabuleiro;
        document.getElementById('escolhaTamanho').innerHTML = "";

        //caso o computador tenha ganho o sorteio para começar o jogo, faz a primeira jogada logo após montar o tabuleiro
        if (proximoJogador=="computador") computadorJoga();
    }
}

function fazJogada(celula)
{
    // verifica se a célula já foi jogada
    if (celula.innerHTML != "") alert("Não é possível jogar aí");
    else 
    {
        celula.innerHTML = "X";
        celula.style.color = "black";
        celula.style.fontStyle = "bold";
        celula.style.fontSize = "large";
        if (!verificaFimJogo()) computadorJoga();
    }
}

function computadorJoga()
{
    var pos = 0;
    var jogadaVencedora = 0;
    var jogada = 0
    verificaEspacos();
    //procura jogada vencedora nas linhas
    if (jogadaVencedora == 0)
    {
        for (var i = 1 ; i <= tamanho ; i++)
        {
            var vazio = [];
            var o = 0;
            for (var j = 1 ; j <= tamanho ; j++)
            {
                pos = j + (tamanho * (i-1));
                if (document.getElementById(pos).innerHTML == "O") o++;
                if (document.getElementById(pos).innerHTML == "") vazio.push(pos);
            }
            if (vazio.length == 1 && ( o == tamanho -1 ))
            {
                jogadaVencedora++;
                jogada = vazio[0];
                marcaJogada(jogada);
                break;
            }
        }
    }
    //procura jogada vencedora nas colunas
    if (jogadaVencedora == 0)
    {
        for (var i = 1 ; i <= tamanho ; i++)
        {
            var vazio = [];
            var o = 0;
            for (var j = 1 ; j <= tamanho * tamanho ; j = j + tamanho)
            {
                pos = i + j-1;
                if (document.getElementById(pos).innerHTML == "O") o++;
                if (document.getElementById(pos).innerHTML == "") vazio.push(pos);
            }
            if (vazio.length == 1 && ( o == tamanho -1 ))
            {
                jogadaVencedora++;
                jogada = vazio[0];
                marcaJogada(jogada);
                break;
            }    
        }
    }

    //procura jogada vencedora nas diagonais
    if (jogadaVencedora == 0)
    {
        var vazio = [];
        var o = 0;
        for (var i = 1 ; i <= tamanho * tamanho ; i = i + tamanho + 1)
        {
            pos = i;
            if (document.getElementById(pos).innerHTML == "O") o++;
            if (document.getElementById(pos).innerHTML == "") vazio.push(pos);
        
            if (vazio.length == 1 && ( o == tamanho -1 ))
            {
                jogadaVencedora++;
                jogada = vazio[0];
                marcaJogada(jogada);
                break;
            } 
        }
    }
    if (jogadaVencedora == 0)
    {
        var vazio = [];
        var o = 0;
        for (var i = tamanho ; i < tamanho * tamanho ; i = i + tamanho - 1)
        {
            pos = i;
            if (document.getElementById(pos).innerHTML == "O") o++;
            if (document.getElementById(pos).innerHTML == "") vazio.push(pos);
            
            if (vazio.length == 1 && ( o == tamanho -1 ))
            {
                jogadaVencedora++;
                jogada = vazio[0];
                marcaJogada(jogada);
                break;
            }  
        }
    }
        //procura linha adversária mais próxima de ganhar
        //procura derrota iminente nas linhas
        if (jogadaVencedora == 0)
        {
            for (var i = 1 ; i <= tamanho ; i++)
            {
                var vazio = [];
                var x = 0;
                for (var j = 1 ; j <= tamanho ; j++)
                {
                    pos = j + (tamanho * (i-1));
                    if (document.getElementById(pos).innerHTML == "X") x++;
                    if (document.getElementById(pos).innerHTML == "") vazio.push(pos);
                }
                if (vazio.length == 1 && ( x == tamanho -1 ))
                {
                    jogadaVencedora++;
                    jogada = vazio[0];
                    marcaJogada(jogada);
                    break;
                }
            }
        }
        //procura jogada derrota iminente nas colunas
        if (jogadaVencedora == 0)
        {
            for (var i = 1 ; i <= tamanho ; i++)
            {
                var vazio = [];
                var x = 0;
                for (var j = 1 ; j <= tamanho * tamanho ; j = j + tamanho)
                {
                    pos = i + j-1;
                    if (document.getElementById(pos).innerHTML == "X") x++;
                    if (document.getElementById(pos).innerHTML == "") vazio.push(pos);
                }
                if (vazio.length == 1 && ( x == tamanho -1 ))
                {
                    jogadaVencedora++;
                    jogada = vazio[0];
                    marcaJogada(jogada);
                    break;
                }    
            }
        }
    
        //procura derrota iminente nas diagonais
        if (jogadaVencedora == 0)
        {
            var vazio = [];
            var x = 0;
            for (var i = 1 ; i <= tamanho * tamanho ; i = i + tamanho + 1)
            {
                pos = i;
                if (document.getElementById(pos).innerHTML == "X") x++;
                if (document.getElementById(pos).innerHTML == "") vazio.push(pos);
                if (vazio.length == 1 && ( x == tamanho -1 ))
                {
                    jogadaVencedora++;
                    jogada = vazio[0];
                    marcaJogada(jogada);
                    break;
                } 
            }
        }
        if (jogadaVencedora == 0)
        {
            var vazio = [];
            var x = 0;
            for (var i = tamanho ; i < tamanho * tamanho ; i = i + tamanho - 1)
            {
                pos = i;
                if (document.getElementById(pos).innerHTML == "X") x++;
                if (document.getElementById(pos).innerHTML == "") vazio.push(pos);
                if (vazio.length == 1 && ( x == tamanho -1 ))
                {
                    jogadaVencedora++;
                    jogada = vazio[0];
                    marcaJogada(jogada);
                    break;
                }  
            }
        }

    //demais jogadas do computador são aleatórias
    if (jogadaVencedora == 0)
    {
        jogada = pontosVazios[Math.floor(Math.random()*pontosVazios.length)];
        marcaJogada(jogada);
    }
}

function marcaJogada(jogada) //função para evitar repetição de código
{
    document.getElementById(jogada).innerHTML = "O";
    document.getElementById(jogada).style.color = "red";
    document.getElementById(jogada).style.fontStyle = "bold";
    document.getElementById(jogada).style.fontSize = "large";
    setTimeout(verificaFimJogo,250);
}

function verificaFimJogo()
{
    if (verificaEspacos() && !verificaVitoria())
    {
        if (confirm("Empatou! Jogar novamente?"))
        {
            document.getElementById('inicio').innerHTML = comeco;
            setTimeout(function() {document.getElementById('tabuleiro').innerHTML = ""},1000);
            return true
        }
    }
    else if (verificaVitoria())
    {
        if (vencedor == "usuario")
        {
            if (confirm("Ganhou... Jogar novamente?"))
            {
                document.getElementById('inicio').innerHTML = comeco;
                setTimeout(function() {document.getElementById('tabuleiro').innerHTML = ""},1000);
                return true
            }
        }    
        else if (vencedor == "computador")
        {
            if (confirm("Ganhei!! Jogar novamente?"))
            {
                document.getElementById('inicio').innerHTML = comeco;
                setTimeout(function() {document.getElementById('tabuleiro').innerHTML = ""},1000);
                return true
            }
        }
    }    
    return false;
}

function verificaEspacos() 
{
    var espacosVazios = 0;
    pontosJogados = [];
    pontosVazios = [];
    var pos = 0;
    for (var i = 1 ; i <= tamanho ; i++)
    {
        for (var j = 1 ; j <= tamanho ; j++)
        {
            pos = j + (tamanho * (i-1));
            if (document.getElementById(pos).innerHTML == "") 
            {
                pontosVazios.push(pos);
                espacosVazios++;
            }
            else pontosJogados.push(pos);
        }
    }
    if (espacosVazios == 0) return true;
    else return false;
}

function verificaVitoria ()
{
    var x = 0;
    var o = 0;
    var pos = 0;
    
    //não é possível ganhar o jogo antes da 5a rodada
    if (pontosJogados.length < 5) return false;
    
    // verifica vitória nas linhas
    for (var i = 1 ; i <= tamanho ; i++)
    {
        var x = 0;
        var o = 0;
        for (var j = 1 ; j <= tamanho ; j++)
        {
            pos = j + (tamanho * (i-1));
            if (document.getElementById(pos).innerHTML == "X") x++;
            else if (document.getElementById(pos).innerHTML == "O") o++;
        }
        if (x == tamanho || o == tamanho)
        {
            if (x== tamanho) vencedor="usuario";
            else vencedor = "computador";
            return true;
        }
    }

    // verifica vitória nas colunas
    for (var i = 1 ; i <= tamanho ; i++)
    {
        var x = 0;
        var o = 0;
        for (var j = 1 ; j <= tamanho * tamanho ; j = j + tamanho)
        {
            pos = i + j-1;
            if (document.getElementById(pos).innerHTML == "X") x++;
            else if (document.getElementById(pos).innerHTML == "O") o++;
        }
        if (x == tamanho || o == tamanho)
        {
            if (x== tamanho) vencedor="usuario";
            else vencedor = "computador";
            return true;
        }    
    }

    // verifica vitória nas diagonais
    var x = 0;
    var o = 0;
    for (var i = 1 ; i <= tamanho * tamanho ; i = i + tamanho + 1)
    {
        pos = i;
        if (document.getElementById(pos).innerHTML == "X") x++;
        else if (document.getElementById(pos).innerHTML == "O") o++;
        
        if (x == tamanho || o == tamanho)
        {
            if (x== tamanho) vencedor = "usuario";
            else vencedor = "computador";
            return true;
        }    }

    var x = 0;
    var o = 0;
    for (var i = tamanho ; i < tamanho * tamanho ; i = i + tamanho - 1)
    {
        pos = i;
        if (document.getElementById(pos).innerHTML == "X") x++;
        else if (document.getElementById(pos).innerHTML == "O") o++;
        
        if (x == tamanho || o == tamanho)
        {
            if (x== tamanho) vencedor="usuario";
            else vencedor = "computador";
            return true;
        }  
    }
    return false;
}

function realce(celula)
{
    if (celula.innerHTML == "") celula.style.backgroundColor = "gray";
}

function desrealce(celula)
{
    celula.style.backgroundColor = "";
}