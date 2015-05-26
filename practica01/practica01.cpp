/*
Curso Arduino Avanzado 3ed
Practica 1
Alumno: Ulises Gascón
*/

/*
Descripción:

En esta práctica el objetivo es que los leds se apaguen, enciendan o parpadeen en función del valor del potenciómetro.
Se incluye una función para depurar, que se puede habilitar o deshabilitar.

Lógica:
- Si el valor del potenciómetro es menor o igual a 100 -> Se apagan los leds.
- Si el valor del potenciómetro es menor o igual a 400 -> Solo Led verde encendido.
- Si el valor del potenciómetro es menor o igual a 700 -> Solo el Led rojo apagado.
- Si el valor del potenciómetro es menor o igual a 1000 -> Se apagan los leds.
- Si el valor del potenciómetro esta entre 1001 y 1023-> Parpadean los leds 
  (el tiempo entre parpadeos es el mismo valor que el potenciometro).
- Si debugMode es verdadero, se envia un mensaje cada x tiempo (x = debugDelay(ms))

Extra: 
Modo Debug. Imprime información por consola. Solo es necesario cambiar el valor booleano de debugMode
Nota -> Se activa automáticamente si se detecta un valor fuera de rango en el potenciómetro (cualquier rango negativo o mayor que 1023).

Hardware necesario:
- Placa Arduino [x1]
- Potenciometro [x1] (Pin A0)
- Led [x3] (Pin 3, 4 y 5)
- Resistencias 220ohm 5%tol [x3]
*/

// Definiendo los leds y potenciometro
int ledGreen = 3;
int ledOrange = 4;
int ledRed = 5;
int potenciometro = 0;

// Parámetros del depurador
bool debugMode = false;
int debugDelay = 450;


void setup() {
   //Activando los pins 
   pinMode(ledGreen, OUTPUT);
   pinMode(ledOrange, OUTPUT);
   pinMode(ledRed, OUTPUT);
   //Activando la comunicación Serial
   Serial.begin(9600);
   Serial.println("Comunicación establecida con exito");
   
   //Comprobando el estado del depurador.
   if (debugMode == true)
    {
        Serial.println("Modo depuración activado. Empezando transmisión de datos.");
    }
   else {
        Serial.println("Modo depuración desactivado. No se espera transmisión de datos.");
   }
}

void loop() { 
if (analogRead(potenciometro) <= 100) //Valor menor o igual a 100
 {  
    //Apaga todos los leds
 	digitalWrite(ledGreen, LOW);
 	digitalWrite(ledOrange, LOW);
 	digitalWrite(ledRed, LOW);
    // Debug por consola
    if (debugMode == true)
    {
    Serial.println("Valor del potenciometro: " + String(analogRead(potenciometro)) + " - Todos los Leds apagados.");
	delay(debugDelay);
    } 	 	
 }
else if (analogRead(potenciometro) <= 400)  //Valor menor o igual a 400
 {
    // Enciende solo el led verde.
 	digitalWrite(ledGreen, HIGH);
 	digitalWrite(ledOrange, LOW);
 	digitalWrite(ledRed, LOW);
    // Debug por consola
    if (debugMode == true)
    {
    Serial.println("Valor del potenciometro: " + String(analogRead(potenciometro)) + " - Solo el Led Verde encendido.");
	delay(debugDelay);
    } 	 	
 }
 else if (analogRead(potenciometro) <= 700)  //Valor menor o igual a 700 
 {
    // Enciende todos menos el led rojo.
 	digitalWrite(ledGreen, HIGH);
 	digitalWrite(ledOrange, HIGH);
 	digitalWrite(ledRed, LOW);
    // Debug por consola
    if (debugMode == true)
    {
    Serial.println("Valor del potenciometro: " + String(analogRead(potenciometro)) + " - Solo el Led Rojo apagado.");
	delay(debugDelay);
    } 	
 }	
else if (analogRead(potenciometro) <= 1000)  //Valor menor o igual a 1000 
 {
    // Enciende todos los leds.
 	digitalWrite(ledGreen, HIGH);
 	digitalWrite(ledOrange, HIGH);
 	digitalWrite(ledRed, HIGH);
    // Debug por consola
    if (debugMode == true)
    {
    Serial.println("Valor del potenciometro: " + String(analogRead(potenciometro)) + " - Todo encendido.");
	delay(debugDelay);
    }
 }
 else if (analogRead(potenciometro) >= 1001 && analogRead(potenciometro) <= 1023)  //Valor entre 1001 y 1023
 {
 	// Parpadeo en función del valor del potenciometro.
 	digitalWrite(ledGreen, HIGH);
 	digitalWrite(ledOrange, HIGH);
 	digitalWrite(ledRed, HIGH);
	delay(analogRead(potenciometro));
	digitalWrite(ledGreen, LOW);
 	digitalWrite(ledOrange, LOW);
 	digitalWrite(ledRed, LOW);
    delay(analogRead(potenciometro));
    // Debug por consola
    if (debugMode == true)
    {
    Serial.println("Valor del potenciometro: " + String(analogRead(potenciometro)) + " - Parpadeo iniciado");
    delay(debugDelay);
    }

 }
else
 {
   // Aviso en caso de error (valor negativo o mayor que 1023)
   Serial.println("ERROR! ERROR! Valor del potenciometro " + String(analogRead(potenciometro)) + " fuera de rango.");
   // Fuerza la activación del modo depuración
   debugMode = true;
   Serial.println("AVISO! AVISO! Modo depuración activado automáticamente");
   delay(200); // Retraso de 200ms para facilitar la lectura en la consola (opcional)
 } 
}
