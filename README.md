# Escuela Colombiana de Ingeniería  
## Arquitecturas de Software - ARSW  
### Escalamiento en Azure con Máquinas Virtuales, Scale Sets y Service Plans  

**Autor:** Daniel Ricardo Ruge Gómez

---

# Parte 0 – Entendiendo el escenario de calidad

## Creación de recursos

![alt text](images/creacion.png)

## Instalación de la extensión para Visual Studio Code

![alt text](images/extencion.png)

## Despliegue de la función

![alt text](images/despliegue.png)

![alt text](images/despliegue2.png)

## Pruebas de funcionamiento

![alt text](images/prueba.png)

![alt text](images/prueba2.png)

---

# Ejecución concurrente con Newman

Se modificó la colección de Postman para permitir el envío de **10 peticiones concurrentes** utilizando Newman.

![alt text](images/run.png)

![alt text](image.png)

---

# Nueva función: Fibonacci recursivo con memoization (Node.js)



## Conclusiones

Al probar la función recursiva con memoization con los valores 1000, 10000 y 50000, se observó que para 1000 y 10000 el tiempo de ejecución fue prácticamente inmediato, gracias a que cada valor se calcula una sola vez y luego se reutiliza mediante memoization.

Para el caso de 50000, la función sigue siendo más eficiente que la recursiva tradicional, pero puede presentar riesgos de desbordamiento de pila o un consumo elevado de memoria debido a la profundidad de las llamadas recursivas y al tamaño de los números manejados.

---

## Preguntas

### 1. ¿Qué es un Azure Function?

Azure Function es un servicio de Microsoft Azure que permite ejecutar código sin necesidad de administrar servidores, utilizando un modelo basado en eventos. Azure se encarga de:

- Asignar máquinas  
- Escalar automáticamente  
- Ejecutar el código bajo demanda  
- Cobrar solo por el uso real  

### 2. ¿Qué es serverless?

Serverless es un modelo de computación donde no administras servidores directamente. Implica que:

- No configuras hardware  
- No haces mantenimiento  
- No pagas por tiempo ocioso  
- El proveedor escala automáticamente  

Las Azure Functions operan bajo este modelo.

### 3. ¿Qué es el runtime y qué implica seleccionarlo?

El runtime es el entorno de ejecución donde correrán las funciones, como:

- Node.js  
- .NET  
- Python  
- Java  
- PowerShell  

Seleccionarlo implica que:

- Defines el lenguaje y su versión para la Function App.  
- Todos los archivos generados deben seguir ese formato.  
- Cambiarlo después no es posible (requiere crear otra Function App).  

### 4. ¿Por qué es necesario crear un Storage Account junto con una Function App?

Porque Azure Functions depende del Storage para operar. Se usa para:

- Guardar logs  
- Manejar triggers (colas, timers, blobs)  
- Sincronizar funciones durante escalamiento  
- Registrar estados internos  

Sin un Storage Account, una Function App no puede crearse ni funcionar.

### 5. Tipos de planes para una Function App

#### A) Consumption Plan (por consumo)

**Ventajas:**

- Más económico: pagas solo por ejecución.  
- Autoescalado completo.  
- Ideal para cargas irregulares.  

**Desventajas:**

- Cold start.  
- Tiempo máximo por ejecución (10–30 min).  
- No controlas infraestructura.  

#### B) Premium Plan

**Ventajas:**

- Sin cold start.  
- Tiempo de ejecución ilimitado.  
- Redes privadas y escalado avanzado.  

**Desventajas:**

- Mayor costo.  
- Pagas incluso sin tráfico.  

#### C) App Service Plan

**Ventajas:**

- Sin límites de tiempo.  
- Funciones corren en una VM dedicada.  
- Útil si ya existe un App Service.  

**Desventajas:**

- No es serverless.  
- Pagas 24/7.  
- Mayor mantenimiento.  

### 6. ¿Por qué la memoization falla o no funciona correctamente?

La memoization de Fibonacci puede fallar por:

**A) Recursión demasiado profunda**  
Para n = 50 000 existe riesgo de stack overflow.

**B) Números muy grandes**  
Fibonacci(50k) tiene más de 10 000 dígitos. BigInt consume mucha memoria.

**C) Uso excesivo de memoria**  
Guardar miles de BigInts puede consumir cientos de MB.

**D) JavaScript no optimiza recursión profunda**  
No usa tail-call optimization en Azure Functions.

### 7. ¿Cómo funciona la facturación de una Function App?

Depende del plan elegido.

#### Consumption Plan
Se cobra por:

- Número de ejecuciones  
- Tiempo de ejecución  
- Memoria consumida  

Incluye 1 millón de ejecuciones gratis por mes.

#### Premium Plan

- Se cobra por instancias precalentadas por hora.  
- También por tiempo de ejecución extra.  

#### App Service Plan

- Se cobra por la VM completa, sin importar cuántas funciones corran.  

---

## Informe — versión lista para entrega

### ¿Qué es un Azure Function?

Servicio serverless que ejecuta código bajo demanda sin administrar servidores. Azure maneja aprovisionamiento, escalamiento y mantenimiento.

### ¿Qué es serverless?

Un modelo donde la infraestructura está completamente abstraída y el usuario paga solo por ejecución real. El proveedor escala según la carga automática.

### ¿Qué es el runtime?

El entorno donde se ejecutan las funciones (Node.js, .NET, Python, Java). Todas las funciones dentro de una Function App deben usar ese runtime.

### ¿Por qué se necesita un Storage Account?

Es obligatorio para logs, triggers, sincronización de escalado y almacenamiento interno. Sin él, una Function App no puede funcionar.

### Tipos de planes

- **Consumption Plan:** pago por uso, autoescalado, posibles cold starts.  
- **Premium Plan:** instancias calientes, sin límite de tiempo, mayor costo.  
- **App Service Plan:** VM dedicada, no serverless, pagas 24/7.  

### ¿Por qué puede fallar la memoization?

Por recursión profunda, uso elevado de BigInt, demasiada memoria y falta de optimización del lenguaje.

### Facturación

- **Consumption:** cobra por ejecución, tiempo y memoria.  
- **Premium/App Service:** cobra por instancias o máquinas completas.  

