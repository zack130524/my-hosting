// ==========================================
// CONFIGURACIÓN INICIAL (Pon tus datos aquí)
// ==========================================
const fechaAniversario = new Date(2024, 4, 13, 12, 55, 0); 
const tiempoRequerido = 3000; 

// 1. SELECCIÓN DE ELEMENTOS DEL HTML
const circuloHuella = document.getElementById('circulo-huella');
const pantallaBloqueo = document.getElementById('pantalla-bloqueo');
const contenidoPrincipal = document.getElementById('contenido-principal');
const tituloBloqueo = document.getElementById('titulo-bloqueo');
const mensajeGuia = document.getElementById('mensaje-guia');
const musicaFondo = document.getElementById('musica-fondo');
const sobre = document.getElementById('sobre');

// 2. VARIABLES DE CONTROL DE TIEMPO
let tiempoPresionado; 
let temporizadorEscaneo;

// 3. FUNCIÓN: INICIAR EL ESCANEO
function iniciarEscaneo(e) {
    e.preventDefault(); 

    tituloBloqueo.innerText = "Escaneando...";
    mensajeGuia.innerText = "No sueltes el dedo...";
    
    circuloHuella.style.backgroundColor = "rgba(255, 42, 75, 0.2)";
    circuloHuella.style.borderColor = "#ff2a4b";
    circuloHuella.style.transform = "scale(0.95)";

    tiempoPresionado = Date.now();

    temporizadorEscaneo = setTimeout(() => {
        completarEscaneo();
    }, tiempoRequerido);
}

// 4. FUNCIÓN: CANCELAR EL ESCANEO
function cancelarEscaneo() {
    clearTimeout(temporizadorEscaneo);
    
    const tiempoTranscurrido = Date.now() - tiempoPresionado;

    if (tiempoTranscurrido < tiempoRequerido) {
        tituloBloqueo.innerText = "Para ti, mi amor";
        mensajeGuia.innerText = "Acceso denegado. Mantén presionado por 3 segundos. ❤️";
        
        circuloHuella.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
        circuloHuella.style.borderColor = "rgba(255, 255, 255, 0.2)";
        circuloHuella.style.transform = "scale(1)";
    }
}

// 5. FUNCIÓN: ESCANEO COMPLETADO CON ÉXITO
function completarEscaneo() {
    tituloBloqueo.innerText = "¡Huella Reconocida!";
    mensajeGuia.innerText = "Cargando tu sorpresa...";
    circuloHuella.style.transform = "scale(1.2)";
    circuloHuella.style.backgroundColor = "rgba(46, 204, 113, 0.3)"; 
    circuloHuella.style.borderColor = "#2ecc71";

    setTimeout(() => {
        pantallaBloqueo.style.opacity = '0';
        
        setTimeout(() => {
            pantallaBloqueo.classList.add('oculto');
            contenidoPrincipal.classList.remove('oculto');
            
            // REPRODUCIR MÚSICA
            musicaFondo.play().catch(error => {
                console.log("El navegador requiere interacción previa para sonar:", error);
            });
            
            // INICIAR RELOJ Y PETALOS
            actualizarContador();
            setInterval(actualizarContador, 1000); 
            crearLluviaDePetalos();
            
            console.log("¡Desbloqueado con éxito!");
        }, 1000);

    }, 1000);
}

// 6. LÓGICA MATEMÁTICA DEL CONTADOR
function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaAniversario; 

    const msPorSegundo = 1000;
    const msPorMinuto = msPorSegundo * 60;
    const msPorHora = msPorMinuto * 60;
    const msPorDia = msPorHora * 24;

    const diasTranscurridos = Math.floor(diferencia / msPorDia);
    const horasTranscurridas = Math.floor((diferencia % msPorDia) / msPorHora);
    const minutosTranscurridos = Math.floor((diferencia % msPorHora) / msPorMinuto);
    const segundosTranscurridos = Math.floor((diferencia % msPorMinuto) / msPorSegundo);

    document.getElementById('dias').innerText = diasTranscurridos.toString().padStart(2, '0');
    document.getElementById('horas').innerText = horasTranscurridas.toString().padStart(2, '0');
    document.getElementById('minutos').innerText = minutosTranscurridos.toString().padStart(2, '0');
    document.getElementById('segundos').innerText = segundosTranscurridos.toString().padStart(2, '0');
}

// 7. GENERADOR DE PÉTALOS DE ROSA
function crearLluviaDePetalos() {
    const contenedor = document.getElementById('contenedor-petalos');
    const cantidadPetalos = 40; 

    for (let i = 0; i < cantidadPetalos; i++) {
        crearPetalo(contenedor);
    }
}

function crearPetalo(contenedor) {
    const petalo = document.createElement('div');
    petalo.classList.add('petalo');

    const ancho = Math.random() * 15 + 12; 
    const alto = ancho * 1.3;
    const posicionIzquierda = Math.random() * 100; 
    const duracionAnimacion = Math.random() * 6 + 4; 
    const retrasoAnimacion = Math.random() * 10; 

    petalo.style.width = `${ancho}px`;
    petalo.style.height = `${alto}px`;
    petalo.style.left = `${posicionIzquierda}%`;
    petalo.style.animationDuration = `${duracionAnimacion}s`;
    petalo.style.animationDelay = `-${retrasoAnimacion}s`; 

    const tonosRojos = ['#ff2a4b', '#d91b36', '#ff4d6d', '#c91830', '#e63946'];
    petalo.style.backgroundColor = tonosRojos[Math.floor(Math.random() * tonosRojos.length)];

    contenedor.appendChild(petalo);
}

// 8. ANIMACIÓN DEL SOBRE DE LA CARTA
sobre.addEventListener('click', () => {
    sobre.classList.toggle('abierto');
});

// 9. DETECTORES DE EVENTOS DE LA HUELLA
circuloHuella.addEventListener('mousedown', iniciarEscaneo);
circuloHuella.addEventListener('mouseup', cancelarEscaneo);
circuloHuella.addEventListener('mouseleave', cancelarEscaneo);
circuloHuella.addEventListener('touchstart', iniciarEscaneo);
circuloHuella.addEventListener('touchend', cancelarEscaneo);