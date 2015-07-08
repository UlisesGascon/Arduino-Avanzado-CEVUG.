
// http://i.huffpost.com/gen/1117772/images/o-FORTUNE-COOKIE-facebook.jpg
//http://www.fortunecookiemessage.com/

// CONTRIBUTORS - AÑADIR


var fortune = require('./cookieMessages');
var five = require("johnny-five");
var board = new five.Board();
// LIbrerias para WebSockets
var uri="/index.html";
var fs = require('fs'),
    http = require('http'),
    socket = require("socket.io");

// WebSockets 
var wsMode = true;

//Modo Geek
var geekMode = false;

// Depurador
var debugMode = true;

// Si esta activado el modo depuración se Imprime esta información 
if (debugMode) {
  console.log("----------------------");
  console.log("Modo depuración Activado!");
  console.log("----------------------");
};



// Arrancamos Arduino
board.on("ready", function() {

// Arrancamos el servidor
if (wsMode) {
  var page = fs.readFileSync(__dirname + uri);

  function handler(request, response)
  {
    response.write(page);
    response.end();
  }
  var app = http.createServer(function(r, s){ handler(r,s); });
  app.listen(8080);
  var listener = socket.listen(app, { log: false });

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

// Definimso el Boton
var button = new five.Button(2);

// Limpiamos los dispositivos al arrancar


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

function initLCD () {
      lcd.clear();
      lcd.cursor(0, 0).print("== FORTUNE COOKIE =="); // Titulo estatico
      lcd.cursor(1, 0).print("PLEASE, PRESS ME!!");  // Fecha en formato (Date: DD/MM/YYYY)
      lcd.cursor(2, 0).print("ARE YOU LUCKY TODAY?"); // Hora en formato (Time: HH:MM:SS)
      lcd.cursor(3, 0).print("===================="); // Footer estático
};


function initFortune (socket) {

var theMessage = "empty";


// Número al azar
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

// Imprimiendo los resultados por LCD

    
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




    if(theMessage.length <= 20) {
      
      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print(theMessage);
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");

      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> received.");
        };
        listener.sockets.emit('message', theMessage);
      };

    } else if(theMessage.length <= 40) {

      var res = splitString(theMessage, 20);

      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print(res[0]);
      lcd.cursor(2, 0).print(res[1]);
      lcd.cursor(3, 0).print("====================");

      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> received.");
        };
        listener.sockets.emit('message', theMessage);
      };
    
    } else if(theMessage.length <= 60) {
      
      var res = splitString(theMessage, 20);
      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print(res[0]);
      lcd.cursor(2, 0).print(res[1]);
      lcd.cursor(3, 0).print(res[2]);

      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> received.");
        };
        listener.sockets.emit('message', theMessage);
      };

    
    } else if(theMessage.length <= 80) {
      
      var res = splitString(theMessage, 20);
      lcd.cursor(0, 0).print(res[0]);
      lcd.cursor(1, 0).print(res[1]);
      lcd.cursor(2, 0).print(res[2]);
      lcd.cursor(3, 0).print(res[3]);

      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> received.");
        };
        listener.sockets.emit('message', theMessage);
      };

    
    } else {

      lcd.cursor(0, 0).print("== FORTUNE COOKIE ==");
      lcd.cursor(1, 0).print("ERROR IN MESSAGE");
      lcd.cursor(2, 0).print("TEXT VERY LONG");
      lcd.cursor(3, 0).print("====================");

      console.log("Error in message");
      console.log("Message very long");

      if (wsMode) {
        if (debugMode) {
        console.log("WebSOcket Request -> received.");
        };
        listener.sockets.emit('message', theMessage);
      };

    };


};




}); // Fin del código



