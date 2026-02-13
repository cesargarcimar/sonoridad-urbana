document.addEventListener('DOMContentLoaded', () => {

    console.log("script.js cargado");

    const supabaseUrl = 'https://mzchsyyjttmqxxtjaqxg.supabase.co';
    const supabaseKey = 'sb_publishable_vM_VOxXF4NZidL09m1-z_A_bgcSrVw3';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    const startBtn = document.getElementById('startBtn');
    const formSection = document.getElementById('formSection');
    const fader = document.getElementById('fader');
    const submitBtn = document.getElementById('submitBtn');
    const ageInput = document.getElementById('age');
    const genderInput = document.getElementById('gender');
    const headphonesInput = document.getElementById('headphones');
    const listeningTimeInput = document.getElementById('listeningTime');
    const commentInput = document.getElementById('comment');
    const faderValueLabel = document.getElementById('faderValue');

    startBtn.addEventListener('click', () => {
        document.getElementById('consent').style.display = 'none';
        formSection.style.display = 'block';
    });

    submitBtn.addEventListener('click', async () => {

        const age_rango = ageInput.value;
        const genderVal = genderInput.value;
        const headphones = headphonesInput.value === "true" ? true : false;
        const listening_time_seconds = parseInt(listeningTimeInput.value);
        const valor_fader = Number(fader.value);
        const fader_movements = Number(fader.value);
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
                    valor_fader: valor_fader,
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

    fader.addEventListener('input', () => {
        faderValueLabel.textContent = fader.value;
    });

});
