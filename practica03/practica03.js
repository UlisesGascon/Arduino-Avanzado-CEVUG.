/*
Curso Arduino Avanzado 3ed
Practica 3
Alumno: Ulises Gascón
*/

/*
Titulo: Arduino con Firebase

Descripción:

En esta práctica el objetivo es que podamos enviar datos de nuestros sensores a Firebase. 
Despues leeremos los datos de Firebase y lo sacaremos por consola.
Se incluye una función para depurar usando leds, que se puede habilitar o deshabilitar.

Lógica de la aplicación:
- Se leen los datos del potenciometro
- Se verifica si los datos de la lectura son diferentes
- En caso de ser datos diferentes se procede a subirlos a Firebase.
- Se da lectura a los datos de Firebase y se imprime por consola cada vez que varian.

Hardware necesario:
- Placa Arduino [x1]
- Potenciometro [x1]
- Led [x2] (Pin 3 y 4)
- Resistencias 220ohm 5%tol [x2]

Preinstalacion:
- Nodejs
- Libreria Johnny-five
- Libreria Firebase
- Cuenta y aplicación disponible en Firebase


Nota: Es necesario actualziar la variable myFB con los datos de una aplicación real

*/

/*
  EMPIEZA EL CÓDIGO
*/

var five = require("johnny-five");
var Firebase = require("firebase");

var board = new five.Board();

/*
  ====== Varaibles de Configuración ======
*/

// Incluir la dirección de tu proyecto
var myFB = "https://<<<--TU APP-->>>.firebaseio.com/";
// Ajsutar el modo Debug
debugMode = true;



var myFirebaseRef = new Firebase(myFB);

// Instanciación para Arduino
board.on("ready", function() {
  

/*
  ====== Elementos del script ======
*/ 
  // Definición del potenciometro
  var potenciometro = new five.Sensor("A0");
  // Led Naranja
  var led2 = new five.Led(4);
  // Led Verde
  var led1 = new five.Led(3);



/*
  ====== Subida de datos ======
*/
  // Verificación de las lecturas del protenciometro
  potenciometro.on("data", function() {
    // Variable de ajuste, control del último valor.
    var lastKnownVal = 0;


    // Verificación del valor antes de la subida
    if(this.value != lastKnownVal) {
      lastKnownVal = this.value;
      // Subida de datos a FIrebase
      myFirebaseRef.set(this.value);
      // Encender el led Naranja si se suben datos
      if (debugMode) {
        led2.on();
      };
    } 
  });



/*
  ====== Bajada de datos ======
*/
    // Lectura de datos de Firebase
    myFirebaseRef.on("value", function(snap) {
      // Impresón de datos por consola
      console.log(snap.val());
      if (debugMode) {
        led1.on();
      };
    });

});