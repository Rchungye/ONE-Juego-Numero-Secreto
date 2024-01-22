// Variables
let numeroSecreto = 0;
let numeroMinimo = 60;
let numeroMaximo = 70;
let listaNumerosSorteados = [];
let intentos = 0;
let juego_Numero = 0;
let juegoMaximo = 5;

// Funcion para asignar texto a elementos HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

// Funcion verifica intento del usuario
function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    // El usuario no acertó.
    if (numeroUsuario > numeroSecreto) {
        asignarTextoElemento('p', `El número secreto es menor`);
    }
    if (numeroUsuario < numeroSecreto) {
        asignarTextoElemento('p', `El número secreto es mayor`);
    }
    intentos++;
    limpiarCaja();
    return;
}

// Funcion para limpiar la caja de texto
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Funcion genera numero secreto
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * (numeroMaximo - numeroMinimo + 1)) + numeroMinimo;
    console.log('Numero generado es: ' + numeroGenerado);
    console.log('Numeros sorteados: ' + listaNumerosSorteados);
    // Si ya sorteamos todos los números
    if (juego_Numero == juegoMaximo) {
        asignarTextoElemento('h1', `Oh no reinicia la pagina!`);
        asignarTextoElemento('p', `Ya jugaste el maximo de ${juegoMaximo} juegos!`);
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        }
        listaNumerosSorteados.push(numeroGenerado);
        juego_Numero++;
        return numeroGenerado;
    }
}

// Funcion de condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1', `Juego ${juego_Numero + 1} del número secreto!`);
    asignarTextoElemento('p', `Indica un número del ${numeroMinimo} al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

// Funcion reinicia juego
function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// Llamado para el inicio del juego
condicionesIniciales();