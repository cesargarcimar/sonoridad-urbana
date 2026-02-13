console.log("script.js loaded");

document.addEventListener('DOMContentLoaded', () => {

    const fader = document.getElementById('fader');
    const faderValueLabel = document.getElementById('faderValue');

    fader.addEventListener('input', () => {
        faderValueLabel.textContent = fader.value;
    });

});
