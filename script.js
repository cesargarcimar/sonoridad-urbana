document.addEventListener('DOMContentLoaded', () => {

    const startBtn = document.getElementById('startBtn');
    const consentDiv = document.getElementById('consent');
    const formSection = document.getElementById('formSection');
    const fader = document.getElementById('fader');
    const faderValueLabel = document.getElementById('faderValue');

    // Al aceptar, mostrar segunda pantalla
    startBtn.addEventListener('click', () => {
        consentDiv.style.display = 'none';   // Ocultar primera pantalla
        formSection.style.display = 'block'; // Mostrar segunda pantalla con fader y audio
    });

    // Actualizar valor del fader en tiempo real
    fader.addEventListener('input', () => {
        faderValueLabel.textContent = fader.value;
    });

});
