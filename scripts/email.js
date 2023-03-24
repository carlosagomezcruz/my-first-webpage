

const buttonSubmit = document.querySelector("#submit");
const formulario = document.querySelector("[data-form]");

const nextFormSubmit = document.createElement("input");
nextFormSubmit.type = "hidden";
nextFormSubmit.name = "_captcha";
nextFormSubmit.value = "false";
formulario.appendChild(nextFormSubmit);

nextFormSubmit.type = "text";
nextFormSubmit.name = "_honey";
nextFormSubmit.style = "display: none";
formulario.appendChild(nextFormSubmit);

nextFormSubmit.type = "hidden";
nextFormSubmit.name = "_next";
nextFormSubmit.value = "http://127.0.0.1:5500/";
formulario.appendChild(nextFormSubmit);

const enviarEmail = () => {

    const peticion = async (dates) => {
        const respuesta = await fetch("https://formsubmit.co/ajax/e84a0060de3e43730cf122003768025b", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                nombre: dates.nombre,
                email: dates.email,
                asuto: dates.asunto,
                mensaje: dates.mensaje
            })
        })

            .then(resp => resp.json())
            .then(() => {
                return "Formulario envíado. Pronto me comunicaré contigo."
            })
            .catch(err => {
                console.log(err);
                return "Ocurrió un error en el envío del formulario. Por favor intente mas tarde, o comuniquese directamente al 3002834552"
            })

        return respuesta;
    }


    buttonSubmit.addEventListener("click", async (e) => {
        e.preventDefault()
        const nombre = document.querySelector("[data-tipo=nombre]").value;
        const email = document.querySelector("[data-tipo=email]").value;
        const asunto = document.querySelector("[data-tipo=asunto]").value;
        const mensaje = document.querySelector("[data-tipo=mensaje]").value;
        const resp = await peticion({ nombre, email, asunto, mensaje });
        alert(resp);

        document.querySelector("[data-tipo=nombre]").value = "";
        document.querySelector("[data-tipo=email]").value = "";
        document.querySelector("[data-tipo=asunto]").value = "";
        document.querySelector("[data-tipo=mensaje]").value = "";

    });

}

export {
    enviarEmail,
}
