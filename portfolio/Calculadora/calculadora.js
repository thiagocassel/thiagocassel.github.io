//variáveis globais
var num1;
var num2;
var op = "";
var resultado;

function insereNumero(botao)
{
    //se já há um resultado, digitar um número recomeça toda a operação, chamando a função 'limpar'
    if (typeof(resultado) == 'number' || resultado == "Erro!") limpar();

    //verifica botao digitado
    var digito = botao.value;
    //apresenta no display o botao digitado
    document.getElementById('display').value += digito;

    //se não há informação quanto a operação, é o primeiro número informado. se houver, é o segundo número
    if (op == "")
    {
        //guarda o valor digitado
        document.getElementById('num1').value += digito;
        //limpa o resultado
        resultado = "";
    }
    else 
    {
        document.getElementById('num2').value += digito;  
    }
}

function operacao(botao)
{
    //testa se há um número informado
    if (document.getElementById('num1').value == "")
    {
        alert("digite um número antes da operação");
    }

    //testa se o segundo número foi informado
    else if (document.getElementById('num2').value != "")
        {
            alert("digite '=' para realizar a operação");
        }
    
    else
    {
        //limpa o resultado
        resultado = ""
        
        //verifica a operação digitada
        var operacao = botao.value;
        
        //apresenta no display a operação digitada
        document.getElementById('display').value += " " + operacao + " ";

        //guarda a operação
        op = operacao;
        
        //converte o primeiro numero digitado (string) em número (float) e salva na variável num1
        num1 = parseFloat(document.getElementById('num1').value);
    }
}

function efetuaOperacao()
{
    //testa se o segundo número foi informado
    if (document.getElementById('num2').value == "")
    {
        alert("digite o segundo número para efetuar a operação");
    }
    else
    {
        //converte o segundo numero digitado (string) em número (float) e salva na variável num2
        num2 = parseFloat(document.getElementById('num2').value);

        //faz a operação
        switch(op)
        {
            case "+": resultado = num1 + num2; break;
            case "-": resultado = num1 - num2; break;
            case "x": resultado = num1 * num2; break;
            case "/": 
            {
                if (num2 != 0) 
                {
                    resultado = num1 / num2; break;
                }
                else
                {
                    resultado = "Erro!"; break;
                }
            }
        }

        //simula um overflow
        if (resultado > 999999999) resultado = "Overflow!"

        //apresenta o resultado e limpa salva como primeiro numero, caso o usuário queira fazer alguma operação com o resultado
        document.getElementById('display').value = resultado;
        document.getElementById('num1').value = resultado;
        document.getElementById('num2').value = "";
        document.getElementById('op').value = "";
    }
}

function limpar()
{
    //limpa tudo
    document.getElementById('display').value = "";
    document.getElementById('num1').value = "";
    document.getElementById('num2').value = "";
    resultado = "";
    num1="";
    num2=""
    op = "";
}