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
- Si el valor del potenciometro es menor o igual a 100 -> Se apagan los leds.

- Si el valor del potenciometro es menor o igual a 400 -> Solo Led verde encendido.

- Si el valor del potenciometro es menor o igual a 700 -> Solo el Led rojo apagado.

- Si el valor del potenciometro es menor o igual a 1000 -> Se apagan los leds.

- Si el valor del potenciometro es mayor o igual a 1001 -> Parpadean los leds 
(el tiempo entre parpadeos es el mismo valor que el potenciometro).

- Si debugMode es true, se envia el status cada x tiempo (x = debugDelay)

Extra: Modo Debug. Imprime información por consola. Solo es necesario cambiar el valor booleano de debugMode

Hardware necesario:
- Potenciometro x1 (Pin A0)
- Led x3 (Pin 3, 4 y 5)
*/

int ledGreen = 3;
int ledOrange = 4;
int ledRed = 5;

int potenciometro = 0;

bool debugMode = false;
int debugDelay = 1000;


void setup() { 
   pinMode(ledGreen, OUTPUT);
   pinMode(ledOrange, OUTPUT);
   pinMode(ledRed, OUTPUT);
   Serial.begin(9600);
   Serial.println("Comunicación establecida con exito");
}

void loop() { 
if (analogRead(potenciometro) <= 100)
 {
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
else if (analogRead(potenciometro) <= 400)
 {
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
 else if (analogRead(potenciometro) <= 700)
 {
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
else if (analogRead(potenciometro) <= 1000)
 {
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
 else if (analogRead(potenciometro) >= 1001)
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
   Serial.println("ERROR! ERROR! Valor del potenciometro " + String(analogRead(potenciometro)) + " fuera de lo esperado.");
 } 
}
