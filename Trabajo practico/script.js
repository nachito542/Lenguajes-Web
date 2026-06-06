
const contenedores = document.querySelectorAll(".contenedor");

contenedores.forEach(contenedor => {

const capa = contenedor.querySelector(".arduino");

contenedor.addEventListener("mouseenter", () => {
capa.style.height = "100%";
});

contenedor.addEventListener("mouseleave", () => {
capa.style.height = "0%";
});

});

window.onload = function () {

    const imagenes = document.querySelectorAll("img");

    imagenes.forEach(function(imagen){

        imagen.addEventListener("click", function(e){

            e.preventDefault(); // Detiene la redirección inmediata del enlace <a>

            // Capturamos el contenedor directo de la imagen (el <div>)
            const contenedor = imagen.parentElement;

            // Buscamos el enlace <a> que está envolviendo a todo el bloque
            // Subimos un nivel más para encontrar el elemento que tiene el atributo .href
            const enlaceElemento = contenedor.parentElement;
            const link = enlaceElemento.href;

            // Eliminar capa anterior si ya existiera dentro de este contenedor
            const anterior = contenedor.querySelector(".arduino");
            if(anterior){
                anterior.remove();
            }

            // Crear capa dinámica usando el DOM (Página 7 de tu JS.pdf)
            const capa = document.createElement("div");
            capa.className = "arduino";

            // Tomamos el texto alternativo (alt) de la imagen para usarlo de título
            // Nota: Recordá agregar el atributo alt="Nombre" en las etiquetas <img> de tu HTML
            capa.innerHTML = imagen.alt || "Componente Arduino";

            // Aseguramos los estilos CSS necesarios para que funcione el desborde oculto
            contenedor.style.position = "relative";
            contenedor.style.display = "inline-block";
            contenedor.style.overflow = "hidden";

            // Agregar la capa recién creada al contenedor
            contenedor.appendChild(capa);

            // Primer Temporizador (Página 9 de tu JS.pdf):
            // Le damos 50 milisegundos para que el navegador procese el renderizado y active la animación CSS
            setTimeout(function(){
                capa.style.height = "100%";
            }, 50);

            // Segundo Temporizador (Página 9 de tu JS.pdf):
            // Espera 2000 milisegundos (2 segundos) para que el usuario aprecie el efecto y luego viaja al link
            setTimeout(function(){
                window.location.href = link;
            }, 2000);

        });

    });

};