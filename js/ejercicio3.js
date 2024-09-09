let numeroSecreto = Math.floor(Math.random() * 100) + 1;  // Se genera un número secreto aleatorio entre 1 y 100
let intentos = 0; // Se inicializa el contador de intentos en 0

// Función que se ejecuta al intentar adivinar el número secreto
function adivinar() {
    let intento = document.getElementById("numero").value; // Se obtiene el valor ingresado por el usuario desde el input con id "numero"
    intentos++;   // Se incrementa el contador de intentos cada vez que se llama la función
    // Se compara el intento del usuario con el número secreto
    if (intento == numeroSecreto) {
        // Si el usuario adivina correctamente, muestra un mensaje con la cantidad de intentos
        document.getElementById("resultado").innerText = "¡Correcto Adivinaste en " + intentos + " intentos.";
    }else if (intento < numeroSecreto) {
         // Si el intento es menor que el número secreto, indica que el número es mayor
        document.getElementById("resultado").innerText = "El número es mayor. Inténtalo de nuevo.";
    } else {
         // Si el intento es mayor que el número secreto, indica que el número es menor
        document.getElementById("resultado").innerText = "El número es menor. Inténtalo de nuevo.";
    }
}