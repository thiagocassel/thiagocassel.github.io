function validaForm() {
    let validaCod = document.forms["cadastrar"]["codigo"].value;
    let validaDat = document.forms["cadastrar"]["ano"].value;
    let validaTit = document.forms["cadastrar"]["titulo"].value;
    let validaDir = document.forms["cadastrar"]["diretor"].value;
    let validaAto = document.forms["cadastrar"]["ator"].value;
    let validaNot = document.forms["cadastrar"]["nota"].value;
    let validaRad = document.forms["cadastrar"]["radio"].value;

    if (validaCod == "") {
        alert("O código deve ser preenchido!");
        return false;
    }

    if (validaDat == "") {
        alert("A data de lançamento deve ser preenchida!");
        return false;
    }

    if (validaTit == "") {
        alert("O título deve ser preenchido!");
        return false;
    }

    if (validaDir == "") {
        alert("O diretor deve ser preenchido!");
        return false;
    }

    if (validaAto == "") {
        alert("O/A ator/atriz principal deve ser preenchido/a!");
        return false;
    }

    if (validaNot == "") {
        alert("A nota deve ser preenchida!");
        return false;
    }

    if (validaRad == "") {
        alert("O Gênero deve ser preenchido!");
        return false;
    }

    insere()
    alert("Cadastrado com sucesso");
    return true;
}

function insere() {
    let codi = document.forms["cadastrar"]["codigo"].value;
    let data = document.forms["cadastrar"]["ano"].value;
    let titu = document.forms["cadastrar"]["titulo"].value;
    let dire = document.forms["cadastrar"]["diretor"].value;
    let ator = document.forms["cadastrar"]["ator"].value;
    let nota = document.forms["cadastrar"]["nota"].value;
    let radi = document.forms["cadastrar"]["radio"].value;

    let inserir = window.document.getElementById("inserir");
    inserir.innerHTML = `<th scope="row">${codi}</th>`;
    inserir.innerHTML += `<td>${titu}</td>`;
    inserir.innerHTML += `<td>${dire}</td>`;
    inserir.innerHTML += `<td>${data}</td>`;
    inserir.innerHTML += `<td>${radi}</td>`;
    inserir.innerHTML += `<td>${ator}</td>`;
    inserir.innerHTML += `<td>${nota}/10</td>`;
    
}
