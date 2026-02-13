console.log("script.js cargado");

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const formSection = document.getElementById('formSection');
    const fader = document.getElementById('fader');
    const faderValueLabel = document.getElementById('faderValue');

    startBtn.addEventListener('click', () => {
        alert("¡Botón funciona!");
        document.getElementById('consent').style.display = 'none';
        formSection.style.display = 'block';
    });

    fader.addEventListener('input', () => {
        faderValueLabel.textContent = fader.value;
    });
});
