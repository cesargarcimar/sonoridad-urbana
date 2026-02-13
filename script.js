// --- CAMBIA ESTO ---
const supabaseUrl = 'TU_SUPABASE_URL';
const supabaseKey = 'TU_SUPABASE_ANON_KEY';
// ----------------------
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

let startTime = 0;
let faderMoves = 0;

const fader = document.getElementById('fader');

fader.addEventListener('input', () => {
    faderMoves++;
});

function showForm() {
    document.getElementById('consent').style.display = 'none';
    document.getElementById('form').style.display = 'block';
}

function startAudio() {
    document.getElementById('form').style.display = 'none';
    document.getElementById('audioSection').style.display = 'block';
    const track = document.getElementById('track');
    track.play();
    startTime = Date.now();
}

async function submitData() {
    const age_range = document.getElementById('age_range').value;
    const gender = document.getElementById('gender').value;
    const city = document.getElementById('city').value;
    const uses_headphones = document.getElementById('headphones').value === 'true';
    const fader_value = parseFloat(fader.value);
    const listening_time_seconds = Math.round((Date.now() - startTime)/1000);
    const fader_movements = faderMoves;

    const { data, error } = await supabase
        .from('respuestas')
        .insert([{
            age_range,
            gender,
            city,
            uses_headphones,
            fader_value,
            listening_time_seconds,
            fader_movements
        }]);

    if(error) {
        alert('Error al guardar los datos');
        console.log(error);
    } else {
        document.getElementById('audioSection').style.display = 'none';
        document.getElementById('thanks').style.display = 'block';
    }
}
