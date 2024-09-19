// Inicialización del tiempo y del deltaTime
var time = new Date();  // Variable que guarda la fecha y hora actual.
var deltaTime = 0;  // Variable para calcular el tiempo transcurrido entre cada fotograma.

// Si el documento está completamente cargado o casi listo (interactivo), inicia el juego inmediatamente
if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(Init, 1);  // Espera un milisegundo y luego llama a Init para iniciar el juego.
}else{
    document.addEventListener("DOMContentLoaded", Init);  // Si el documento aún no está listo, espera que se cargue y llama a Init.
}

// Función de inicialización del juego
function Init() {
    time = new Date();  // Actualiza el tiempo inicial.
    Start();  // Llama a la función Start que inicializa el juego.
    Loop();  // Inicia el loop principal del juego.
}

// Loop principal del juego que se ejecuta en cada frame
function Loop() {
    deltaTime = (new Date() - time) / 1000;  // Calcula el tiempo transcurrido desde el último frame en segundos.
    time = new Date();  // Actualiza el tiempo para el siguiente frame.
    Update();  // Llama a la función que actualiza la lógica del juego.
    requestAnimationFrame(Loop);  // Vuelve a llamar al loop en el siguiente frame.
}

//****** LÓGICA DEL JUEGO ********//
// Variables de posición y movimiento
var sueloY = 22;  // Posición vertical del suelo.
var velY = 0;  // Velocidad vertical del dinosaurio.
var impulso = 900;  // Fuerza con la que el dinosaurio salta.
var gravedad = 2500;  // Fuerza de la gravedad que afecta al dinosaurio.

// Posición inicial del dinosaurio
var dinoPosX = 42;  // Posición horizontal fija del dinosaurio.
var dinoPosY = sueloY;  // Posición vertical inicial del dinosaurio en el suelo.

// Variables del escenario
var sueloX = 0;  // Posición horizontal del suelo.
var velEscenario = 1280 / 3;  // Velocidad a la que se mueve el suelo (el escenario).
var gameVel = 1;  // Multiplicador de la velocidad del juego.
var score = 0;  // Puntuación inicial del jugador.

var parado = false;  // Indica si el juego está detenido.
var saltando = false;  // Indica si el dinosaurio está saltando.

// Variables para obstáculos
var tiempoHastaObstaculo = 2;  // Tiempo en segundos hasta que aparezca el próximo obstáculo.
var tiempoObstaculoMin = 0.7;  // Tiempo mínimo entre obstáculos.
var tiempoObstaculoMax = 1.8;  // Tiempo máximo entre obstáculos.
var obstaculoPosY = 16;  // Posición vertical de los obstáculos.
var obstaculos = [];  // Lista de obstáculos activos en el juego.

// Variables para nubes
var tiempoHastaNube = 0.5;  // Tiempo en segundos hasta que aparezca la próxima nube.
var tiempoNubeMin = 0.7;  // Tiempo mínimo entre nubes.
var tiempoNubeMax = 2.7;  // Tiempo máximo entre nubes.
var maxNubeY = 270;  // Posición máxima (en altura) de las nubes.
var minNubeY = 100;  // Posición mínima (en altura) de las nubes.
var nubes = [];  // Lista de nubes activas en el juego.
var velNube = 0.5;  // Velocidad a la que se mueven las nubes.

// Referencias a los elementos HTML
var contenedor;  // Contenedor principal del juego.
var dino;  // Elemento HTML que representa al dinosaurio.
var textoScore;  // Elemento HTML que muestra la puntuación.
var suelo;  // Elemento HTML que representa el suelo.
var gameOver;  // Elemento HTML que muestra el mensaje de "Game Over".

// Inicializa el estado del juego
function Start() {
    gameOver = document.querySelector(".game-over");  // Referencia al mensaje de Game Over.
    suelo = document.querySelector(".suelo");  // Referencia al elemento del suelo.
    contenedor = document.querySelector(".container");  // Referencia al contenedor del juego.
    textoScore = document.querySelector(".score");  // Referencia al elemento del puntaje.
    dino = document.querySelector(".dino");  // Referencia al dinosaurio.
    document.addEventListener("keydown", HandleKeyDown);  // Agrega un evento para manejar cuando se presiona una tecla.
}

// Actualiza el estado del juego en cada frame
function Update() {
    if(parado) return;  // Si el juego está detenido, no hace nada.
    
    MoverDinosaurio();  // Mueve el dinosaurio.
    MoverSuelo();  // Mueve el suelo (y el escenario en general).
    DecidirCrearObstaculos();  // Decide si se debe crear un nuevo obstáculo.
    DecidirCrearNubes();  // Decide si se debe crear una nueva nube.
    MoverObstaculos();  // Mueve los obstáculos a la izquierda.
    MoverNubes();  // Mueve las nubes a la izquierda.
    DetectarColision();  // Verifica si hubo alguna colisión con un obstáculo o pájaro.

    velY -= gravedad * deltaTime;  // Aplica la gravedad al dinosaurio.
}

// Hace que el dinosaurio salte
function Saltar(){
    if(dinoPosY === sueloY){  // Solo puede saltar si está en el suelo.
        saltando = true;  // Marca que el dinosaurio está saltando.
        velY = impulso;  // Aplica la velocidad de salto.
        dino.classList.remove("dino-corriendo");  // Quita la animación de correr mientras salta.
        dino.classList.remove("dino-agachado"); // Quita la animación de correr mientras se agacha.
    }
}

// Manejador del evento cuando se presiona una tecla
function HandleKeyDown(ev){
    if(ev.keyCode == 32){  // Si la tecla es la barra espaciadora (código 32).
        Saltar();  // Llama a la función Saltar.
    }
}

// Función manejadora del evento cuando se presiona una tecla en el teclado
function HandleKeyDown(ev) {
    // Verifica si la tecla presionada es la barra espaciadora (código 32)
    if (ev.keyCode === 32) {  
        // Llama a la función Saltar() para que el dinosaurio salte
        Saltar();
    // Verifica si la tecla presionada es la tecla hacia abajo (código 40)
    } else if (ev.keyCode === 40) {  
        // Llama a la función AgacharseDino() para que el dinosaurio se agache
        AgacharseDino();
    }
}

// Manejador del evento cuando se suelta una tecla
function HandleKeyUp(ev) {
    if (ev.keyCode === 40) {  // Si se suelta la tecla hacia abajo.
        LevantarseDino();  // Llama a la función para levantarse.
    }
}

function AgacharseDino() {
    if (!saltando && dinoPosY === sueloY) {  // Solo se puede agachar si no está saltando y está en el suelo.
        dino.classList.add("dino-agachado");  // Agrega la clase de agacharse.
        dino.classList.remove("dino-corriendo");  // Quita la clase de correr.
    }
}

function LevantarseDino() {
    if (!saltando && dinoPosY === sueloY) {  // Solo se puede levantar si no está saltando y está en el suelo.
        dino.classList.remove("dino-agachado");  // Quita la clase de agacharse.
        dino.classList.add("dino-corriendo");  // Vuelve a poner la clase de correr.
    }
}

document.addEventListener('keydown', HandleKeyDown);
document.addEventListener('keyup', HandleKeyUp);

// Mueve el dinosaurio en base a su velocidad
function MoverDinosaurio() {
    dinoPosY += velY * deltaTime;  // Actualiza la posición vertical del dinosaurio según su velocidad.
    if(dinoPosY < sueloY){  // Si el dinosaurio está por debajo del suelo.
        TocarSuelo();  // Lo coloca de nuevo en el suelo.
    }
    dino.style.bottom = dinoPosY + "px";  // Actualiza la posición del dinosaurio en la pantalla.
}

// Cuando el dinosaurio toca el suelo, restablece su estado
function TocarSuelo() {
    dinoPosY = sueloY;  // Coloca el dinosaurio en el suelo.
    velY = 0;  // Detiene su movimiento vertical.
    if(saltando){  // Si estaba saltando.
        dino.classList.add("dino-corriendo");  // Vuelve a la animación de correr.
    }
    saltando = false;  // Ya no está saltando.
}

// Mueve el suelo hacia la izquierda para simular el movimiento del escenario
function MoverSuelo() {
    sueloX += CalcularDesplazamiento();  // Calcula cuánto se debe mover el suelo en este frame.
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px";  // Aplica el movimiento al suelo.
}

// Calcula el desplazamiento basado en la velocidad del escenario y el deltaTime
function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;  // Multiplica por la velocidad del juego.
}

// Detiene el juego cuando el dinosaurio se estrella
function Estrellarse() {
    dino.classList.remove("dino-corriendo");  // Quita la animación de correr.
    dino.classList.add("dino-estrellado");  // Añade la clase de estrellado.
    parado = true;  // Detiene el juego.

    // Detiene la animación de los pájaros
    var birds = document.querySelectorAll(".birds");  // Selecciona todos los pájaros.
    birds.forEach(function(bird) { //forEach metood de los arrays se utiliza para iterra sobre los elementos de un array
        bird.style.animationPlayState = "paused";  // Pausa la animación de cada pájaro.
    });
}

// Crea obstáculos basados en el tiempo transcurrido
function DecidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTime;  // Resta el deltaTime al tiempo hasta el próximo obstáculo.
    if(tiempoHastaObstaculo <= 0) {  // Si es hora de crear un nuevo obstáculo.
        CrearObstaculo();  // Llama a la función para crearlo.
    }
}

// Crea nuevas nubes de manera similar a los obstáculos
function DecidirCrearNubes() {
    tiempoHastaNube -= deltaTime;  // Resta el deltaTime al tiempo hasta la próxima nube.
    if(tiempoHastaNube <= 0) {  // Si es hora de crear una nueva nube.
        CrearNube();  // Llama a la función para crearla.
    }
}

// Crea un nuevo obstáculo (cactus)
function CrearObstaculo() {
    var obstaculo = document.createElement("div");  // Crea un nuevo div para el obstáculo.
    contenedor.appendChild(obstaculo);  // Lo añade al contenedor del juego.  //appenChild agregar nuevos elementos a elementos de un documento o tambien para moverlo el elemento de la pagina
    obstaculo.classList.add("cactus");  // Añade la clase de cactus.
    if(Math.random() > 0.6) obstaculo.classList.add("cactus2");  // A veces añade una clase extra para variación.
    obstaculo.posX = contenedor.clientWidth;  // Coloca el obstáculo en el borde derecho.  //clienteWidth es para determinar el límite máximo de la pantalla donde se deben generar o mover los obstáculos 
    obstaculo.style.left = contenedor.clientWidth + "px";  // Lo coloca visualmente en el borde derecho.

    obstaculos.push(obstaculo);  // Añade el obstáculo a la lista.  // .push() se utiliza para agregar uno o más elementos al final de un array.
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel;  // Calcula el tiempo hasta el próximo obstáculo.
}

// Crea una nueva nube
function CrearNube() {
    var nube = document.createElement("div");  // Crea un nuevo div para la nube.
    contenedor.appendChild(nube);  // Lo añade al contenedor del juego.
    nube.classList.add("nube");  // Añade la clase de nube.
    nube.posX = contenedor.clientWidth;  // Coloca la nube en el borde derecho.
    nube.style.left = contenedor.clientWidth + "px";  // Lo posiciona visualmente.
    nube.style.bottom = minNubeY + Math.random() * (maxNubeY - minNubeY) + "px";  // Le asigna una altura aleatoria.

    nubes.push(nube);  // Añade la nube a la lista.
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax - tiempoNubeMin) / gameVel;  // Calcula el tiempo hasta la próxima nube.
}

// Mueve los obstáculos hacia la izquierda
function MoverObstaculos() {
    for (var i = obstaculos.length - 1; i >= 0; i--) {  // Itera a través de los obstáculos desde el último.
        if(obstaculos[i].posX < -obstaculos[i].clientWidth) {  // Si el obstáculo sale de la pantalla.
            obstaculos[i].parentNode.removeChild(obstaculos[i]);  // Lo elimina del DOM.
            obstaculos.splice(i, 1);  // Lo elimina de la lista de obstáculos.
            GanarPuntos();  // Aumenta la puntuación por evadir un obstáculo.
        } else {
            obstaculos[i].posX -= CalcularDesplazamiento();  // Mueve el obstáculo hacia la izquierda.
            obstaculos[i].style.left = obstaculos[i].posX + "px";  // Actualiza su posición en la pantalla.
        }
    }
}

// Mueve las nubes hacia la izquierda
function MoverNubes() {
    for (var i = nubes.length - 1; i >= 0; i--) {  // Itera a través de las nubes desde la última.
        if(nubes[i].posX < -nubes[i].clientWidth) {  // Si la nube sale de la pantalla.
            nubes[i].parentNode.removeChild(nubes[i]);  // La elimina del DOM.
            nubes.splice(i, 1);  // La elimina de la lista de nubes.
        } else {
            nubes[i].posX -= CalcularDesplazamiento() * velNube;  // Mueve la nube hacia la izquierda a menor velocidad.
            nubes[i].style.left = nubes[i].posX + "px";  // Actualiza su posición en la pantalla.
        }
    }
}

const birds = document.querySelector('.birds'); // Selecciona el elemento con la clase 'birds'

// Aumenta la puntuación del jugador
function GanarPuntos() {
    score++;  // Incrementa la puntuación en 1.
    textoScore.innerText = score;  // Actualiza el texto que muestra la puntuación.
    if(score == 5){  // A los 5 puntos.
        gameVel = 1.5;  // Aumenta la velocidad del juego.
        contenedor.classList.add("mediodia");  // Cambia el fondo a mediodía.
    } else if(score == 10) {  // A los 10 puntos.
        gameVel = 1.9;  // Aumenta aún más la velocidad.
        contenedor.classList.add("tarde");  // Cambia el fondo a la tarde.
    } else if(score == 20) {  // A los 20 puntos.
        gameVel = 2.4;  // Aumenta la velocidad al máximo.
        contenedor.classList.add("anochecer");  // Cambia el fondo a la anochecer.
    } else if(score == 30) {  // A los 30 puntos.
        gameVel = 2.8;  // Aumenta la velocidad al máximo.
        contenedor.classList.add("noche");  // Cambia el fondo a la noche.
    }

    suelo.style.animationDuration = (3 / gameVel) + "s";  // Ajusta la duración de la animación del suelo según la velocidad.

    // Condición para que los pájaros aparezcan cuando el puntaje sea mayor a 15.
    if (score >= 15) {
        birds.classList.add("aparecer");  // Agrega la clase que muestra los pájaros.

        // Alterna la posición del pájaro aleatoriamente (más cerca del suelo o más arriba).
        var birdPosition = Math.random() > 0.5 ? "70px" : "40px";  // 78px para más cerca del suelo, 40px para más alto.
        birds.style.bottom = birdPosition;  // Cambia la posición vertical.
    } else {
        birds.classList.remove("aparecer");  // Asegura que se ocultan si la puntuación es menor a 15.
    }
}

// Maneja el fin del juego
function GameOver() {
    Estrellarse();  // Muestra el estado de estrellarse del dinosaurio.
    gameOver.style.display = "block";  // Muestra el mensaje de "Game Over".
    document.querySelector('.reset-btn').style.display = "block";  // Muestra el botón de reiniciar.
}

// Evento para reiniciar el juego cuando se hace clic en el botón de reinicio
document.querySelector('.reset-btn').addEventListener('click', function() {
    ReiniciarJuego();  // Llama a la función que reinicia el juego.
});

// Detecta colisiones con obstáculos y pájaros
function DetectarColision() {
    // Detectar colisión con obstáculos
    for (var i = 0; i < obstaculos.length; i++) {
        if(obstaculos[i].posX > dinoPosX + dino.clientWidth) {
            // Si el obstáculo está delante del dinosaurio, continúa con el siguiente obstáculo.
            break;
        } else {
            if(IsCollision(dino, obstaculos[i], 10, 30, 15, 20)) {  // Detecta si hay colisión con el obstáculo.
                GameOver();  // Si hay colisión, termina el juego.
            }
        }
    }

    // Detectar colisión con pájaros
    var birds = document.querySelectorAll(".birds");  // Selecciona todos los pájaros.
    for (var i = 0; i < birds.length; i++) {
        if(birds[i].posX > dinoPosX + dino.clientWidth) {
            // Si el pájaro está delante del dinosaurio, continúa con el siguiente.
            break;
        } else {
            if(IsCollision(dino, birds[i], 10, 30, 15, 20)) {  // Detecta si hay colisión con el pájaro.
                GameOver();  // Si hay colisión, termina el juego.
            }
        }
    }
}

// Función que detecta si dos elementos HTML (como el dinosaurio y un obstáculo) colisionan, considerando un padding.
function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    
    // Obtiene las coordenadas del rectángulo delimitador del elemento 'a' (en este caso, el dinosaurio).
    var aRect = a.getBoundingClientRect();  
    
    // Obtiene las coordenadas del rectángulo delimitador del elemento 'b' (en este caso, el obstáculo o pájaro).
    var bRect = b.getBoundingClientRect();  
    
    // Compara las posiciones de los dos rectángulos para determinar si hay una colisión.
    // Si una de estas comparaciones es verdadera, significa que no hay colisión, ya que los elementos
    // están suficientemente alejados uno del otro.

    return !(
        // Verifica si el borde inferior del rectángulo 'a' (con el padding aplicado) está por encima del borde superior de 'b'. 
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||  
        
        // Verifica si el borde superior del rectángulo 'a' (con el padding aplicado) está por debajo del borde inferior de 'b'.
        (aRect.top + paddingTop > (bRect.top + bRect.height)) || 
        
        // Verifica si el borde derecho del rectángulo 'a' (con el padding aplicado) está a la izquierda del borde izquierdo de 'b'.
        ((aRect.left + aRect.width - paddingRight) < bRect.left) || 
        
        // Verifica si el borde izquierdo del rectángulo 'a' (con el padding aplicado) está a la derecha del borde derecho de 'b'.
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    );
}

// Reinicia el estado del juego
function ReiniciarJuego() {
    // Restablece las posiciones y velocidades a los valores iniciales
    dinoPosX = 42;  // Posición horizontal inicial del dinosaurio
    dinoPosY = sueloY;  // Posición vertical inicial del dinosaurio en relación al suelo
    velY = 0;  // Velocidad vertical del dinosaurio (sin movimiento)
    parado = false;  // El dinosaurio no está parado
    saltando = false;  // El dinosaurio no está saltando
    score = 0;  // Reinicia el puntaje
    gameVel = 1;  // Velocidad inicial del juego
    sueloX = 0;  // Posición inicial del suelo
    
    // Elimina los obstáculos, nubes y pájaros
    obstaculos.forEach(function(obstaculo) {
        obstaculo.parentNode.removeChild(obstaculo);  // Elimina cada obstáculo del DOM
    });
    obstaculos = [];  // Vacía el array de obstáculos
    
    nubes.forEach(function(nube) {
        nube.parentNode.removeChild(nube);  // Elimina cada nube del DOM
    });
    nubes = [];  // Vacía el array de nubes
    
    birds = [];  // Vacía el array de pájaros
    
    // Restablece la apariencia del dinosaurio y el suelo
    dino.classList.add("dino-corriendo");  // Asegura que el dinosaurio vuelva a estar en el estado "corriendo"
    dino.classList.remove("dino-estrellado");  // Elimina el estado de colisión o "estrellado" del dinosaurio
    suelo.style.left = "0px";  // Restablece la posición del suelo
    
    // Oculta el mensaje de "Game Over" y el botón de reiniciar
    gameOver.style.display = "none";  // Oculta el mensaje de fin del juego
    document.querySelector('.reset-btn').style.display = "none";  // Oculta el botón de reiniciar
    
    // Restablece el puntaje visible
    textoScore.innerText = score;  // Muestra el puntaje reiniciado en pantalla
    
    // Reinicia el tiempo de obstáculos y nubes
    tiempoHastaObstaculo = 2;  // Tiempo inicial antes de que aparezca un nuevo obstáculo
    tiempoHastaNube = 0.5;  // Tiempo inicial antes de que aparezca una nueva nube
    
    // Restablece la apariencia de día
    contenedor.classList.remove("mediodia", "tarde", "anochecer", "noche");  // Quita todas las clases de cambio de tiempo (día, tarde, noche)
    
    // Oculta los pájaros al reiniciar el juego
    var birds = document.querySelector('.birds');
    birds.classList.remove("aparecer");  // Asegura que los pájaros no aparezcan justo después de reiniciar.
    
    // Reanuda la animación de los pájaros
    var birds = document.querySelectorAll(".birds");
    birds.forEach(function(bird) {
        bird.style.animationPlayState = "running";  // Reanuda la animación de vuelo de los pájaros.
    });
    
    // Reinicia el tiempo y comienza el loop del juego nuevamente
    time = new Date();  // Establece el tiempo actual como referencia para el loop del juego.
    Loop();  // Reinicia el ciclo principal del juego para que vuelva a ejecutarse.
}
