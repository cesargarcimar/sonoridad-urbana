// ------------------------
// Conexión con Supabase
// ------------------------
const supabaseUrl = 'https://mzchsyyjttmqxxtjaqxg.supabase.co';
const supabaseKey = 'sb_publishable_vM_VOxXF4NZidL09m1-z_A_bgcSrVw3';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ------------------------
// Elementos del DOM
// ------------------------
const startBtn = document.getElementById('startBtn');
const formSection = document.getElementById('formSection');
const fader = document.getElementById('fader');
const submitBtn = document.getElementById('submitBtn');
const ageInput = document.getElementById('age'); // id del input de edad
const genderInput = document.getElementById('gender'); // id del input de género
const headphonesInput = document.getElementById('headphones'); // id del input auriculares
const listeningTimeInput = document.getElementById('listeningTime'); // id del input tiempo de escucha
const commentInput = document.getElementById('comment'); // id del input comentario

// ------------------------
// Función para mostrar formulario al aceptar
// ------------------------
startBtn.addEventListener('click', () => {
    document.getElementById('consent').style.display = 'none';
    formSection.style.display = 'block';
});

// ------------------------
// Función para enviar datos a Supabase
// ------------------------
submitBtn.addEventListener('click', async () => {
    const age_rango = ageInput.value;
    const genderVal = genderInput.value;
    const headphones = headphonesInput.value;
    const listening_time_seconds = parseFloat(listeningTimeInput.value);
    const fader_movements = parseFloat(fader.value); // valor del fader entre 0 y 1
    const comment = commentInput.value;

    if (!age_rango || !genderVal) {
        alert('Por favor, completa los campos obligatorios');
        return;
    }

    const { data, error } = await supabase
        .from('respuestas')
        .insert([
            {
                age_rango: age_rango,
                gender: genderVal,
                headphones: headphones,
                listening_time_seconds: listening_time_seconds,
                fader_movements: fader_movements,
                comment: comment
            }
        ]);

    if (error) {
        console.error(error);
        alert('Hubo un error al enviar tus datos');
    } else {
        alert('Gracias, tu participación ha sido registrada');
        formSection.style.display = 'none';
        document.getElementById('gracias').style.display = 'block';
    }
});

// ------------------------
// Opcional: mostrar valor del fader en tiempo real
// ------------------------
const faderValueLabel = document.getElementById('faderValue');
if (faderValueLabel) {
    fader.addEventListener('input', () => {
        faderValueLabel.textContent = fader.value;
    });
}
