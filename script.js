document.addEventListener('DOMContentLoaded', () => {

const supabaseUrl = 'https://mzchsyyjttmqxxtjaqxg.supabase.co';
const supabaseKey = 'sb_publishable_vM_VOxXF4NZidL09m1-z_A_bgcSrVw3';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

/* Inputs */
const nicknameInput = document.getElementById('nickname');
const ageInput = document.getElementById('age');
const genderSelect = document.getElementById('gender');
const agreeBtn = document.getElementById('agreeBtn');

/* Sections */
const userConsent = document.getElementById('userConsent');
const formSection = document.getElementById('formSection');
const submitBtn = document.getElementById('submitBtn');

/* Audio tracks */
const track1a = document.getElementById('track1a');
const track1b = document.getElementById('track1b');

const trackPartyA = document.getElementById('trackPartyA');
const trackPartyB = document.getElementById('trackPartyB');

const track2a = document.getElementById('track2a');
const track2b = document.getElementById('track2b');

const track3a = document.getElementById('track3a');
const track3b = document.getElementById('track3b');

const track4a = document.getElementById('track4a');
const track4b = document.getElementById('track4b');

/* Faders */
const fader1 = document.getElementById('fader1');
const faderParty = document.getElementById('faderParty');
const fader2 = document.getElementById('fader2');
const fader3 = document.getElementById('fader3');
const fader4 = document.getElementById('fader4');

/* Play buttons */
const playPauseBtn1 = document.getElementById('playPauseBtn1');
const playPauseBtnParty = document.getElementById('playPauseBtnParty');
const playPauseBtn2 = document.getElementById('playPauseBtn2');
const playPauseBtn3 = document.getElementById('playPauseBtn3');
const playPauseBtn4 = document.getElementById('playPauseBtn4');

let isPlaying1=false, isPlayingParty=false, isPlaying2=false, isPlaying3=false, isPlaying4=false;
let userData={};

/* Habilitar botón */
const checkInputs = () => {
    if(nicknameInput.value.trim() && ageInput.value.trim() && genderSelect.value){
        agreeBtn.classList.remove('disabled');
    } else {
        agreeBtn.classList.add('disabled');
    }
};

nicknameInput.addEventListener('input',checkInputs);
ageInput.addEventListener('input',checkInputs);
genderSelect.addEventListener('change',checkInputs);

/* Avanzar a faders */
agreeBtn.addEventListener('click', () => {
    if(agreeBtn.classList.contains('disabled')) return;

    userData.Name = nicknameInput.value.trim();
    userData.age_rango = ageInput.value.trim();
    userData.gender = genderSelect.value;

    userConsent.style.display = 'none';
    formSection.style.display = 'block';
});

/* STOP ALL */
function stopAll(){

    track1a.pause(); track1b.pause();
    trackPartyA.pause(); trackPartyB.pause();
    track2a.pause(); track2b.pause();
    track3a.pause(); track3b.pause();
    track4a.pause(); track4b.pause();

    isPlaying1=false;
    isPlayingParty=false;
    isPlaying2=false;
    isPlaying3=false;
    isPlaying4=false;

    playPauseBtn1.textContent="Play ▷";
    playPauseBtnParty.textContent="Play ▷";
    playPauseBtn2.textContent="Play ▷";
    playPauseBtn3.textContent="Play ▷";
    playPauseBtn4.textContent="Play ▷";
}

/* PLAY BUTTONS */
playPauseBtn1.onclick = ()=>{ 
    if(!isPlaying1){ stopAll(); track1a.play(); track1b.play(); isPlaying1=true; playPauseBtn1.textContent="Pause ⏸"; } 
    else stopAll(); 
};

playPauseBtnParty.onclick = ()=>{ 
    if(!isPlayingParty){ stopAll(); trackPartyA.play(); trackPartyB.play(); isPlayingParty=true; playPauseBtnParty.textContent="Pause ⏸"; } 
    else stopAll(); 
};

playPauseBtn2.onclick = ()=>{ 
    if(!isPlaying2){ stopAll(); track2a.play(); track2b.play(); isPlaying2=true; playPauseBtn2.textContent="Pause ⏸"; } 
    else stopAll(); 
};

playPauseBtn3.onclick = ()=>{ 
    if(!isPlaying3){ stopAll(); track3a.play(); track3b.play(); isPlaying3=true; playPauseBtn3.textContent="Pause ⏸"; } 
    else stopAll(); 
};

playPauseBtn4.onclick = ()=>{ 
    if(!isPlaying4){ stopAll(); track4a.play(); track4b.play(); isPlaying4=true; playPauseBtn4.textContent="Pause ⏸"; } 
    else stopAll(); 
};

/* FADERS */
fader1.oninput = ()=>{ 
    let v=fader1.value/100; 
    track1a.volume=1-v; 
    track1b.volume=v; 
    userData.streets=fader1.value; 
};

faderParty.oninput = ()=>{ 
    let v=faderParty.value/100; 
    trackPartyA.volume=1-v; 
    trackPartyB.volume=v; 
    userData.party=faderParty.value; 
};

fader2.oninput = ()=>{ 
    let v=fader2.value/100; 
    track2a.volume=1-v; 
    track2b.volume=v; 
    userData.spiritual=fader2.value; 
};

fader3.oninput = ()=>{ 
    let v=fader3.value/100; 
    track3a.volume=1-v; 
    track3b.volume=v; 
    userData.tv=fader3.value; 
};

fader4.oninput = ()=>{ 
    let v=fader4.value/100; 
    track4a.volume=1-v; 
    track4b.volume=v; 
    userData.market=fader4.value; 
};

/* SUBMIT */
submitBtn.addEventListener('click', async()=>{

    const results = {
        Name: userData.Name,
        age_rango: userData.age_rango,
        gender: userData.gender,
        streets: userData.streets ?? 50,
        party: userData.party ?? 50,
        spiritual: userData.spiritual ?? 50,
        tv: userData.tv ?? 50,
        market: userData.market ?? 50,
        listening_time_seconds: Math.floor(track1a.currentTime)
    };

    const {error} = await supabaseClient.from('respuestas').insert([results]);

    if(error){
        alert("Error sending results: "+error.message);
    } else {
        formSection.style.display='none';
        document.getElementById('thanks').style.display='block';
    }
});

});
