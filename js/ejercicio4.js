function calcular() {
     // Obtiene el valor del primer número y lo convierte a número con decimales
    let num1 = parseFloat(document.getElementById("num1").value);
    // Obtiene el valor de la operación seleccionada
    let num2 = parseFloat(document.getElementById("num2").value);
      // Obtiene el valor del segundo número y lo convierte a número con decimales
    let operacion = document.getElementById("operacion").value;
    let resultado;    // Inicializa una variable para almacenar el resultado del cálculo

    // Realiza el cálculo basado en la operación seleccionada
    switch(operacion) {
         // Operación de suma
        case "+":
            resultado = num1 + num2;
            break;
        case "-":
             // Operación de resta
            resultado = num1 - num2;
            break; 
        case "*" :
            // Operación de multiplicación
            resultado = num1 * num2;
            break; 
        case "/" : 
            // Operación de división; verifica para evitar división por cero
            if (num2 === 0) {
                resultado = "No se puede dividir por cero";
            } else {
                resultado = num1 / num2; 
            }
            break; 
        default: 
         // Caso por defecto (no debería ocurrir debido a las opciones predefinidas)
            resultado = "Operación no válida";
    }
     // Muestra el resultado del cálculo en el elemento <p>
    document.getElementById("resultado").innerText = "Resultado: " + resultado;
}