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

    // PAIR 3
    const track3a = document.getElementById('track3a');
    const track3b = document.getElementById('track3b');
    const fader3 = document.getElementById('fader3');
    const playPauseBtn3 = document.getElementById('playPauseBtn3');

    let isPlaying1 = false;
    let isPlaying2 = false;
    let isPlaying3 = false;

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

        userData["Name or Nickname"] = nicknameInput.value;
        userData.age_rango = ageInput.value;
        userData.gender = genderSelect.value;

        userConsent.style.display = 'none';
        formSection.style.display = 'block';
    });

    // PLAY PAIR 1
    playPauseBtn1.addEventListener('click', () => {

        if (!isPlaying1) {

            track2a.pause();
            track2b.pause();
            track3a.pause();
            track3b.pause();

            isPlaying2 = false;
            isPlaying3 = false;

            playPauseBtn2.textContent = "Play Pair 2";
            playPauseBtn3.textContent = "Play Pair 3";

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

            track1a.pause();
            track1b.pause();
            track3a.pause();
            track3b.pause();

            isPlaying1 = false;
            isPlaying3 = false;

            playPauseBtn1.textContent = "Play Pair 1";
            playPauseBtn3.textContent = "Play Pair 3";

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

    // PLAY PAIR 3
    playPauseBtn3.addEventListener('click', () => {

        if (!isPlaying3) {

            track1a.pause();
            track1b.pause();
            track2a.pause();
            track2b.pause();

            isPlaying1 = false;
            isPlaying2 = false;

            playPauseBtn1.textContent = "Play Pair 1";
            playPauseBtn2.textContent = "Play Pair 2";

            track3a.play();
            track3b.play();

            isPlaying3 = true;
            playPauseBtn3.textContent = "Pause Pair 3";

        } else {

            track3a.pause();
            track3b.pause();

            isPlaying3 = false;
            playPauseBtn3.textContent = "Play Pair 3";
        }
    });

    // FADER 1 → STREETS
    fader1.addEventListener('input', () => {

        const value = parseInt(fader1.value);
        const v = value / 100;

        track1a.volume = 1 - v;
        track1b.volume = v;

        userData.streets = value;
    });

    // FADER 2 → SPIRITUAL
    fader2.addEventListener('input', () => {

        const value = parseInt(fader2.value);
        const v = value / 100;

        track2a.volume = 1 - v;
        track2b.volume = v;

        userData.spiritual = value;
    });

    // FADER 3 → TV
    fader3.addEventListener('input', () => {

        const value = parseInt(fader3.value);
        const v = value / 100;

        track3a.volume = 1 - v;
        track3b.volume = v;

        userData.tv = value;
    });

    submitBtn.addEventListener('click', async () => {

        const results = {

            "Name or Nickname": userData["Name or Nickname"],
            age_rango: userData.age_rango,
            gender: userData.gender,

            streets: userData.streets ?? 50,
            spiritual: userData.spiritual ?? 50,
            tv: userData.tv ?? 50,

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