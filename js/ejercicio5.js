function cambiarColor(color) {
    // Se cambia el color de fondo de cada luz del semáforo según el color especificado.
    // Si el color es 'rojo', la luz roja se enciende (rojo) y las demás se apagan (gris).
    // Si el color es 'amarillo', la luz amarilla se enciende (amarillo) y las demás se apagan (gris).
    // Si el color es 'verde', la luz verde se enciende (verde) y las demás se apagan (gris).
    document.getElementById("rojo").style.backgroundColor = color === 'rojo' ? 'red' : 'grey';
    document.getElementById("amarillo").style.backgroundColor = color === 'amarillo' ? 'yellow' : 'grey';
    document.getElementById("verde").style.backgroundColor = color === 'verde' ? 'green' : 'grey';
}

function iniciarSemaforo() {
    // Se inicia la simulación del semáforo.
    // Cada setTimeout cambia el color del semáforo después de un cierto tiempo:
    // Se inicia con la luz roja inmediatamente (0 ms).
    setTimeout(() => cambiarColor('rojo'), 0);
    // Después de 3 segundos (3000 ms), cambia a la luz amarilla.
    setTimeout(() => cambiarColor('amarillo'), 3000);
    // Después de 6 segundos (6000 ms), cambia a la luz verde.
    setTimeout(() => cambiarColor('verde'), 6000);
    // Después de 9 segundos (9000 ms), vuelve a iniciar el ciclo del semáforo.
    setTimeout(iniciarSemaforo, 9000);
}
