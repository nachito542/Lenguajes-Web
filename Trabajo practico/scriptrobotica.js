
window.addEventListener("load", function() {
    
    
    let tarjetas = document.querySelectorAll(".tarjeta-idea");

    
    for (let i = 0; i < tarjetas.length; i++) {
        let tarjetaActual = tarjetas[i];

        // Evento mouseenter: Cuando pasas el cursor por arriba
        tarjetaActual.addEventListener("mouseenter", function() {
            tarjetaActual.style.backgroundColor = "#eef4f9"; 
            tarjetaActual.style.transform = "translateX(20px)"; 
            tarjetaActual.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";

            
            let previsualizacion = tarjetaActual.querySelector(".previsualizacion");
            previsualizacion.style.display = "block"; 

            let badges = tarjetaActual.querySelectorAll(".badge");
            for (let j = 0; j < badges.length; j++) {
                badges[j].style.backgroundColor = "#0071bc";
                badges[j].style.color = "white";
            }
        });

     
        tarjetaActual.addEventListener("mouseleave", function() {
            tarjetaActual.style.backgroundColor = "#f4f6f9";
            tarjetaActual.style.transform = "translateX(0px)";
            tarjetaActual.style.boxShadow = "none";

            let previsualizacion = tarjetaActual.querySelector(".previsualizacion");
            previsualizacion.style.display = "none"; 

            let badges = tarjetaActual.querySelectorAll(".badge");
            for (let j = 0; j < badges.length; j++) {
                badges[j].style.backgroundColor = "#e1e8ed";
                badges[j].style.color = "#333";
            }
        });
    }
});