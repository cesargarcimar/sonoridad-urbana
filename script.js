console.log("script.js loaded");

document.addEventListener('DOMContentLoaded', () => {

    const fader = document.getElementById('fader');
    const faderValueLabel = document.getElementById('faderValue');

    // Actualiza el valor del fader en tiempo real
    fader.addEventListener('input', () => {
        faderValueLabel.textContent = fader.value;
    });

});
