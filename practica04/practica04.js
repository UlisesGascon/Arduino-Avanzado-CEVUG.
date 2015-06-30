/*
Curso Arduino Avanzado 3ed
Practica 04
Alumno: Ulises Gascón
*/

/*
Titulo: Valor del Bitcoin en tiempo real con Firebase

Descripción:

En esta práctica el objetivo es que podamos ver en la pantalla LCD, el valor en Dolares o Euros
de un Bitcon. 

Se incluye una función para depurar usando la consola de Nodejs, que se puede habilitar o deshabilitar.

Lógica de la aplicación:
- Se leen los valores de Firebase cada vez que cambian.
- En caso de usar Euros, este valor es recalculado y redondeado a dos decimales.
- Los datos se muestran en la pantalla LCD.


Hardware necesario:
- Placa Arduino [x1]
- Pantalla LCD con I2C [x1]


Preinstalacion:
- Nodejs
- Libreria Johnny-five
- Libreria Firebase


Nota: No es necesario realizar ningun cambio, el dódigo esta listo. 
*/

/*
  EMPIEZA EL CÓDIGO
*/

/*
  ====== Librerías de Nodejs =======
*/
var five = require("johnny-five");
var Firebase = require("firebase");
var board = new five.Board();

/*
  ====== Varaibles de Configuración ======
*/

// Ajsutar el modo Debug
debugMode = false;

// Ajustar la moneda
var currency = "dollar"; // "dollar" or "euro"

// Ajustar la tasa de cambio Dolar -> Euro
var euroRate = 0.89;

// Base de datos con la información de los Bitcoins.
var myFirebaseRef = new Firebase("https://publicdata-bitcoin.firebaseio.com/");

// Instanciación para Arduino
board.on("ready", function() {
  
// LCD con interfaz I2C
var lcd = new five.LCD({
    controller: "LCM1602",
    pins: ["A5", "A4"],
    rows: 4,
    cols: 20
});

// Definición del caracter de Euro para el LCD
lcd.useChar("euro");


/*
  ====== Bajada de datos ======
*/

myFirebaseRef.on("value", function(snapshot) {
  var newChange = snapshot.val();
  // Modo Debug
    if (debugMode) {
      console.log("**************");
      console.log("Ask($): " + newChange.ask);
      console.log("Bid($): " + newChange.bid);
      console.log("Last($): " + newChange.last);
      console.log("--------------");
      console.log("Conversion Rate: "+euroRate);
      console.log("Currency selected: "+currency);      
      console.log("--------------");
      console.log("Ask(€): " +(newChange.ask*euroRate).toFixed(2));
      console.log("Bid(€): " +(newChange.bid*euroRate).toFixed(2));
      console.log("Last(€): " +(newChange.last*euroRate).toFixed(2));
      console.log("**************");               
    };

    // Si la moneda elegida es dolares.
    if (currency == "dollar") {
      lcd.clear();
      lcd.cursor(0, 0).print("==== BITCOIN ($) ===");
      lcd.cursor(1, 0).print("Ask: "+newChange.ask+"$");
      lcd.cursor(2, 0).print("Bid: "+newChange.bid+"$");
      lcd.cursor(3, 0).print("Last: "+newChange.last+"$");
    /*
        Si la moneda elegida es Euros
        Se multiplica el valor por el cambio de Dolar/euro... y luego se redondea a dos decimales
    */
    } else if(currency == "euro"){
      lcd.clear();
      lcd.cursor(0, 0).print("==== BITCOIN (:euro:) ===");
      lcd.cursor(1, 0).print("Ask: "+(newChange.ask*euroRate).toFixed(2)+":euro:"); 
      lcd.cursor(2, 0).print("Bid: "+(newChange.bid*euroRate).toFixed(2)+":euro:");
      lcd.cursor(3, 0).print("Last: "+(newChange.last*euroRate).toFixed(2)+":euro:");      
    // En caso de monedas no reconocidas, se muestra el siguiente error.
    } else{
      lcd.clear();
      lcd.cursor(0, 0).print("===== BITCOIN (X) ====");
      lcd.cursor(1, 0).print("ERROR!! CURRENCY.");
      lcd.cursor(2, 0).print("Try Dollar or Euro.");
      lcd.cursor(0, 0).print("====================");
    };

}); // myFirebaseRef

}); // board