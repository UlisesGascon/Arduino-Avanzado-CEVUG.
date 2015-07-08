/*
Curso Arduino Avanzado 3ed
Practica 06
Alumno: Ulises Gascón
*/

/*
Titulo: Galletas de la fortuna con Nodejs y Websockets

Descripción:

En esta práctica el objetivo es hacer un simulador de las míticas galletas de la fortuna que nos muestre el mensaje en el LCD,
asi como en una web en nuestro servidor local (localhost:xxxx o IP:xxxx), también queremos activar la apertura de las galletas a traves de la web
o del arduino fisicamente. Por tanto requeriremos que el LCD y la pagina web esten sincronizados.

Más detalles:
- Cualquier ordenador, tablet o smartphone conectado a la red local podra acceder al script a través del navegador.
- Se incluye una función para depurar usando la consola de Nodejs, que se puede habilitar o deshabilitar.
- El entorno web (websockets) es opcional y se peude habilitar o deshabilitar con una variable.
- Existe un modo Geek que utiliza mensajes un poco más especiales.
- El script utiliza una libreria con más de 350 mensajes predefinidos.
- El script funciona con o sin Edubasica Shield.


Lógica de la aplicación:
- Se carga arduino y websockets (al entrar en localhost:PUERTO o IPHost:PUERTO)
- Al entrar en la web se carga index.html y sus mensajes se imprimen dentro de la foto.
- Se carga una librería con más de 350 mensajes en formato array.
- Si se pulsa el boton físico o el botón en la web...
- El programa genera un número al azar, dependiendo del modo Geek o normal.
- En base a ese numero... trae el mensaje correcpondiente de la librería.
- Imprime el mensaje en la web y en el LCD al mismo tiempo.
- En el caso del LCD... el mensaje puede dividirse para encajar entre las 4 lineas de 20 caracteres.
- Modo Debug disponible.


Hardware necesario(con Edubasica Shield):
- Placa Arduino [x1]
- Edubasica Shield (http://www.practicasconarduino.com/edubasica/)[x1]
- Pantalla LCD 4x20 con I2C [x1] (LCM1602)

Hardware necesario(sin Edubasica Shield):
- Placa Arduino [x1]
- Pulsador [x1]
- Resistnecia de 10k [x1]
- Pantalla LCD 4x20 con I2C [x1] (LCM1602)

Preinstalacion:
- Nodejs
- Websockets
- Librería Johnny-five


Creditos:
- Hendrik Lammers (https://gist.github.com/hendriklammers/5231994) por la función splitString
- Huffington Post por imagen de index.html
- Librería de mensaje creada a partir de la web ttp://www.fortunecookiemessage.com


Nota: No es necesario realizar ningun cambio, el dódigo esta listo. 
*/

/*
  EMPIEZA EL CÓDIGO
*/

/*
  ====== Librerías de Nodejs =======
*/

// Libreria de mensajes
var fortune = require('./cookieMessages');

var five = require("johnny-five");
var board = new five.Board();
// Librerias para WebSockets
var uri="/index.html";
var fs = require('fs');
var http = require('http');
var socket = require("socket.io");

/*
  ====== Opciones del Script =======
*/

// WebSockets 
var wsMode = true;

// Modo Geek
var geekMode = false;

// Depurador
var debugMode = false;

// localhost:PUERTO!
var wsPort = 3000;

// Si esta activado el modo depuración se Imprime esta información 
if (debugMode) {
  console.log("----------------------");
  console.log("Modo depuración Activado!");
  console.log("----------------------");
};

// Arrancamos Arduino
board.on("ready", function() {

/*
  ====== WEBSOCKETS y SERVIDOR WEB =======
*/

// Arrancamos el servidor si wsMode es true
if (wsMode) {
  // referenciamos a index.html
  var page = fs.readFileSync(__dirname + uri);

  // Controlamos la respuesta
   function handler(request, response)
  {
    response.write(page);
    response.end();
  }
  // Levantamos el servidor
  var app = http.createServer(function(r, s){ handler(r,s); });
  app.listen(wsPort);
  var listener = socket.listen(app, { log: false });

  // Función al inicio de la conexion con el cliente e iniciación del programa en caso de pulsar el botón en la web.
  // Envio de mensajes en caso de cambio.
  function wsStart(socket)
  {
    socket.emit('message', 'ARE YOU LUCKY TODAY? OPEN THE COOKIE!!');
    socket.on('called', function(){
      // Depuración
      if (debugMode) {
      console.log( "Button pressed via web" );
      };
      // Iniciamos el programa
      initFortune (socket);
    });
  }   
  listener.sockets.on('connection', function (socket) { wsStart(socket);} );
};

/*
    Definimos el hardware
*/

// Definimos el LCD (LCM1602 de 4X20) usando I2C 
var lcd = new five.LCD({
    controller: "LCM1602",
    pins: ["A5", "A4"],
    rows: 4,
    cols: 20
});

// Definimos el Botón
var button = new five.Button(2);

// Arrancamos el LCD con la bienvenida
initLCD();

// Cuando se pulsa el botón... 
button.on("press", function() {

// Depuración
    if (debugMode) {
    console.log( "Button pressed" );
    };

// Iniciamos el programa
    initFortune();
});

// Función... mensaje de bienvenida en el LCD
function initLCD () {
      lcd.clear();
      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print("PLEASE, PRESS ME!!");  
      lcd.cursor(2, 0).print("ARE YOU LUCKY TODAY?"); 
      lcd.cursor(3, 0).print("===================="); 
};


// Función que controla la ejecución de todo el programa y elige los mensajes
function initFortune (socket) {

// Creamos el mensaje "vacio".
var theMessage = "empty";


// Elección de un número al azar segun modo Geek o normal y actualización de la variable theMessage con el mensaje correcto.
  if (geekMode) {
    var number = Math.floor(Math.random() * 18) + 0;
    theMessage = fortune.geeks[number];
    console.log(theMessage);

  } else {
    var number = Math.floor(Math.random() * 349) + 0;
    theMessage = fortune.random[number];
        console.log(theMessage);
  };

// Depuración
  if (debugMode) {
    console.log("The message: " +theMessage);
  };

// Imprimiendo los resultados por consola
  console.log("-------------------");
  console.log("Your fortune today:");
  console.log(theMessage);
  console.log("-------------------");

// Limpiamos el LCD del mensaje de Bienvenida   
    lcd.clear();

/**
 * developed by Hendrik Lammers
 * more info: https://gist.github.com/hendriklammers/5231994
 * Split a string into chunks of the given size
 * @param  {String} string is the String to split
 * @param  {Number} size is the size you of the cuts
 * @return {Array} an Array with the strings
 */
function splitString (string, size) {
  var res = new RegExp('.{1,' + size + '}', 'g');
  return string.match(res);
}

/*
          ==== MANIPULACIÓN E IMPRESIÓN DEL MENSAJE ====
  Selección del tipo de impresión en función de la longitud del mensaje
*/

    //Mensaje menor o igual a 20 caracteres (1 linea del LCD)
    if(theMessage.length <= 20) {
      
      // Impresión para el LCD
      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print(theMessage);
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");

      // Envio de datos a la web
      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> emit.");
        };
        listener.sockets.emit('message', theMessage);
      };

      //Mensaje menor o igual a 40 caracteres (2 lineas del LCD)
    } else if(theMessage.length <= 40) {

      // dividimos el mensaje en un array de 2 cadenas. (20 caracteres + x caracteres)
      var res = splitString(theMessage, 20);
      
      // Impresión para el LCD
      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print(res[0]);
      lcd.cursor(2, 0).print(res[1]);
      lcd.cursor(3, 0).print("====================");
      
      // Envio de datos a la web
      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> emit.");
        };
        listener.sockets.emit('message', theMessage);
      };

      //Mensaje menor o igual a 60 caracteres (3 lineas del LCD)
    } else if(theMessage.length <= 60) {
      
      // dividimos el mensaje en un array de 3 cadenas. (20 + 20 + x caracteres)
      var res = splitString(theMessage, 20);
      // Impresión para el LCD
      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print(res[0]);
      lcd.cursor(2, 0).print(res[1]);
      lcd.cursor(3, 0).print(res[2]);
      // Envio de datos a la web
      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> emit.");
        };
        listener.sockets.emit('message', theMessage);
      };

      //Mensaje menor o igual a 80 caracteres (4 lineas del LCD)    
    } else if(theMessage.length <= 80) {
      // dividimos el mensaje en un array de 4 cadenas. (20 + 20 + 20 + x caracteres)      
      var res = splitString(theMessage, 20);
      // Impresión para el LCD      
      lcd.cursor(0, 0).print(res[0]);
      lcd.cursor(1, 0).print(res[1]);
      lcd.cursor(2, 0).print(res[2]);
      lcd.cursor(3, 0).print(res[3]);
      // Envio de datos a la web
      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> emit.");
        };
        listener.sockets.emit('message', theMessage);
      };

      //Mensaje mayor a 80 caracteres (4 lineas del LCD)    
    } else {
      // el LCD imprime un error
      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print("ERROR IN MESSAGE");
      lcd.cursor(2, 0).print("TEXT VERY LONG");
      lcd.cursor(3, 0).print("====================");
      // la consola confirma el error
      console.log("Error in message");
      console.log("Message very long");
      // Envio de datos integros a la web. No presenta un problema
      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> emit.");
        };
        listener.sockets.emit('message', theMessage);
      };

    };

};

}); // Fin del código