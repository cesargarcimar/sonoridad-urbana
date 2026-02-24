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

    const submitBtn = document.getElementById('submitBtn');

    // PAIR 1
    const track1a = document.getElementById('track1a');
    const track1b = document.getElementById('track1b');
    const fader1 = document.getElementById('fader1');
    const playPauseBtn1 = document.getElementById('playPauseBtn1');

    // PAIR 2
    const track2a = document.getElementById('track2a');
    const track2b = document.getElementById('track2b');
    const fader2 = document.getElementById('fader2');
    const playPauseBtn2 = document.getElementById('playPauseBtn2');

    let isPlaying1 = false;
    let isPlaying2 = false;
    let userData = {};

    // Habilitar botón
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

    // Avanzar
    agreeBtn.addEventListener('click', () => {
        if (agreeBtn.classList.contains('disabled')) return;

        userData["Name or Nickname"] = nicknameInput.value;
        userData.age_rango = ageInput.value;
        userData.gender = genderSelect.value;

        userConsent.style.display = 'none';
        formSection.style.display = 'block';
    });

    // PLAY PAIR 1
    playPauseBtn1.addEventListener('click', () => {
        if (!isPlaying1) {
            track1a.play();
            track1b.play();
            isPlaying1 = true;
            playPauseBtn1.textContent = "Pause Pair 1";
        } else {
            track1a.pause();
            track1b.pause();
            isPlaying1 = false;
            playPauseBtn1.textContent = "Play Pair 1";
        }
    });

    // PLAY PAIR 2
    playPauseBtn2.addEventListener('click', () => {
        if (!isPlaying2) {
            track2a.play();
            track2b.play();
            isPlaying2 = true;
            playPauseBtn2.textContent = "Pause Pair 2";
        } else {
            track2a.pause();
            track2b.pause();
            isPlaying2 = false;
            playPauseBtn2.textContent = "Play Pair 2";
        }
    });

    // FADER 1
    fader1.addEventListener('input', () => {
        const value = parseInt(fader1.value);
        const v = value / 100;
        track1a.volume = 1 - v;
        track1b.volume = v;
        userData.valor_fader_1 = value;
    });

    // FADER 2
    fader2.addEventListener('input', () => {
        const value = parseInt(fader2.value);
        const v = value / 100;
        track2a.volume = 1 - v;
        track2b.volume = v;
        userData.valor_fader_2 = value;
    });

    // SUBMIT
    submitBtn.addEventListener('click', async () => {

        const results = {
            "Name or Nickname": userData["Name or Nickname"],
            age_rango: userData.age_rango,
            gender: userData.gender,
            valor_fader: userData.valor_fader_1 ?? 50,
            fader_movements: userData.valor_fader_2 ?? 50,
            listening_time_seconds: Math.floor(track1a.currentTime),
            headphones: null,
            comment: null
        };

        const { error } = await supabaseClient
            .from('respuestas')
            .insert([results]);

        if (error) {
            alert("Error sending results: " + error.message);
        } else {
            formSection.style.display = 'none';
            document.getElementById('thanks').style.display = 'block';
        }
    });

});
