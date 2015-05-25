/*
Curso Arduino Avanzado 3ed
Francisco Jose Martinez Marcos

Propuesta N1 del Tema 1 del curso: Repaso de Programacion Arduino
Alumno: Ulises Gascón
*/

int led3 = 3;  
int potenciometro = 0; 		

void setup() { 
   pinMode(led3, OUTPUT); 	// Declara el LED3 como de salida
   Serial.begin(9600);  	// Comunicación Serial
}

void loop() { 
   digitalWrite(led3, HIGH);								// Enciende LED3 
   delay(analogRead(potenciometro));							// Lee el valor
   Serial.println("Valor del potenciometro: " + String(analogRead(potenciometro))); 	// Muestra el valor por consola
   digitalWrite(led3, LOW);								// Apaga LED3 
   delay(analogRead(potenciometro)); 	 						// Lee el valor de nuevo
   Serial.println("Valor del potenciometro: " + String(analogRead(potenciometro)));	// Muestra el valor por consola 
} 
