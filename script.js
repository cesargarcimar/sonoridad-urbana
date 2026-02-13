document.addEventListener('DOMContentLoaded', () => {

    const supabaseUrl = 'https://mzchsyyjttmqxxtjaqxg.supabase.co';
    const supabaseKey = 'sb_publishable_vM_VOxXF4NZidL09m1-z_A_bgcSrVw3';
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

    const nicknameInput = document.getElementById('nickname');
    const ageInput = document.getElementById('age');
    const genderSelect = document.getElementById('gender');
    const agreeBtn = document.getElementById('agreeBtn');

    const userConsent = document.getElementById('userConsent');
    const formSection = document.getElementById('formSection');

    const fader = document.getElementById('fader');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const submitBtn = document.getElementById('submitBtn');

    const track1 = document.getElementById('track1');
    const track2 = document.getElementById('track2');

    let isPlaying = false;
    let userData = {};

    const checkInputs = () => {
        if (nicknameInput.value && ageInput.value && genderSelect.value) {
            agreeBtn.classList.remove('disabled');
        } else {
            agreeBtn.classList.add('disabled');
        }
    };

    nicknameInput.addEventListener('input', checkInputs);
    ageInput.addEventListener('input', checkInputs);
    genderSelect.addEventListener('change', checkInputs);

    agreeBtn.addEventListener('click', () => {
        if (agreeBtn.classList.contains('disabled')) return;

        userData.nickname = nicknameInput.value;
        userData.age_rango = ageInput.value;
        userData.gender = genderSelect.value;

        userConsent.style.display = 'none';
        formSection.style.display = 'block';
    });

    playPauseBtn.addEventListener('click', () => {
        if (!isPlaying) {
            track1.play();
            track2.play();
            isPlaying = true;
            playPauseBtn.textContent = "Pause";
        } else {
            track1.pause();
            track2.pause();
            isPlaying = false;
            playPauseBtn.textContent = "Play";
        }
    });

    // Cambio simple de color: morado oscuro según lado del fader
    const updateFaderColor = (value) => {
        const mid = 50;
        const darkPurple = '#6a0dad'; 
        const lightPurple = '#c7a3e0';

        if (value === mid) {
            fader.style.background = lightPurple;
        } else if (value < mid) {
            fader.style.background = `linear-gradient(to right, ${darkPurple} ${value}%, ${lightPurple} ${value}%)`;
        } else {
            fader.style.background = `linear-gradient(to right, ${lightPurple} 0%, ${lightPurple} ${mid}%, ${darkPurple} ${mid}%, ${darkPurple} ${value}%, ${lightPurple} ${value}%, ${lightPurple} 100%)`;
        }
    };

    updateFaderColor(50);

    fader.addEventListener('input', () => {
        const value = parseInt(fader.value);
        const v = value / 100;
        track1.volume = 1 - v;
        track2.volume = v;
        userData.valor_fader = value;

        updateFaderColor(value);
    });

    submitBtn.addEventListener('click', async () => {
        const results = {
            nickname: userData.nickname,
            age_rango: userData.age_rango,
            gender: userData.gender,
            valor_fader: userData.valor_fader ?? parseInt(fader.value),
            fader_movements: parseInt(fader.value),
            listening_time_seconds: Math.floor(track1.currentTime),
            headphones: null,
            comment: null
        };

        const { data, error } = await supabaseClient
            .from('respuestas')
            .insert([results]);

        if (error) {
            console.error("Supabase error:", error);
            alert("Error sending results.");
        } else {
            formSection.style.display = 'none';
            document.getElementById('thanks').style.display = 'block';
        }
    });

});
