# Practica nº1 del [Curso Arduino Avanzado 3ed](http://cevug.ugr.es/arduino_avanzado/)
##### por Ulises Gascón

### Descripción

En esta práctica el objetivo es que los leds se apaguen, enciendan o parpadeen en función del valor del potenciómetro.
Se incluye una función para depurar, que se puede habilitar o deshabilitar.


### Lógica

- Si el valor del potenciómetro es menor o igual a 100 -> Se apagan los leds.
- Si el valor del potenciómetro es menor o igual a 400 -> Solo Led verde encendido.
- Si el valor del potenciómetro es menor o igual a 700 -> Solo el Led rojo apagado.
- Si el valor del potenciómetro es menor o igual a 1000 -> Se apagan los leds.
- Si el valor del potenciómetro esta entre 1001 y 1023 -> Parpadean los leds 
  (el tiempo entre parpadeos es el mismo valor que el potenciometro).
- Si debugMode es verdadero, se envia un mensaje cada x tiempo (x = debugDelay(ms))


### Extra

**Modo Debug.** Imprime información por consola. Solo es necesario cambiar el valor booleano de debugMode
**Nota:** *Se activa automáticamente si se detecta un valor fuera de rango en el potenciómetro (cualquier rango negativo o mayor que 1023).*


### Hardware necesario

- **x1** Placa Arduino
- **x1** Potenciometro *(Pin A0)*
- **x3** Led *(Pin 3, 4 y 5)*
- **x3** Resistencias *220ohm 5%tol*


### Circuito

**Protoboard**

***
![Protoboard](https://github.com/UlisesGascon/Arduino-Avanzado-CEVUG./blob/master/practica01/practica01_Protoboard.png)


**Esquema**

***
![Esquema](https://github.com/UlisesGascon/Arduino-Avanzado-CEVUG./blob/master/practica01/practica01_Esquema.png)


**PBC**

***
![PBC](https://github.com/UlisesGascon/Arduino-Avanzado-CEVUG./blob/master/practica01/practica01_PCB.png)