// Arreglo de objetos basado en tu código original
const preguntas = [
  {
    pregunta: "¿Qué placa de hardware abierto está basada en el microcontrolador ATmega328P y se usa en robótica?",
    correcta: "Arduino Uno",
    opciones: ["Arduino Uno", "Arduino Mega", "ESP32", "Pulsador"]
  },
  {
    pregunta: "¿Qué placa de desarrollo está basada específicamente en el microcontrolador ATmega2560?",
    correcta: "Arduino Mega",
    opciones: ["Arduino Mega", "Arduino Nano", "LED", "DFPlayer Mini"]
  },
  {
    pregunta: "¿Qué placa de desarrollo es pequeña, económica y también usa el ATmega328P?",
    correcta: "Arduino Nano",
    opciones: ["Arduino Nano", "Arduino Uno", "Potenciómetro", "Impresora Térmica"]
  },
  {
    pregunta: "¿Qué familia de microcontroladores de bajo coste incluye Wi-Fi y Bluetooth integrados?",
    correcta: "ESP32",
    opciones: ["ESP32", "Arduino Mega", "Sensor Humedad", "LED"]
  },
  {
    pregunta: "¿Qué componente semiconductor transforma la corriente eléctrica directamente en luz?",
    correcta: "LED",
    opciones: ["LED", "Pulsador", "Potenciómetro", "Arduino Uno"]
  },
  {
    pregunta: "¿Qué interruptor electromecánico permite o interrumpe el paso de la corriente eléctrica?",
    correcta: "Pulsador",
    opciones: ["Pulsador", "LED", "DFPlayer Mini", "Sensor Humedad"]
  },
  {
    pregunta: "¿Qué componente electrónico tiene la función de actuar como una resistencia variable?",
    correcta: "Potenciómetro",
    opciones: ["Potenciómetro", "Arduino Nano", "Impresora Térmica", "ESP32"]
  },
  {
    pregunta: "¿Qué instrumento se encarga de medir el contenido de agua en la tierra?",
    correcta: "Sensor Humedad",
    opciones: ["Sensor Humedad", "Pulsador", "Arduino Mega", "LED"]
  },
  {
    pregunta: "¿Qué módulo compacto se utiliza para la reproducción de archivos de audio MP3?",
    correcta: "DFPlayer Mini",
    opciones: ["DFPlayer Mini", "Impresora Térmica", "Arduino Uno", "Potenciómetro"]
  },
  {
    pregunta: "¿Qué dispositivo imprime texto aplicando directamente calor sobre papel termosensible?",
    correcta: "Impresora Térmica",
    opciones: ["Impresora Térmica", "DFPlayer Mini", "Sensor Humedad", "Arduino Nano"]
  }
];

// Variables de estado utilizando 'let' y 'const' (página 3 de tu JS.pdf)
let preguntasMezcladas = [];
let indiceActual = 0;
let puntaje = 0;

// Vinculación con los elementos del DOM (página 7 de tu JS.pdf)
let elPregunta = document.getElementById("pregunta");
let elOpciones = document.getElementById("opciones");
let elSiguiente = document.getElementById("siguiente");
let elResultado = document.getElementById("resultado");

// Función para desordenar las preguntas aleatoriamente
function mezclarPreguntas() {
  let lista = [...preguntas];
  // Algoritmo de ordenamiento aleatorio usando Math.random()
  preguntasMezcladas = lista.sort(function() { 
    return Math.random() - 0.5; 
  });
}

// Función principal que inicia el cuestionario en la misma pantalla
function iniciarQuiz() {
  mezclarPreguntas();
  indiceActual = 0;
  puntaje = 0;
  elResultado.innerText = "";
  elSiguiente.style.display = "none";
  elSiguiente.innerText = "Siguiente";
  
  mostrarPregunta();
}

// Muestra la pregunta en el div correspondiente
function mostrarPregunta() {
  elOpciones.innerHTML = ""; // Limpiamos opciones previas
  elSiguiente.style.display = "none";

  let juegoActual = preguntasMezcladas[indiceActual];
  
  // Modificamos el texto del HTML usando innerText (página 8 de tu JS.pdf)
  elPregunta.innerText = (indiceActual + 1) + ". " + juegoActual.pregunta;

  // Mezclamos las opciones de la pregunta actual
  let opcionesMezcladas = [...juegoActual.opciones].sort(function() { 
    return Math.random() - 0.5; 
  });

  // Ciclo FOR clásico para renderizar los botones en pantalla (página 2 de tu JS.pdf)
  for (let i = 0; i < opcionesMezcladas.length; i++) {
    let opcionTexto = opcionesMezcladas[i];
    
    // Creamos los botones dinámicamente usando el contenedor e innerHTML
    elOpciones.innerHTML += "<button class='btn-opcion' onclick='verificarRespuesta(this, \"" + juegoActual.respuesta + "\")'>" + opcionTexto + "</button>";
  }
}

// Valida la opción o el botón presionado por el usuario
function verificarRespuesta(botonElegido, respuestaCorrecta) {
  // Deshabilitamos los botones de las opciones para que no vuelva a marcar
  let botones = elOpciones.getElementsByTagName("button");
  for (let i = 0; i < botones.length; i++) {
    botones[i].disabled = true;
  }

  // Lógica de comparación .toLowerCase() extraída de tu script original (página 2 de tu JS.pdf)
  let textoUsuario = botonElegido.innerText.toLowerCase();
  let textoCorrecto = respuestaCorrecta.toLowerCase();

  if (textoUsuario === textoCorrecto) {
    botonElegido.style.backgroundColor = "#2ecc71"; // Estilo verde si es correcto
    botonElegido.style.color = "white";
    puntaje++;
  } else {
    botonElegido.style.backgroundColor = "#e74c3c"; // Estilo rojo si falla
    botonElegido.style.color = "white";
    
    // Buscamos cuál era el botón correcto para iluminarlo en verde
    for (let i = 0; i < botones.length; i++) {
      if (botones[i].innerText.toLowerCase() === textoCorrecto) {
        botones[i].style.backgroundColor = "#2ecc71";
        botones[i].style.color = "white";
      }
    }
  }

  // Hacemos visible el botón siguiente modificando su propiedad display (Teoría JS.pdf)
  elSiguiente.style.display = "inline-block";
}

// Evento disparador del botón siguiente usando addEventListener (página 8 de tu JS.pdf)
elSiguiente.addEventListener("click", function() {
  indiceActual++;

  // Condicional de control de flujo IF / ELSE (página 2 de tu JS.pdf)
  if (indiceActual < preguntasMezcladas.length) {
    mostrarPregunta();
  } else {
    // --- PANTALLA DE CIERRE DEL JUEGO ---
    elPregunta.innerText = "¡Quiz Completado! 🧠🎉";
    elOpciones.innerHTML = ""; // Limpiamos la zona de juego
    elSiguiente.style.display = "none"; // Ocultamos el botón Siguiente común
    
    // Mostramos el puntaje acumulado
    elResultado.innerText = "Tu puntaje final es de: " + puntaje + " / " + preguntasMezcladas.length;

    // Inyectamos los dos botones finales solicitados usando la teoría de etiquetas de HTML.pdf
    elOpciones.innerHTML = 
      "<button class='btn-final' id='btn-reiniciar'>Volver a jugar</button>" +
      "<a href='Tp_01.html'><button class='btn-final' id='btn-inicio'>Ir al Inicio</button></a>";

    // Asignamos la acción de reiniciar al botón recién creado
    document.getElementById("btn-reiniciar").addEventListener("click", function() {
      iniciarQuiz();
    });
  }
});

// Iniciador automático cuando el documento carga por completo
window.addEventListener("load", function() {
  iniciarQuiz();
});