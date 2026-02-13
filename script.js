document.addEventListener('DOMContentLoaded', () => {

    console.log("script.js cargado");

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
