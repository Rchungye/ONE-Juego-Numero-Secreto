// Variables
let numeroSecreto = 0;
let numeroMinimo = 60;
let numeroMaximo = 70;
let listaNumerosSorteados = [];
let intentos = 0;
let nivel_Numero = 0;
let nivelMaximo = 3;
let sonidoBump = document.getElementById('sonidoBump');
let sonidoCoin = document.getElementById('sonidoCoin');
let sonidoPipe = document.getElementById('sonidoPipe');
let sonidoWorldClear = document.getElementById('sonidoWorldClear');

// Llamado para el inicio del juego
condicionesIniciales();

// Funcion para asignar texto a elementos HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

// Funcion para asignar Placeholder a Inputs HTML
function asignarPlaceholderInputs(inputs, texto) {
    let inputUsuario = document.getElementById(inputs);
    inputUsuario.placeholder = texto;
}

// Funcion genera numero secreto
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * (numeroMaximo - numeroMinimo + 1)) + numeroMinimo;
    console.log('Numero generado es: ' + numeroGenerado);
    console.log('Numeros sorteados: ' + listaNumerosSorteados);
    if (nivel_Numero == nivelMaximo) {
        finalJuego();
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        }
        listaNumerosSorteados.push(numeroGenerado);
        nivel_Numero++;
        return numeroGenerado;
    }
}

// Funcion verifica intento del usuario
function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroUsuario === numeroSecreto) {
        finalNivel();
    }
    if (numeroUsuario > numeroSecreto) {
        asignarTextoElemento('p', `El número es menor a ${numeroUsuario}`);
        asignarPlaceholderInputs('valorUsuario', `Indica otro número del ${numeroMinimo} al ${numeroMaximo}`);
        sonidoBump.play();
    }
    if (numeroUsuario < numeroSecreto) {
        asignarTextoElemento('p', `El número es mayor a ${numeroUsuario}`);
        asignarPlaceholderInputs('valorUsuario', `Indica otro número del ${numeroMinimo} al ${numeroMaximo}`);
        sonidoBump.play();
    }
    intentos++;
    limpiarCaja();
    return;
}

// Funcion para limpiar la caja de texto
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Funcion de condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1', `Nivel ${nivel_Numero + 1} del número secreto!`);
    asignarTextoElemento('p', `Adivina el número secreto!!!`);
    asignarPlaceholderInputs('valorUsuario', `Indica un número del ${numeroMinimo} al ${numeroMaximo}`);
    document.getElementById('Intentar').removeAttribute('disabled');
    document.getElementById('valorUsuario').removeAttribute('disabled');
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

// Funcion para mostrar al final del nivel
function finalNivel() {
    asignarTextoElemento('p', `Acertaste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
    asignarPlaceholderInputs('valorUsuario', `Pasa al siguiente nivel!!!`);
    document.getElementById('siguienteNivel').removeAttribute('disabled');
    document.getElementById('Intentar').setAttribute('disabled', 'true');
    document.getElementById('valorUsuario').setAttribute('disabled', 'true');
    sonidoCoin.play();
}

// Funcion pasa al siguiente nivel
function siguienteNivel() {
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#siguienteNivel').setAttribute('disabled', 'true');
    sonidoPipe.play();
}

// Funcion para mostar el final del juego
function finalJuego() {
    asignarTextoElemento('h1', `GAME OVER\nYOU WIN!!!`);
    asignarTextoElemento('p', `Ganaste todos los ${nivelMaximo} niveles!!!`);
    document.getElementById('Intentar').setAttribute('disabled', 'true');
    asignarPlaceholderInputs('valorUsuario', `Reinicia la pagina!!!`);
    document.getElementById('valorUsuario').setAttribute('disabled', 'true');
    sonidoWorldClear.play();
}
