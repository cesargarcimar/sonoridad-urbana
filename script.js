// Comprobar que el JS se carga
console.log("script.js cargado");

// Esperar a que todo el HTML esté listo
document.addEventListener('DOMContentLoaded', () => {

    // Elementos del DOM
    const startBtn = document.getElementById('startBtn');
    const formSection = document.getElementById('formSection');
    const fader = document.getElementById('fader');
    const faderValueLabel = document.getElementById('faderValue');

    // Botón de consentimiento
    startBtn.addEventListener('click', () => {
        alert("¡Botón funciona!");
        document.getElementById('consent').style.display = 'none';
        formSection.style.display = 'block';
    });

    // Mostrar valor del fader en tiempo real
    fader.addEventListener('input', () => {
        faderValueLabel.textContent = fader.value;
    });

});
