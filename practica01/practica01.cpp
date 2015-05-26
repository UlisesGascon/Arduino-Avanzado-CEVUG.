/*
Curso Arduino Avanzado 3ed
Practica 1
Alumno: Ulises Gascón
*/

int ledGreen = 3;
int ledOrange = 4;
int ledRed = 5;

int potenciometro = 0;

int debugMode = true;
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