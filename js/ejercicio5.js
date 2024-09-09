function cambiarColor(color){
    document.getElementById("rojo").style.backgroundColor = color === 'rojo' ? 'red' : 'grey';
    document.getElementById("amarillo").style.backgroundColor = color === 'amarillo' ? 'yellow' : 'grey';
    document.getElementById("verde").style.backgroundColor = color === 'verde' ? 'green' : 'grey';
}

function iniciarSemaforo(){
    setTimeout(() => cambiarColor('rojo'), 0);
    setTimeout(() => cambiarColor('amarillo'), 3000);
    setTimeout(() => cambiarColor('verde'), 6000);
    setTimeout(iniciarSemaforo, 9000); 
}