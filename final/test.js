/*
Curso Arduino Avanzado 3ed
Proyecto final
Alumno: Ulises Gascón
*/

/*
Titulo: 
Librería para EduBasica Shield con Nodejs (v2)


Descripción:
El objetivo de este proyecto final es hacer una librería mejorada para usar Edubasica Shield con Nodejs. 
En esta versión la idea principal era incluir el soporte a Websockets y con ello, poder gestionar toda la 
tarjeta desde el navegador web. 

Independientemente de si se navega desde el ordenador que aloja el servidor o cualquier otro dispositivo 
conectado a la misma red.

Por supuesto la pagina web desde la que gestionamos el proyecto cuenta con un diseño responsive y funciona desde cualquier 
dispositivo móvil.

Más detalles sobre la versión v1 -> http://www.blog.ulisesgascon.com/edubasica-shield-con-nodejs/


Mejoras en esta versión:
- Se conserva la opción de usar solo la consola 
- Se incluye un acceso rápido para la documentación de las librerías que se usan.
- Se muestra información en tiempo real en el navegador de las variables globales y el estado de los motores, 
  servo y se proporciona la lectura de los sensores
- Si el host es un sistema Linux compatible. En la página web se puede ver la información del sistema
  en tiempo real (kernel, hostname, Memoria Ram, procesos en ejecución, CPU, etc...)
- Se incluye la opción de sacar por el LCD un log de lo que ocurre.
- Se genera un código QR con la IP del Host y el puerto utilizado. Así se puede escanear con un Smartphone o tablet.
- El sistema permite varios dispositivos conectados a la vez mandando y recibiendo datos.
- Cualquier ordenador, tablet o Smartphone conectado a la red local podrá acceder al script a través del navegador.
- Desde el navegador se pueden disparar test totales o específicos (motores, servo, motorA, motorB, Leds...)
- En la pestaña Avanzado se puede controlar el movimiento de un robot que use 
  solo dos ruedas (hacia delante, atrás, giros y parada)
- En la pestaña Avanzado se pueden encender y apagar todos los Leds de manera independiente.
- En la pestaña Avanzado se puede controlar el parpadeo de cualquier Led y su ritmo.
- En la pestaña Avanzado se puede controlar el servo y posicionarlo directamente en un ángulo predeterminado.
- En la pestaña Avanzado se puede manipular el LCD... enviando mensajes al LCD y resetandolo con un botón.
- Toda la web se encuentra documentada para facilitar su uso.
- Se incluye una función para depurar en servidor y en local usando las respectivas consolas, 
  que se pueden habilitar o deshabilitar.
- El entorno web (websockets) es opcional y se puede habilitar o deshabilitar con una variable.
- El script funciona con o sin Edubasica Shield( sería necesario simular todos los leds, sensores 
  y demás en el mismo orden de conexión).
- El código se documenta a través de un índice incluido en el propio archivo. (usar ctrl + F para buscar en el código)

Lógica de la aplicación:
[Servidor - test.js]
Nota: El sistema permite el uso de la consola como en la versión 1 si wsMode es false (Índice 3.4).
- Cuenta con un log para LCD, si el LCD esta desactivado... el log también (Índice 3.1.2)
- Permite la customización a través de las variables globales (Índice 2.4 a 2.7)
- Las variables de EduBasica Shield v2 están definidas (Índice 2.9.1 a 2.9.8)
- La conectividad (IP, puerto..) se pueden configurar (índice 2.8 y 3.1)
- Se ofrece una bienvenida por consola con la información relevante (conexión, modos, etc...)(Índice 3.1.3)
- Se inicia el Servidor (websockets) (Índice 3.1.5 )
- Se apagan todos los motores, servos, leds... y se resetea el LCD. Por si se paró el script en 
  medio de una ejecución anterior (Índice 3.1.5.3)
- Se hace un primer envío de datos para llenar el contenido del navegador (Índice 3.1.5.4 a 3.1.5.4.10)  
- Se establece la escucha activa y constante de sensores (pulsador, ldr, potenciómetro, etc..) (Índice 3.1.5.6 a 3.1.5.6.3)
- Se establece el llamado a funciones en el servidor a petición del navegador, a través de socket.on() (Índice 3.2 entero)
- Las funciones imprimen por consola y LCD detalles durante la ejecución y pasan datos al navegador 
  a través de socket.emit() (Índice 3.3 completo)
- El envío de datos del sistema (CPU, RAM, etc..) se realiza a petición del usuario (índice 3.2.4) y su ejecución 
  se realiza solo si el servidor está alojado en un entorno Linux compatible (Índice 3.3.41)
- El envío de datos del sistema se realiza en dos fases. Un primer envío aislado (Índice 3.3.41.1 a 3.3.41.5) 
  y un envío en ciclos constantes (Índice 3.3.41.6 a 3.3.41.12). Los tiempos de los intervalos están definidos (Índice 2.3)


[Navegador - index.html]
- Lo estilos aplicados de terceros (Bootstrap) y propios están definidos en el propio index.hmtl (Índice 1.1 y 1.2)
- Toda la estructura de la pagina esta practicamente vacia, y no se llena sin la conexión adecuada con Nodejs,
  todo el html esta basado en Bootstrap 3 (Índice 2.1 a 2.8.3)
- Los scripts de terceros (QR, Boostrap....) y propios están incluidos en el index.html (Índice 3.1 y 3.2)  
- Los ajustes visuales y funcionalidades de los botones y demás se encuentran en el índice 3.2.1
- Las variables globales que permiten customizar el código (modo depuración, etc..) están en el índice 3.2.2
- Las funciones que requieren de procesamiento por parte del navegador están definidas en el índice 3.2.3 como
  la generación del código QR a partir de los datos enviados por Nodejs (índice 3.2.4.5 y 3.2.4.6)
- La recepción de datos del servidor y actualización en tiempo real del contenido de la web se realiza
  en las funciones comprendidas en el índice 3.2.4
- El envido de datos por websocket para disparar funciones en el servidor se realiza con las funciones comprendidas
  en el índice 3.2.5


Hardware necesario(con Edubasica Shield):
- Placa Arduino [x1]
- Edubasica Shield (http://www.practicasconarduino.com/edubasica/)[x1]
- Pantalla LCD 4x20 con I2C [x1] (LCM1602)
- Motor pequeño 5v [x2]
- Servo tipo HS-311
- Alimentación adiccional a través de Edubasica (5v) (via vin), una fuente ATX modificada es ideal.

Preinstalación:
- Nodejs
- Websockets
- Librería Johnny-five


Creditos:
- Incluida referencia a las librerias usadas en index.html (Índice 2.3 Paneles de Documentación)


Nota: No es necesario realizar ningun cambio, el dódigo esta listo. 
Nota(2): Index.html cuenta con los estilos y el javascript dentro, aunque no es una practica recomendada en el desarrollo web, pero
simplifica la comprensión de este ejercicio por desarrolladores menos expertos. 
*/

/*
    === Estructura del Script ===

Parte I - Librerías

1.1 Librería -> Arduino
1.2 Librería -> Websockets
1.3 Librería -> Datos del sistema (cpu, mem, etc..)


Parte II - Variables GLobales

2.1 Globales -> Versión Script
2.2 Globales -> Dummy (más adelante toman el valor correcto)
2.3 Globales -> Tiempo(ms) para datos del sistema
2.4 Globales -> Depuración
2.5 Globales -> LCD
2.6 Globales -> Websockets
2.7 Globales -> Linux Compatible
2.8 Globales -> Conectividad (Ip, puerto, etc....)
2.9 Globales -> Variables EduBasica (servo, leds, lcd, motores....)
2.9.1 Globales -> Variables EduBasica
2.9.1 Variables EduBasica -> Leds
2.9.2 Variables EduBasica -> potenciometro
2.9.3 Variables EduBasica -> ldr
2.9.4 Variables EduBasica -> servo
2.9.5 Variables EduBasica -> motorA
2.9.6 Variables EduBasica -> motorB
2.9.7 Variables EduBasica -> pulsador
2.9.8 Variables EduBasica -> lcd 


Parte III - Funciones

3.1 Funciones Locales
3.1.1 Local -> Determinar Adaptador de Red
3.1.2 Local -> Desactiva LCD log si LCD esta desactivado
3.1.3 Local -> Consola (Bienvenida)
3.1.3.1 Consola -> LcdEnable 
3.1.3.2 Consola -> LCDLogEnable
3.1.3.3 Consola -> linuxCompatible
3.1.3.4 Consola -> wsMode
3.1.4 Local -> Escucha Arduino
3.1.5 Local -> Arranca el servidor
3.1.5.1 Servidor -> handler
3.1.5.2 Servidor -> wsStart
3.1.5.3 Servidor -> Apagando todo
3.1.5.4 Servidor -> Primer envio de datos (Información tab)
3.1.5.4.1 Primer Envio -> potenciometroValue
3.1.5.4.2 Primer Envio -> ldrValue
3.1.5.4.3 Primer Envio -> pulsadorValue
3.1.5.4.4 Primer Envio -> testing
3.1.5.4.5 Primer Envio -> IP
3.1.5.4.6 Primer Envio -> port
3.1.5.4.7 Primer Envio -> debugServer
3.1.5.4.8 Primer Envio -> lcdStatus
3.1.5.4.9 Primer Envio -> LCDLogEnable
3.1.5.4.10 Primer Envio -> linuxCompatible
3.1.5.5 Servidor -> Reseteando el LCD
3.1.5.6 Servidor -> Envio automatico datos (Información tab)
3.1.5.6.1 Envio automatico -> potenciometroValue
3.1.5.6.2.1 pulsadorValue -> hold
3.1.5.6.2.2 pulsadorValue -> press
3.1.5.6.2.3 pulsadorValue -> release
3.1.5.6.3 Envio automatico -> ldr
3.2 socket.on(): llamada a funciónes
3.2.1 Llamar función -> callCustomBlink
3.2.1.1 callCustomBlink -> MS
3.2.1.2 callCustomBlink -> Led
3.2.1.3 callCustomBlink -> Ejecutar función
3.2.2 Llamar función -> servo
3.2.3 Llamar función -> callPrintLCD
3.2.3.1 callPrintLCD -> lcdLine1
3.2.3.2 callPrintLCD -> lcdLine2
3.2.3.3 callPrintLCD -> lcdLine3
3.2.3.4 callPrintLCD -> lcdLine4
3.2.3.5 callPrintLCD -> Ejecutar Función
3.2.4 Llamar función -> callDatosSistema
3.2.5 Llamar función -> callPararTodo
3.2.6 Llamar función -> callPararLeds
3.2.7 Llamar función -> callParpadearLeds
3.2.8 Llamar función -> callApagarLeds
3.2.9 Llamar función -> callEncenderLeds
3.2.10 Llamar función -> callPararLed1
3.2.11 Llamar función -> callPararLed2
3.2.12 Llamar función -> callPararLed3
3.2.13 Llamar función -> callParpadearLed1
3.2.14 Llamar función -> callParpadearLed2
3.2.15 Llamar función -> callParpadearLed3
3.2.16 Llamar función -> callApagarLed1
3.2.17 Llamar función -> callApagarLed2
3.2.18 Llamar función -> callApagarLed3
3.2.19 Llamar función -> callEncenderLed1
3.2.20 Llamar función -> callEncenderLed2
3.2.21 Llamar función -> callEncenderLed3
3.2.22 Llamar función -> callfullTest
3.2.23 Llamar función -> callLCDReset
3.2.24 Llamar función -> callServoBasico
3.2.25 Llamar función -> callServoStop
3.2.26 Llamar función -> callMotoresStop
3.2.27 Llamar función -> callMotoresReversa
3.2.28 Llamar función -> callMotoresAvance
3.2.29 Llamar función -> callMotoresDerecha
3.2.30 Llamar función -> callMotoresIzquierda
3.2.31 Llamar función -> callMotoresBasico
3.2.32 Llamar función -> callMotorABasico
3.2.33 Llamar función -> callMotorBBasico
3.2.34 Llamar función -> called
3.3 Funciones compartidas (wsSocket y consola): Enviar Datos
3.3.1 Función -> Reseteamos el LCD
3.3.2 Función -> pararTodo
3.3.3 Función -> fullTest
3.3.4 Función -> LCDReset
3.3.5 Función -> linea
3.3.6 Función -> vinCheck
3.3.7 Función -> encenderLeds
3.3.8 Función -> encenderLed3 
3.3.9 Función -> encenderLed2 
3.3.10 Función -> encenderLed1
3.3.11 Función -> apagarLeds
3.3.12 Función -> apagarLed1
3.3.13 Función -> apagarLed2
3.3.14 Función -> apagarLed3
3.3.15 Función -> parpadearLeds
3.3.16 Función -> parpadearLed1
3.3.17 Función -> parpadearLed2
3.3.18 Función -> parpadearLed3
3.3.19 Función -> pararLeds
3.3.20 Función -> pararLed1
3.3.21 Función -> pararLed2
3.3.22 Función -> pararLed3
3.3.23 Función -> servoStop
3.3.24 Función -> servoBasico
3.3.25 Función -> potenciometroBasico
3.3.26 Función -> ldrBasico
3.3.27 Función -> motorBBasico 
3.3.27.1 motorBBasico -> variables de tiempo
3.3.27.2 motorBBasico -> motor B atras
3.3.27.3 motorBBasico -> motor B delante
3.3.27.4 motorBBasico -> motor B parado
3.3.28 Función -> motorBAvance 
3.3.29 Función -> motorBReversa 
3.3.30 Función -> motorABasico 
3.3.30.1 motorABasico -> variables de tiempo
3.3.30.2 motorABasico -> motor A atras
3.3.30.3 motorABasico -> motor A delante
3.3.30.4 motorABasico -> motor A parado
3.3.31 Función -> motorAAvance 
3.3.32 Función -> motorAReversa 
3.3.33 Función -> motoresBasico  
3.3.33.1 motoresBasico -> variables de tiempo
3.3.33.2 motoresBasico -> motores atras
3.3.33.3 motoresBasico -> motores delante
3.3.33.4 motoresBasico -> motores parado
3.3.34 Función -> motoresDerecha 
3.3.35 Función -> motoresIzquierda
3.3.36 Función -> motoresAvance 
3.3.37 Función -> motoresReversa 
3.3.38 Función -> motoresStop 
3.3.39 Función -> pulsadorBasico 
3.3.39.1 pulsadorBasico -> hold
3.3.39.2 pulsadorBasico -> press
3.3.39.3 pulsadorBasico -> release
3.3.40 Función -> pulsadorLeds 
3.3.40.1 pulsadorLeds -> hold
3.3.40.2 pulsadorLeds -> press 
3.3.40.3 pulsadorLeds -> release 
3.3.41 Función -> datosSistema 
3.3.41.1 datosSistema -> chequear de Memoria RAM
3.3.41.2 datosSistema -> chequear hostname
3.3.41.3 datosSistema -> chequear uptime
3.3.41.4 datosSistema -> chequear kernel
3.3.41.5 datosSistema -> chequear Top List
3.3.41.6 datosSistema (LOOP) -> chequear de Memoria usada y libre
3.3.41.7 datosSistema (LOOP) -> chequear de Memoria buffer
3.3.41.8 datosSistema (LOOP) -> chequear de Memoria cache
3.3.41.9 datosSistema (LOOP) -> chequear de temperatura CPU
3.3.41.10 datosSistema (LOOP) -> chequear el % de uso de la CPU
3.3.41.11 datosSistema (LOOP) -> chequear uptime
3.3.41.12 datosSistema (LOOP)-> chequear Top List
3.3.42 Función -> printLCD 
3.3.43 Función -> customBlink
3.3.43.1 customBlink -> led1
3.3.43.2 customBlink -> led2
3.3.43.3 customBlink -> led3 

3.4 Estrcutura switch (consola)

*/

/*
  EMPIEZA EL CÓDIGO
*/

/*
  = Parte I - Librerías =
*/

// 1.1 Librería -> Arduino
var five = require("johnny-five");
var board = new five.Board();

// 1.2 Librería -> Websockets
var uri="/index.html";
var fs = require('fs');
var http = require('http');
var socket = require("socket.io");
var os = require( 'os' );

// 1.3 Librería -> Datos del sistema
var fs = require('fs');
var sys = require('util');
var exec = require('child_process').exec, child, child1;

/*
  = Parte II - Variables GLobales =
*/

// 2.1 Globales -> Versión Script
var scriptVersion = "v2.0.0";

// 2.2 Globales -> Dummy
var customBlinkMs = "";
var customBlinkLed = "";
var linea1 = "";
var linea2 = "";
var linea3 = "";
var linea4 = "";

// 2.3 Globales -> Tiempo(ms) para datos del sistema
var fastTime = 2500;    // Ciclo (ms) para medir el uso de la temperatura de la CPU y memoria cached.
var customTime = 6000;  // Ciclo (ms) para medir el uptime.
var slowTime = 5000;    // Ciclo (ms) para medir el uso de la CPU y el top10 procesos.

// 2.4 Globales -> Depuración
var debugMode = true;

// 2.5 Globales -> LCD
var lcdEnable = true;
var LCDLogEnable = true;

// 2.6 Globales -> Websockets
var wsMode = true;

// 2.7 Globales -> Linux Compatible
var linuxCompatible = true;

// 2.8 Globales -> Conectividad (Ip, puerto, etc....)
var networkInterfaces = os.networkInterfaces( );
var IP = "";
var port= 8080;
var loIP = networkInterfaces.lo[0].address
var wlanIP = networkInterfaces.wlan0[0].address

// 3.1.1 Local -> Determinar Adaptador de Red
if (loIP != "127.0.0.1") {
    IP = loIP;
} else if(wlanIP != "127.0.0.1"){
    IP = wlanIP;
} else {
    IP = "error";
    if (debubMode) {
      console.log("Error con la IP!");
    };
};

// 3.1.2 Local -> Desactiva LCD log si LCD esta desactivado
if (!lcdEnable) {
  LCDLogEnable = false;
};


// 3.1.3 Local -> Consola (Bienvenida) 
if (debugMode) {
  console.log("----------------------------------------------");
  console.log("Modo depuración - Activado!");
// 3.1.3.1 Consola -> LcdEnable  
  if (lcdEnable) {
    console.log("(Hardware) - LCD Activado!");
  } else {
    console.log("(Hardware) - LCD desactivado!");    
  };
// 3.1.3.2 Consola -> LCDLogEnable
  if (LCDLogEnable) {
    console.log("Log por LCD - Activado!");
  } else {
    console.log("Log por LCD - Desactivado!");
  };
// 3.1.3.3 Consola -> linuxCompatible
  if (linuxCompatible) {
    console.log("El servidor es Linux compatible");
  } else {
    console.log("AVISO - El servidor no es Linux compatible");    
  };
// 3.1.3.4 Consola -> wsMode
  if (wsMode) {
    console.log("WebSocket Activado - El servidor esta listo");  
    console.log("INFO - Conecta en http://localhost:"+port+" ( http://"+IP+":"+port+" )"); 
  } else {
    console.log("IMPORTANTE - WebSocket Desactivado");  
    console.log("AVISO - Funcionamiento exclusivamente por consola");  
  };

  console.log("----------------------------------------------");
};

// 3.1.4 Local -> Escucha Arduino
board.on("ready", function() {

// 3.1.5 Local -> Arranca el servidor 
if (wsMode) {
  var page = fs.readFileSync(__dirname + uri);
// 3.1.5.1 Servidor -> handler
  function handler(request, response)
  {
    response.write(page);
    response.end();
  }
  var app = http.createServer(function(r, s){ handler(r,s); });
  app.listen(port);
  var listener = socket.listen(app, { log: false });
// 3.1.5.2 Servidor -> wsStart
  function wsStart(socket)
  {
// 3.1.5.3 Servidor -> Apagando todo
    pararTodo(socket);  

/*
  == 3.1.5.4 Servidor -> Primer envio de datos (Información tab)
*/

// 3.1.5.4.1 Primer Envio -> potenciometroValue    
    socket.emit('potenciometroValue', potenciometro.value);
// 3.1.5.4.2 Primer Envio -> ldrValue     
    socket.emit('ldrValue', ldr.value);
// 3.1.5.4.3 Primer Envio -> pulsadorValue          
    socket.emit('pulsadorValue', 'Listo'); 
// 3.1.5.4.4 Primer Envio -> testing    
    socket.emit('testing', 'Connection ready');
// 3.1.5.4.5 Primer Envio -> IP    
    socket.emit('IP', IP);
// 3.1.5.4.6 Primer Envio -> port      
    socket.emit('port', port);
// 3.1.5.4.7 Primer Envio -> debugServer
    if (debugMode) {
      socket.emit('debugServer', 'Activado');
    } else {
      socket.emit('debugServer', 'Desactivado');
    };
// 3.1.5.4.8 Primer Envio -> lcdStatus
    if (lcdEnable) {
      socket.emit('lcdStatus', 'Activado');
    } else {
      socket.emit('lcdStatus', 'Desactivado');
    };
// 3.1.5.4.9 Primer Envio -> LCDLogEnable
    if (LCDLogEnable) {
      socket.emit('LCDLogEnable', 'Activado');
    } else {
      socket.emit('LCDLogEnable', 'Desactivado');
    };
// 3.1.5.4.10 Primer Envio -> linuxCompatible
    if (linuxCompatible) {
      socket.emit('linuxCompatible', 'Linux Compatible');
    } else {
      socket.emit('linuxCompatible', 'Linux NO Compatible');
    };
// 3.1.5.5 Servidor -> Reseteando el LCD
    if (LCDLogEnable) {
      LCDReset();
    };

/* 
  == 3.1.5.6 Servidor -> Envio automatico datos (Información tab) ==
*/

// 3.1.5.6.1 Envio automatico -> potenciometroValue
  potenciometro.scale(0, 1023).on("change", function() {
    if (debugMode) {
    console.log("Potenciometro: "+this.value);
    };
    socket.emit('potenciometroValue', this.value);  
  });
// 3.1.5.6.2.1 pulsadorValue -> hold
  pulsador.on("hold", function() {
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("Pulsador Mantenido  ");
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");
    }; 
    if (debugMode) {
      console.log( "Pulsador mantenido" );
    };
    socket.emit('pulsadorValue', 'Mantenido');
  });
// 3.1.5.6.2.2 pulsadorValue -> press   
  pulsador.on("press", function() {
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("Pulsador presionado ");
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");
    }; 
    if (debugMode) {
      console.log( "Pulsador presionado" );
    };
    socket.emit('pulsadorValue', 'Presionado');   
  });
// 3.1.5.6.2.3 pulsadorValue -> release    
  pulsador.on("release", function() {
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("Pulsador liberado   ");
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");
    };     
    if (debugMode) {
      console.log( "Pulsador liberado" );
    };
    socket.emit('pulsadorValue', 'Liberado');  
  });

// 3.1.5.6.3 Envio automatico -> ldr
  ldr.scale(0, 1023).on("change", function () {
    if (debugMode) {
    console.log("LDR: "+this.value);
    };
    socket.emit('ldrValue', ldr.value);  
  });

/* 
  === 3.2 socket.on(): llamada a funciones ===
*/

// 3.2.1 Llamar función -> callCustomBlink
// 3.2.1.1 callCustomBlink -> MS
    socket.on('customBlinkMs', function(content){
       
      customBlinkMs = content;

      if (debugMode) {
        console.log( "customBlinkMs es "+content+", iniciada via Web!" );
      };

    });
// 3.2.1.2 callCustomBlink -> Led
    socket.on('customBlinkLed', function(content){
       
      customBlinkLed = content;

      if (debugMode) {
        console.log( "customBlinkLed es "+content+", iniciada via Web!" );
      };
    });
// 3.2.1.3 callCustomBlink -> Ejecutar función
    socket.on('callCustomBlink', function () {
      customBlink(socket, customBlinkLed, customBlinkMs);
      if (debugMode) {
        console.log( "Función customBlink iniciada via Web!" );
      };
    });

// 3.2.2 Llamar función -> servo
    socket.on('servo', function (content) {
      servo.to(content);

      if (LCDLogEnable) {
          lcd.clear();
          lcd.cursor(0, 0).print("======= LOG =======");
          lcd.cursor(1, 0).print("Moviendo el servo ");
          lcd.cursor(2, 0).print("a "+content+" grados");
          lcd.cursor(3, 0).print("====================");
      };
      if (debugMode) {
        console.log( "Mover el servo a "+content+"° , iniciado via Web!" );
      };
    });

/* 
  == 3.2.3 Llamar función -> callPrintLCD ==
*/

// 3.2.3.1 callPrintLCD -> lcdLine1
      socket.on('lcdLine1', function(content){
        
        linea1 = content;

        if (debugMode) {
          console.log( "Linea(1) es "+content+", iniciada via Web!" );
        };
      });
// 3.2.3.2 callPrintLCD -> lcdLine2
      socket.on('lcdLine2', function(content){
        
        linea2 = content;

        if (debugMode) {
          console.log( "Linea(2) es "+content+", iniciada via Web!" );
        };
      });
// 3.2.3.3 callPrintLCD -> lcdLine3
      socket.on('lcdLine3', function(content){
        
        linea3 = content;

        if (debugMode) {
          console.log( "Linea(3) es "+content+", iniciada via Web!" );
        };
      });
// 3.2.3.4 callPrintLCD -> lcdLine4
      socket.on('lcdLine4', function(content){
        
        linea4 = content;

        if (debugMode) {
          console.log( "Linea(4) es "+content+", iniciada via Web!" );
        };
      });

// 3.2.3.5 callPrintLCD -> Ejecutar Función
    socket.on('callPrintLCD', function(){
      printLCD(linea1, linea2, linea3, linea4);
      if (debugMode) {
        console.log( "Función printLCD iniciada via Web!" );
      };
    });

// 3.2.4 Llamar función -> callDatosSistema
    socket.on('callDatosSistema', function(){
      datosSistema(socket);
      if (debugMode) {
        console.log( "Función datosSistema iniciada via Web!" );
      };
    });
// 3.2.5 Llamar función -> callPararTodo
    socket.on('callPararTodo', function () {
      // Depuración
      if (debugMode) {
      console.log( "Función pararTodo iniciada via Web!" );
      };
      pararTodo(socket);
    });
// 3.2.6 Llamar función -> callPararLeds
    socket.on('callPararLeds', function(){
      pararLeds(socket);
      if (debugMode) {
        console.log( "Función callPararLeds iniciada via Web!" );
      };
    });
// 3.2.7 Llamar función -> callParpadearLeds
    socket.on('callParpadearLeds', function(){
      parpadearLeds(socket);
      if (debugMode) {
        console.log( "Función callParpadearLeds iniciada via Web!" );
      };
    });  
// 3.2.8 Llamar función -> callApagarLeds
    socket.on('callApagarLeds', function(){
      apagarLeds(socket);
      if (debugMode) {
        console.log( "Función callApagarLeds iniciada via Web!" );
      };
    });   
// 3.2.9 Llamar función -> callEncenderLeds
    socket.on('callEncenderLeds', function(){
      encenderLeds(socket);
      if (debugMode) {
        console.log( "Función callEncenderLeds iniciada via Web!" );
      };
    });
// 3.2.10 Llamar función -> callPararLed1
    socket.on('callPararLed1', function(){
      pararLed1(socket);
      if (debugMode) {
        console.log( "Función callPararLed1 iniciada via Web!" );
      };
    });
// 3.2.11 Llamar función -> callPararLed2    
    socket.on('callPararLed2', function(){
      pararLed2(socket);
      if (debugMode) {
        console.log( "Función callPararLed2 iniciada via Web!" );
      };
    });
// 3.2.12 Llamar función -> callPararLed3
    socket.on('callPararLed3', function(){
      pararLed3(socket);
      if (debugMode) {
        console.log( "Función callPararLed3 iniciada via Web!" );
      };
    });
// 3.2.13 Llamar función -> callParpadearLed1
    socket.on('callParpadearLed1', function(){
      parpadearLed1(socket);
      if (debugMode) {
        console.log( "Función callParpadearLed1 iniciada via Web!" );
      };
    });
// 3.2.14 Llamar función -> callParpadearLed2
    socket.on('callParpadearLed2', function(){
      parpadearLed2(socket);
      if (debugMode) {
        console.log( "Función callParpadearLed2 iniciada via Web!" );
      };
    });
// 3.2.15 Llamar función -> callParpadearLed3
    socket.on('callParpadearLed3', function(){
      parpadearLed3(socket);
      if (debugMode) {
        console.log( "Función callParpadearLed3 iniciada via Web!" );
      };
    });
// 3.2.16 Llamar función -> callApagarLed1
    socket.on('callApagarLed1', function(){
      apagarLed1(socket);
      if (debugMode) {
        console.log( "Función callApagarLed1 iniciada via Web!" );
      };
    });
// 3.2.17 Llamar función -> callApagarLed2
    socket.on('callApagarLed2', function(){
      apagarLed2(socket);
      if (debugMode) {
        console.log( "Función callApagarLed2 iniciada via Web!" );
      };
    });
// 3.2.18 Llamar función -> callApagarLed3
    socket.on('callApagarLed3', function(){
      apagarLed3(socket);
      if (debugMode) {
        console.log( "Función callApagarLed3 iniciada via Web!" );
      };
    });
// 3.2.19 Llamar función -> callEncenderLed1
    socket.on('callEncenderLed1', function(){
      encenderLed1(socket);
      if (debugMode) {
        console.log( "Función callEncenderLed1 iniciada via Web!" );
      };
    });    
// 3.2.20 Llamar función -> callEncenderLed2
    socket.on('callEncenderLed2', function(){
      encenderLed2(socket);
      if (debugMode) {
        console.log( "Función callEncenderLed2 iniciada via Web!" );
      };
    });
// 3.2.21 Llamar función -> callEncenderLed3
    socket.on('callEncenderLed3', function(){
      encenderLed3(socket);
      if (debugMode) {
        console.log( "Función callEncenderLed3 iniciada via Web!" );
      };
    });
// 3.2.22 Llamar función -> callfullTest
    socket.on('callfullTest', function () {
      // Depuración
      if (debugMode) {
      console.log( "Función fullTest iniciada via Web!" );
      };
      fullTest(socket);
    });
// 3.2.23 Llamar función -> callLCDReset
    socket.on('callLCDReset', function(){
      LCDReset(socket);
      if (debugMode) {
        console.log( "Función callLCDReset iniciada via Web!" );
      };
    });
// 3.2.24 Llamar función -> callServoBasico
    socket.on('callServoBasico', function(){
      servoBasico(socket);
      if (debugMode) {
        console.log( "Función callServoBasico iniciada via Web!" );
      };
    });
// 3.2.25 Llamar función -> callServoStop
    socket.on( "callServoStop", function(){
      servoStop(socket);
      if (debugMode) {
        console.log( "Función callServoStop iniciada via Web!" );
      };
    });
// 3.2.26 Llamar función -> callMotoresStop
    socket.on('callMotoresStop', function(){
      motoresStop(socket);
      if (debugMode) {
        console.log( "Función callMotoresStop iniciada via Web!" );
      };
    });
// 3.2.27 Llamar función -> callMotoresReversa
    socket.on('callMotoresReversa', function(){
      motoresReversa(socket);
      if (debugMode) {
        console.log( "Función callMotoresReversa iniciada via Web!" );
      };
    });
// 3.2.28 Llamar función -> callMotoresAvance
    socket.on('callMotoresAvance', function(){
      motoresAvance(socket);
      if (debugMode) {
        console.log( "Función callMotoresAvance iniciada via Web!" );
      };
    });
// 3.2.29 Llamar función -> callMotoresDerecha
    socket.on('callMotoresDerecha', function(){
      motoresDerecha(socket);
      if (debugMode) {
        console.log( "Función callMotoresDerecha iniciada via Web!" );
      };
    });
// 3.2.30 Llamar función -> callMotoresIzquierda
    socket.on('callMotoresIzquierda', function(){
      motoresIzquierda(socket);
      if (debugMode) {
        console.log( "Función callMotoresIzquierda iniciada via Web!" );
      };
    });
// 3.2.31 Llamar función -> callMotoresBasico
    socket.on('callMotoresBasico', function(){
      motoresBasico(socket);
      if (debugMode) {
        console.log( "Función callMotoresBasico iniciada via Web!" );
      };
    });
// 3.2.32 Llamar función -> callMotorABasico
    socket.on('callMotorABasico', function(){
      motorABasico(socket);
      if (debugMode) {
        console.log( "Función callMotorABasico iniciada via Web!" );
      };
    });
// 3.2.33 Llamar función -> callMotorBBasico
    socket.on('callMotorBBasico', function(){
      motorBBasico(socket);
      if (debugMode) {
        console.log( "Función callMotorBBasico iniciada via Web!" );
      };
    });
// 3.2.34 Llamar función -> called
    socket.on('called', function(){  
      // Depuración
      if (debugMode) {
      console.log( "Función called iniciada via Web!" );
      };
    });
  } // Fin- wsStart  

  listener.sockets.on('connection', function (socket) { wsStart(socket);} );
}; 

/*
    Definimos el hardware
*/

/* 
  == 2.9 Globales -> Variables EduBasica (servo, leds, lcd, motores....)
*/

// 2.9.1 Variables EduBasica -> Leds
  var led3 = new five.Led(5);
  var led2 = new five.Led(4);
  var led1 = new five.Led(3);
// 2.9.2 Variables EduBasica -> potenciometro 
  var potenciometro = new five.Sensor("A0");
// 2.9.3 Variables EduBasica -> ldr   
  var ldr = new five.Sensor({
    pin: "A1",
    // valor por defecto es 250ms
    freq: 1000
  });
// 2.9.4 Variables EduBasica -> servo   
  var servo = new five.Servo(7);
 // 2.9.5 Variables EduBasica -> motorA 
  var motorA = new five.Motor({
    pins: {
      pwm: 10,
      dir: 8,
      cdir: 9
    }
  });
// 2.9.6 Variables EduBasica -> motorB  
  var motorB = new five.Motor({
    pins: {
      pwm: 11,
      dir: 12,
      cdir: 13
    }
  });  
// 2.9.7 Variables EduBasica -> pulsador  
  var pulsador = new five.Button(2);
// 2.9.8 Variables EduBasica -> lcd   
  var numberRows = 4;
  var lcd = new five.LCD({
    controller: "LCM1602",
    pins: ["A5", "A4"],
    rows: numberRows,
    cols: 20
  });



/*
  == 3.3 Funciones compartidas (wsSocket y consola): Enviar Datos ==
*/

// 3.3.1 Función -> Reseteamos el LCD
 lcd.useChar("heart");
if (lcdEnable) {
  LCDReset();
};

// 3.3.2 Función -> pararTodo
function pararTodo (socket) {
  motoresStop (socket);
  servoStop (socket);
  pararLeds(socket);
  apagarLeds (socket);
};

// 3.3.3 Función -> fullTest
function fullTest (socket) { 

  ldrBasico(socket);
  servoBasico(socket);
  motoresBasico(socket); 
  pulsadorBasico(socket);
  parpadearLeds(socket);
};

// 3.3.4 Función -> LCDReset
function LCDReset() {
  lcd.clear();
  lcd.cursor(0, 0).print("= EduBasica Shield =");
  lcd.cursor(1, 0).print("...con Nodejs");
  lcd.cursor(2, 0).print("I :heart: Nodebots!");
  lcd.cursor(3, 0).print("====================");
};

// 3.3.5 Función -> linea 
function linea () {
  console.log('---------------------------------');
}

// 3.3.6 Función -> vinCheck 
function vinCheck () {
  console.log('Por favor, revisa que el boton de corriente esta activo!');
};

// 3.3.7 Función -> encenderLeds 
function encenderLeds (socket) {
  led1.on();
  led2.on();
  led3.on();
  if (wsMode) {
    socket.emit('Led1Status', 'Encendido');
    socket.emit('Led2Status', 'Encendido');
    socket.emit('Led3Status', 'Encendido');    
  };
  if (debugMode) {
    console.log('Activado - Encendido Led01');
    console.log('Activado - Encendido Led02');
    console.log('Activado - Encendido Led03');    
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG ========");
    lcd.cursor(1, 0).print("Encendiendo todos ");
    lcd.cursor(2, 0).print("los Leds");
    lcd.cursor(3, 0).print("====================");
  };
};

// 3.3.8 Función -> encenderLed3 
function encenderLed3 (socket) {
  led3.on();
  if (wsMode) {
    socket.emit('Led3Status', 'Encendido');
  };
  if (debugMode) {
    console.log('Activado - Encendido Led03');
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Encendiendo el Led3");
    lcd.cursor(2, 0).print("                   ");
    lcd.cursor(3, 0).print("====================");
  };
};

// 3.3.9 Función -> encenderLed2 
function encenderLed2 (socket) {
  led2.on();
  if (wsMode) {
    socket.emit('Led2Status', 'Encendido');
  };
  if (debugMode) {
    console.log('Activado - Encendido Led02');
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Encendiendo el Led2");
    lcd.cursor(2, 0).print("                   ");
    lcd.cursor(3, 0).print("====================");
  };
};

// 3.3.10 Función -> encenderLed1 
function encenderLed1 (socket) {
  led1.on();
  if (wsMode) {
    socket.emit('Led1Status', 'Encendido');
  };
  if (debugMode) {
    console.log('Activado - Encendido Led01');
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Encendiendo el Led1");
    lcd.cursor(2, 0).print("                   ");
    lcd.cursor(3, 0).print("====================");
  };
};

// 3.3.11 Función -> apagarLeds
function apagarLeds (socket) {
  led1.off();
  led2.off();
  led3.off();
  if (wsMode) {
    socket.emit('Led1Status', 'Apagado');
    socket.emit('Led2Status', 'Apagado');
    socket.emit('Led3Status', 'Apagado');    
  };
  if (debugMode) {
    console.log('Desactivado - Apagado Led01');
    console.log('Desactivado - Apagado Led02');
    console.log('Desactivado - Apagado Led03');    
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG ========");
    lcd.cursor(1, 0).print("Apagando todos los");
    lcd.cursor(2, 0).print("Leds");
    lcd.cursor(3, 0).print("====================");
  };  
};

// 3.3.12 Función -> apagarLed1
function apagarLed1 (socket) {
  led1.off();
  if (wsMode) {
    socket.emit('Led1Status', 'Apagado');
  };
  if (debugMode) {
    console.log('Desactivado - Apagado Led01');    
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Apagando el Led1");
    lcd.cursor(2, 0).print("                   ");
    lcd.cursor(3, 0).print("====================");
  };
};

// 3.3.13 Función -> apagarLed2
function apagarLed2 (socket) {
  led2.off();
  if (wsMode) {
    socket.emit('Led2Status', 'Apagado');
  };
  if (debugMode) {
    console.log('Desactivado - Apagado Led02');    
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Apagando el Led2");
    lcd.cursor(2, 0).print("                   ");
    lcd.cursor(3, 0).print("====================");
  };
};

// 3.3.14 Función -> apagarLed3
function apagarLed3 (socket) {
  led3.off();
  if (wsMode) {
    socket.emit('Led3Status', 'Apagado');
  };
  if (debugMode) {
    console.log('Desactivado - Apagado Led03');    
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Apagando el Led3");
    lcd.cursor(2, 0).print("                   ");
    lcd.cursor(3, 0).print("====================");
  };
};

// 3.3.15 Función -> parpadearLeds
function parpadearLeds (socket) {
  led3.blink();
  led2.blink();
  led1.blink();
  if (wsMode) {
    socket.emit('Led1Status', 'Parpadeo');
    socket.emit('Led1StatusMs', 'a 500ms');
    socket.emit('Led2Status', 'Parpadeo');
    socket.emit('Led2StatusMs', 'a 500ms');
    socket.emit('Led3Status', 'Parpadeo');
    socket.emit('Led3StatusMs', 'a 500ms'); 
  };
  if (debugMode) {
    console.log('Activado - Parpadeo en Led01 a 500ms');
    console.log('Activado - Parpadeo en Led02 a 500ms');
    console.log('Activado - Parpadeo en Led03 a 500ms');
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Parpadeando todos ");
    lcd.cursor(2, 0).print("los Leds a 500ms");
    lcd.cursor(3, 0).print("====================");
  }; 
};

// 3.3.16 Función -> parpadearLed1
function parpadearLed1 (milisegundos, socket) {
  led1.blink(milisegundos);
  if (wsMode) {
    socket.emit('Led1Status', 'Parpadeo');
    socket.emit('Led1StatusMs', 'a '+milisegundos+'ms'); 
  };
  if (debugMode) {
    console.log('Activado - Parpadeo a Led01 a '+milisegundos+'ms');
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Parpadeando el Led1");
    lcd.cursor(2, 0).print("los Leds a "+milisegundos+"ms");
    lcd.cursor(3, 0).print("====================");
  }; 
};

// 3.3.17 Función -> parpadearLed2
function parpadearLed2 (milisegundos, socket) {
  led1.blink(milisegundos);
  if (wsMode) {
    socket.emit('Led2Status', 'Parpadeo');
    socket.emit('Led2StatusMs', 'a '+milisegundos+'ms');      
  };
  if (debugMode) {
      console.log('Activado - Parpadeo en Led01 a '+milisegundos+'ms');
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Parpadeando el Led2");
    lcd.cursor(2, 0).print("los Leds a "+milisegundos+"ms");
    lcd.cursor(3, 0).print("====================");
  }; 
};

// 3.3.18 Función -> parpadearLed3
function parpadearLed3 (milisegundos, socket) {
  led1.blink(milisegundos);
  if (wsMode) {
    socket.emit('Led3Status', 'Parpadeo');
    socket.emit('Led3StatusMs', 'en '+milisegundos+'ms');
  };
  if (debugMode) {
    console.log('Activado - Parpadeo en Led01 a '+milisegundos+'ms');
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Parpadeando el Led3");
    lcd.cursor(2, 0).print("los Leds a "+milisegundos+"ms");
    lcd.cursor(3, 0).print("====================");
  };       
};

// 3.3.19 Función -> pararLeds
function pararLeds (socket) {
  led1.stop().off();
  led2.stop().off();
  led3.stop().off();
  if (wsMode) {
    socket.emit('Led1Status', 'Apagado');
    socket.emit('Led2Status', 'Apagado');
    socket.emit('Led3Status', 'Apagado');    
  };
  if (debugMode) {
    console.log('Desactivado - Fin parpadeo a Led01');
    console.log('Desactivado - Fin parpadeo a Led02');
    console.log('Desactivado - Fin parpadeo a Led03');    
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG ========");
    lcd.cursor(1, 0).print("Apagando todos los");
    lcd.cursor(2, 0).print("Leds");
    lcd.cursor(3, 0).print("====================");
  };
};

// 3.3.20 Función -> pararLed1
function pararLed1 (socket) {
  led1.stop()
  if (wsMode) {
    socket.emit('Led1Status', 'Apagado');
  };
  if (debugMode) {
    console.log('Desactivado - Fin parpadeo a Led01');
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Parando el Led1");
    lcd.cursor(2, 0).print("                    ");
    lcd.cursor(3, 0).print("====================");
  }; 
};

// 3.3.21 Función -> pararLed2
function pararLed2 (socket) {
  led2.stop()
  if (wsMode) {
    socket.emit('Led2Status', 'Apagado');
  };
  if (debugMode) {
    console.log('Desactivado - Fin parpadeo a Led02');
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Parando el Led2");
    lcd.cursor(2, 0).print("                    ");
    lcd.cursor(3, 0).print("====================");
  }; 
};

// 3.3.22 Función -> pararLed3
function pararLed3 (socket) {
  led1.stop()
  if (wsMode) {
    socket.emit('Led3Status', 'Apagado');
  };
  if (debugMode) {
    console.log('Desactivado - Fin parpadeo a Led03');
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Parando el Led3");
    lcd.cursor(2, 0).print("                    ");
    lcd.cursor(3, 0).print("====================");
  }; 
};

var encenderLedVerde = encenderLed1;
var encenderLedNaranja = encenderLed2;
var encenderLedRojo = encenderLed3;

// 3.3.23 Función -> servoStop
function servoStop (socket) {
  servo.stop();
  if (debugMode) {
    console.log("Servo parado...");
  };
  if (wsMode) {
    socket.emit("servoStatus", "Parado");
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Parando el servo");
    lcd.cursor(2, 0).print("                    ");
    lcd.cursor(3, 0).print("====================");
  }; 
};

// 3.3.24 Función -> servoBasico
function servoBasico (socket) {
  servo.sweep();
  if (debugMode) {
    vinCheck();
    console.log("Servo iniciado...");
  };
  if (wsMode) {
    socket.emit("servoStatus", "En funcionamiento");  
  };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG =======");
    lcd.cursor(1, 0).print("Arrancando el servo");
    lcd.cursor(2, 0).print("                    ");
    lcd.cursor(3, 0).print("====================");
  }; 
};

// 3.3.25 Función -> potenciometroBasico
function potenciometroBasico () {
  console.log("Potenciometro iniciado... ");
  console.log("- Mueva el potenciometro para disparar los eventos asociados.");
  potenciometro.scale(0, 1023).on("change", function() {
  console.log("Potenciometro: "+this.value);
  });
};

// 3.3.26 Función -> ldrBasico 
function ldrBasico () {
  console.log("LDR iniciado...");
  ldr.scale(0, 1023).on("change", function() {
  console.log("LDR: "+this.value);
  });
};

// 3.3.27 Función -> motorBBasico 
function motorBBasico (socket) {
// 3.3.27.1 motorBBasico -> variables de tiempo
  var time1 = 5000;
  var time2 = 10000;
  var time3 = 15000;
  if (wsMode) {
    time1 = 0;
    time2 = 5000;
    time3 = 10000;
  };
// 3.3.27.2 motorBBasico -> motor B atras
  board.wait(time1, function() {
    motorB.reverse(255);      
    if (debugMode) {
      console.log("Prueba de ambos motores iniciada...");
      vinCheck();
      console.log("MotorB al reves");
    };
    if (wsMode) {
      socket.emit("MotorBStatus", "En movimiento");
    };
  });
// 3.3.27.3 motorBBasico -> motor B delante  
  board.wait(time2, function() {
    motorB.forward(255);
    if (debugMode) {
      console.log("MotorB avance");
    };
    if (wsMode) {
      socket.emit("MotorBStatus", "En movimiento");
    };
  });
// 3.3.27.4 motorBBasico -> motor B parado  
  board.wait(time3, function() {
    motorB.stop();
    if (debugMode) {
      console.log("MotorB parado");
      console.log("Terminada la prueba de motorB...");
    };
    if (wsMode) {
      socket.emit("MotorBStatus", "Parado");
    };
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("MotorB parado");
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");
    }; 
  });
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG ========");
    lcd.cursor(1, 0).print("MotorB en movimiento");
    lcd.cursor(2, 0).print("                    ");
    lcd.cursor(3, 0).print("====================");
  }; 
};

// 3.3.28 Función -> motorBAvance   
function motorBAvance (socket) {
    motorB.forward();      
    if (debugMode) {
      console.log("MotorB a delante");
    };
    if (wsMode) {
      socket.emit("MotorBStatus", "En movimiento");
    };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG ========");
    lcd.cursor(1, 0).print("MotorB en movimiento");
    lcd.cursor(2, 0).print("                    ");
    lcd.cursor(3, 0).print("====================");
  };  
};

// 3.3.29 Función -> motorBReversa  
function motorBReversa (socket) {
    motorB.reverse();      
    if (debugMode) {
      console.log("MotorB al reves");
    };
    if (wsMode) {
      socket.emit("MotorBStatus", "En movimiento");
    };
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG ========");
    lcd.cursor(1, 0).print("MotorB en movimiento");
    lcd.cursor(2, 0).print("                    ");
    lcd.cursor(3, 0).print("====================");
  };         
};

// 3.3.30 Función -> motorABasico 
function motorABasico (socket) {
// 3.3.30.1 motorABasico -> variables de tiempo
  var time1 = 5000;
  var time2 = 10000;
  var time3 = 15000;
  if (wsMode) {
    time1 = 0;
    time2 = 5000;
    time3 = 10000;
  };
// 3.3.30.2 motorABasico -> motor A atras
  board.wait(time1, function() {
    motorA.reverse(255);      
    if (debugMode) {
      console.log("Prueba de ambos motores iniciada...");
      vinCheck();
      console.log("MotorA al reves");
    };
    if (wsMode) {
      socket.emit("MotorAStatus", "En movimiento");
    };
  });
// 3.3.30.3 motorABasico -> motor A delante
  board.wait(time2, function() {
    motorA.forward(255);
    if (debugMode) {
      console.log("MotorA avance");
    };
    if (wsMode) {
      socket.emit("MotorAStatus", "En movimiento");

    };
  });
// 3.3.30.4 motorABasico -> motor A parado 
  board.wait(time3, function() {
    motorA.stop();
    if (debugMode) {
      console.log("MotorA parado");
      console.log("Terminada la prueba de motorA...");
    };
    if (wsMode) {
      socket.emit("MotorAStatus", "Parado");
    };
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("MotorB parado");
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");
    }; 
  });
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG ========");
    lcd.cursor(1, 0).print("MotorA en movimiento");
    lcd.cursor(2, 0).print("                    ");
    lcd.cursor(3, 0).print("====================");
  }; 
};

// 3.3.31 Función -> motorAAvance  
function motorAAvance (socket) {
    motorA.forward();      
    if (debugMode) {
      console.log("MotorA a delante");
    };
    if (wsMode) {
      socket.emit("MotorAStatus", "En movimiento");
    };
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("MotorA en movimiento");
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");
    };     
};

// 3.3.32 Función -> motorAReversa 
function motorAReversa (socket) {
    motorA.reverse();      
    if (debugMode) {
      console.log("MotorA al reves");
    };
    if (wsMode) {
      socket.emit("MotorAStatus", "En movimiento");
    };
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("MotorA en movimiento");
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");
    };     
};

// 3.3.33 Función -> motoresBasico  
function motoresBasico (socket) {
// 3.3.33.1 motoresBasico -> variables de tiempo
  var time1 = 5000;
  var time2 = 10000;
  var time3 = 15000;
  if (wsMode) {
    time1 = 0;
    time2 = 5000;
    time3 = 10000;
  };
// 3.3.33.2 motoresBasico -> motores atras
  board.wait(time1, function() {
    motorA.reverse(255);      
    motorB.reverse(255);
    if (debugMode) {
      console.log("Prueba de ambos motores iniciada...");
      vinCheck();
      console.log("MotorA y MotorB al reves");
    };
    if (wsMode) {
      socket.emit("MotorAStatus", "En movimiento");
      socket.emit("MotorBStatus", "En movimiento");
    };
  });
// 3.3.33.3 motoresBasico -> motores delante  
  board.wait(time2, function() {
    motorA.forward(255);
    motorB.forward(255);
    if (debugMode) {
      console.log("MotorA y MotorB avance");
    };
    if (wsMode) {
      socket.emit("MotorAStatus", "En movimiento");
      socket.emit("MotorBStatus", "En movimiento");
    };
  });
// 3.3.33.4 motoresBasico -> motores parado 
  board.wait(time3, function() {
    motorA.stop();
    motorB.stop();
    if (debugMode) {
      console.log("MotorA y MotorB parados");
      console.log("Terminada la prueba de motores...");
    };
    if (wsMode) {
      socket.emit("MotorAStatus", "Parado");
      socket.emit("MotorBStatus", "Parado");
    };
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("MotorB parado");
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");
    }; 
  });
  if (LCDLogEnable) {
    lcd.clear();
    lcd.cursor(0, 0).print("======= LOG ========");
    lcd.cursor(1, 0).print("Motores (motorA y B)");
    lcd.cursor(2, 0).print("en movimiento       ");
    lcd.cursor(3, 0).print("====================");
  }; 
};

// 3.3.34 Función -> motoresDerecha 
function motoresDerecha (socket) {
  motorBAvance(socket);
  motorAReversa(socket); 
};

// 3.3.35 Función -> motoresIzquierda
function motoresIzquierda (socket) {
motorBReversa(socket);
motorAAvance(socket);
};

// 3.3.36 Función -> motoresAvance 
function motoresAvance (socket) {
    motorA.forward();
    motorB.forward();
    if (debugMode) {
      console.log("MotorA y MotorB a delante");
    };
    if (wsMode) { 
      socket.emit("MotorAStatus", "En movimiento");
      socket.emit("MotorBStatus", "En movimiento");
    };
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("Motores (motorA y B)");
      lcd.cursor(2, 0).print("en movimiento       ");
      lcd.cursor(3, 0).print("====================");
    };  
};

// 3.3.37 Función -> motoresReversa 
function motoresReversa (socket) { 
    motorA.reverse();      
    motorB.reverse();
    if (debugMode) {
      console.log("MotorA y MotorB al reves");
    };
    if (wsMode) {
      socket.emit("MotorAStatus", "En movimiento");
      socket.emit("MotorBStatus", "En movimiento");
    };
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("Motores (motorA y B)");
      lcd.cursor(2, 0).print("en movimiento       ");
      lcd.cursor(3, 0).print("====================");
    }; 
};

// 3.3.38 Función -> motoresStop 
function motoresStop (socket) { 
    motorA.stop();      
    motorB.stop();
    if (debugMode) {
      console.log("MotorA y MotorB parados");
    };
    if (wsMode) {
      socket.emit("MotorAStatus", "Parado");
      socket.emit("MotorBStatus", "Parado");
    };
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("Motores (motorA y B)");
      lcd.cursor(2, 0).print("parados       ");
      lcd.cursor(3, 0).print("====================");
    }; 
};

// 3.3.39 Función -> pulsadorBasico 
function pulsadorBasico () {
  console.log("Pulsador iniciado...");
  console.log("- Presione el pulsador para disparar los eventos asociados.");
// 3.3.39.1 pulsadorBasico -> hold  
  pulsador.on("hold", function() {
    console.log( "Pulsador mantenido" );
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("Pulsador mantenido");
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");
    };   
  });
// 3.3.39.2 pulsadorBasico -> press 
  pulsador.on("press", function() {
    console.log( "Pulsador presionado" );
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("Pulsador presionado");
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");
    };  
  });
// 3.3.39.3 pulsadorBasico -> release  
  pulsador.on("release", function() {
    console.log( "Pulsador liberado" );
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("Pulsador liberado");
      lcd.cursor(2, 0).print("                    ");
      lcd.cursor(3, 0).print("====================");
    };  
  });
};

// 3.3.40 Función -> pulsadorLeds  
function pulsadorLeds () {
  console.log("Pulsador iniciado...");
  console.log("- Presione el pulsador para disparar los eventos asociados.");
    led3.off();
    led2.off();
    led1.off();
// 3.3.40.1 pulsadorLeds -> hold   
  pulsador.on("hold", function() {
    led3.on();
    led2.on();
    led1.on();
    console.log( "Pulsador mantenido" );
  });
// 3.3.40.2 pulsadorLeds -> press    
  pulsador.on("press", function() {
    led3.off();
    led2.off();
    led1.on();
    console.log( "Pulsador presionado" );
  });
// 3.3.40.3 pulsadorLeds -> release    
  pulsador.on("release", function() {
    led3.on();
    led2.off();
    led1.off();
    console.log( "Pulsador liberado" );
  });
};


// 3.3.41 Función -> datosSistema 
function datosSistema (socket) {
/* 
Partiendo de 
https://github.com/UlisesGascon/raspberrypi-system-info-data-to-firebase/blob/master/app.js
*/


if (linuxCompatible) {

// 3.3.41.1 datosSistema -> chequear de Memoria RAM
    child = exec("egrep --color 'MemTotal' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      memTotal = stdout.replace("\n","");
      if (wsMode) {
        socket.emit('memoryTotal', memTotal); 
      };
    }
  });

// 3.3.41.2 datosSistema -> chequear hostname
    child = exec("hostname", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      var hostname = stdout.replace("\n","");
      if (wsMode) {
        socket.emit('hostname', hostname); 
      }; 
    }
  });
  
// 3.3.41.3 datosSistema -> chequear uptime
    child = exec("uptime | tail -n 1 | awk '{print $1}'", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      var uptime = stdout.replace("\n","");
      if (wsMode) {
        socket.emit('uptime', uptime); 
      }; 
    }
  });

// 3.3.41.4 datosSistema -> chequear kernel
    child = exec("uname -r", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      var kernel = stdout.replace("\n","");
      if (wsMode) {
        socket.emit('kernel', kernel); 
      };  
    }
  });

// 3.3.41.5 datosSistema -> chequear Top List
    child = exec("top -d 0.5 -b -n2 | tail -n 10 | awk '{print $12}'", function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      } else {
      var topControl = 1;
      var res = stdout.split("\n");
        for (r in res) {
          if (res[r] != "") {
            if (wsMode) {
              socket.emit('toplist'+topControl, res[r]);
              topControl++;                       
            }; 
          }
        } 
      }
    });
 
  setInterval(function(){
  // 3.3.41.6 datosSistema (LOOP) -> chequear de Memoria usada y libre
    child1 = exec("egrep --color 'MemFree' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
    if (error == null) {
      memFree = stdout.replace("\n","");      
      memUsed = parseInt(memTotal)-parseInt(memFree);
      percentUsed = Math.round(parseInt(memUsed)*100/parseInt(memTotal));
      percentFree = 100 - percentUsed;

      if (wsMode) {
        socket.emit('memFree', memFree);
        socket.emit('memUsed', memUsed);
        socket.emit('percentUsed', percentUsed);
        socket.emit('percentFree', percentFree);                         
      };  

    } else {
      sendData = 0;
      console.log('exec error: ' + error);
    }
    });

// 3.3.41.7 datosSistema (LOOP) -> chequear de Memoria buffer
    child1 = exec("egrep --color 'Buffers' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
    if (error == null) {
      memBuffered = stdout.replace("\n","");
      percentBuffered = Math.round(parseInt(memBuffered)*100/parseInt(memTotal));

      if (wsMode) {
        socket.emit('memBuffered', memBuffered);
        socket.emit('percentBuffered', percentBuffered);                        
      };  

    } else {
      sendData = 0;
      console.log('exec error: ' + error);
    }
  });

// 3.3.41.8 datosSistema (LOOP) -> chequear de Memoria cache
    child1 = exec("egrep --color 'Cached' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
      if (error == null) {
        memCached = stdout.replace("\n","");
        percentCached = Math.round(parseInt(memCached)*100/parseInt(memTotal));

        if (wsMode) {
          socket.emit('memCached', memCached);
          socket.emit('percentCached', percentCached);                        
        };  

      } else {
        console.log('exec error: ' + error);
      }
    });}, fastTime);

// 3.3.41.9 datosSistema (LOOP) -> chequear de temperatura CPU
  setInterval(function(){
    child = exec("cat /sys/class/thermal/thermal_zone0/temp", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      //For charts we need (X axis) time and (Y axis) temperature.
      var date = new Date().getTime();
      var temp = parseFloat(stdout)/1000;

        if (wsMode) {
          socket.emit('cpuTemp', temp);                       
        };  

    }
  });}, fastTime);

// 3.3.41.10 datosSistema (LOOP) -> chequear el % de uso de la CPU
  setInterval(function(){
    child = exec("top -d 0.5 -b -n2 | grep 'Cpu(s)'|tail -n 1 | awk '{print $2 + $4}'", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      //For charts we need (X axis) time and (Y axis) percentaje.
      var date = new Date().getTime();
      var cpuUsageUpdate = parseFloat(stdout);

        if (wsMode) {
          socket.emit('cpuUsageUpdate', cpuUsageUpdate);                       
        };  
      
    }
  });}, slowTime);

// 3.3.41.11 datosSistema -> chequear uptime
  setInterval(function(){
    child = exec("uptime | tail -n 1 | awk '{print $1}'", function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      } else {
        var uptime = stdout.replace("\n","");

        if (wsMode) {
          socket.emit('uptime', uptime);                       
        }; 

      }
    });}, customTime);
 
// 3.3.41.12 datosSistema -> chequear Top List
  setInterval(function(){
    child = exec("ps aux --width 30 --sort -rss --no-headers | head  | awk '{print $11}'", function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      } else {
      var topControl = 1;
      var res = stdout.split("\n");
        for (r in res) {
          if (res[r] != "") {
            if (wsMode) {
              socket.emit('toplist'+topControl, res[r]);
              topControl++;                       
            }; 
          }
        }
      }   
  });}, slowTime);

};

}; // FIN - datosSistema


// 3.3.42 Función -> printLCD 
function printLCD(linea1, linea2, linea3, linea4) {
  lcd.clear();
  lcd.cursor(0, 0).print(linea1);
  lcd.cursor(1, 0).print(linea2);
  lcd.cursor(2, 0).print(linea3);
  lcd.cursor(3, 0).print(linea4);
};


// 3.3.43 Función -> customBlink
function customBlink (socket, customBlinkLed, customBlinkMs){
// 3.3.43.1 customBlink -> led1
  if ( customBlinkLed == "led1" ) {   
    led1.blink(customBlinkMs);
    if (wsMode) {
      socket.emit('Led1Status', 'Parpadeo');
      socket.emit('Led1StatusMs', 'a '+customBlinkMs+'ms');
    };
    if (debugMode) {
      console.log("Activado - Parpadeo Led01 a "+customBlinkMs+"ms");
    };
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("Parpadeo Led01");
      lcd.cursor(2, 0).print(" a "+customBlinkMs+"ms");
      lcd.cursor(3, 0).print("====================");
    };
// 3.3.43.2 customBlink -> led2
  } else if( customBlinkLed == "led2" ){
    led2.blink(customBlinkMs);
    if (wsMode) {
      socket.emit('Led2Status', 'Parpadeo');
      socket.emit('Led2StatusMs', 'a '+customBlinkMs+'ms');
    };
    if (debugMode) {
      console.log("Activado - Parpadeo Led02 a "+customBlinkMs+"ms");
    };
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("Parpadeo Led02");
      lcd.cursor(2, 0).print(" a "+customBlinkMs+"ms");
      lcd.cursor(3, 0).print("====================");
    };    
// 3.3.43.3 customBlink -> led3    
  } else if( customBlinkLed == "led3" ){
    led3.blink(customBlinkMs);
    if (wsMode) {  
      socket.emit('Led3Status', 'Parpadeo');
      socket.emit('Led3StatusMs', 'a '+customBlinkMs+'ms'); 
    };
    if (debugMode) {
      console.log("Activado - Parpadeo Led03 a "+customBlinkMs+"ms");
    };
    if (LCDLogEnable) {
      lcd.clear();
      lcd.cursor(0, 0).print("======= LOG ========");
      lcd.cursor(1, 0).print("Parpadeo Led03");
      lcd.cursor(2, 0).print(" a "+customBlinkMs+"ms");
      lcd.cursor(3, 0).print("====================");
    };
    
  } else {
     console.log("ERROR - Fallo en IfElse de customBlinkLed, valor igual a "+customBlinkLed);
    return
  };
};


/* 
  == 3.4 Estrcutura switch (consola) == 
*/

if (!wsMode) {

   var myArgs = process.argv.slice(2);
 console.log('Comando: ', myArgs);
 ayuda = 'Más información disponible en Github. https://github.com/UlisesGascon/edubasica';
 
 switch (myArgs[0]) {
   case 'ayuda':

      if(lcdEnable){
        //lcd.display();
      
      } else {
        lcd.noDisplay();
      };

      linea();   
      console.log(ayuda);
      linea();    
    break;
   case 'encenderLeds':
      linea();
      console.log('Encendiendo todos los Leds...');   
      encenderLeds();
      linea();
    break;
   case 'parpadearLeds':
      linea();   
      console.log('Iniciando el parpadeo de todos los Leds...');    
      parpadearLeds();
      linea();    
    break;
   case 'encenderLed1':
      linea();   
      console.log('Encendiendo el led verde (Led1)');    
      encenderLed1();
      linea();    
    break;
   case 'encenderLedVerde':
      linea();   
      console.log('Encendiendo el led verde (Led1)');    
      encenderLedVerde();
      linea();    
    break;
   case 'encenderLed2':
      linea();   
      console.log('Encendiendo el led naranja (Led2)');    
      encenderLed2();
      linea();    
    break;
   case 'encenderLedNaranja':
      linea();   
      console.log('Encendiendo el led naranja (Led2)');    
      encenderLedNaranja();
      linea();    
    break;
   case 'encenderLed3':
      linea();   
      console.log('Encendiendo el led rojo (Led3)');    
      encenderLed3();
      linea();    
    break;
   case 'encenderLedRojo':
      linea();   
      console.log('Encendiendo el led rojo (Led3)');    
      encenderLedRojo();
      linea();    
    break;
   case 'potenciometro':
      linea();   
      console.log('Iniciando solo la lectura del potenciometro...');    
      potenciometroBasico();
      linea();    
    break;
   case 'ldr':
      linea();   
      console.log('Iniciando solo la lectura del LDR...');    
      ldrBasico();
      linea();    
    break;
   case 'servo':
      linea();   
      console.log('Iniciando el servo y ajustando el bucle...');    
      servoBasico();
      linea();    
    break;
   case 'motores':
      linea();   
      console.log('Iniciando ambos motores y ajustando la secuencia...');    
      motoresBasico();
      linea();    
    break;    
   case 'motoresAvance':
      linea();   
      console.log('Iniciando ambos motores hacia delante...');    
      motoresAvance();
      linea();    
    break;                                
   case 'motoresReversa':
      linea();   
      console.log('Iniciando ambos motores hacia atras...');    
      motoresReversa();
      linea();    
    break;
   case 'motorA':
      linea();   
      console.log('Iniciando el motorA y ajustando la secuencia...');    
      motorABasico();
      linea();    
    break;    
   case 'motorAAvance':
      linea();   
      console.log('Iniciando el motorA hacia delante...');    
      motorAAvance();
      linea();    
    break;                                
   case 'motorAReversa':
      linea();   
      console.log('Iniciando el motorA hacia atras...');    
      motorAReversa();
      linea();    
    break;
   case 'motorB':
      linea();   
      console.log('Iniciando el motorB y ajustando la secuencia...');    
      motorBBasico();
      linea();    
    break;    
   case 'motorBAvance':
      linea();   
      console.log('Iniciando el motorB hacia delante...');    
      motorBAvance();
      linea();    
    break;                                
   case 'motorBReversa':
      linea();   
      console.log('Iniciando el motorB hacia atras...');    
      motorBReversa();
      linea();    
    break;    
   case 'pulsadorLeds':
      linea();   
      console.log('Iniciando la lectura del pulsador y su reflejo en los leds...');    
      pulsadorLeds();
      linea();    
    break;
   case 'pulsador':
      linea();   
      console.log('Iniciando solo la lectura del pulsador...');    
      pulsadorBasico();
      linea();    
    break;
   default:
      linea();     
      console.log("Iniciando el Test total por defecto...");
      fullTest();
      linea();             
 };

}; // FIN de IF (switch)


}); // FIN de Board
// FIN DEL CÓDIGO