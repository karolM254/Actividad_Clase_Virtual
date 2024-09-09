var contador = 1; // Se inicializa la variable contador para realizar el seguimiento del índice de imagen actual, a partir de 1.
var temporizador; // Se declara una variable 'temporizador' que se utilizará para almacenar el temporizador de intervalos.

function iniciar(){ //  Se define una función 'iniciar' que iniciará el proceso de rotación de la imagen.
    temporizador = setInterval(rotarImagenes, 3000); // Se configura un temporizador para llamar a la función 'rotarImagenes' cada 3000 milisegundos (3 segundos).
    temporizador = setInterval(parar, 0) // Inmediatamente configura otro temporizador para llamar a la función 'parar', pero esta línea es incorrecta 
    //porque borra inmediatamente el intervalo anterior y no tiene sentido lógicamente.
}


function rotarImagenes(){ // Se define una función 'rotarImagenes' que rotará las imágenes en una presentación de diapositivas.

    // Se inicializa un condicional
    if (contador >= 10) { //Se comprueba si 'contador' ha alcanzado o superado 10.
        contador = 0; //  Restablece 'contador' a 0 si es 10 o más, para reiniciar la secuencia de imágenes.
    }
    var img = document.getElementById('imgSlide'); //  Obtiene el elemento HTML con el ID 'imgSlide' que se supone que muestra las imágenes.
    img.src = './images/img' + ++contador + '.jpg' // Se establece el atributo 'src' del elemento de imagen en una nueva ruta de imagen, incrementando primero 'contador'
}