import { enviarEmail } from './email.js'

const mensajesDeError = {
    nombre: {
        valueMissing: "Escriba su nombre y apellido.",
    },
    email: {
        valueMissing: "Escriba su correo electronico para contactarnos.",
        typeMismatch: "El correo no es válido, agregar un @ y .com",
    },
    asunto: {
        valueMissing: "Escriba un asunto, basicamente su requerimiento.",
    },
    mensaje: {
        valueMissing: "Anote una descripcion de su requerimiento. Aspectos generales",
    },
};

const buttonSubmit = document.querySelector("#submit");

const validar = (input, arr) => {

    const tipoInput = input.dataset.tipo;
    const mensajeError = errorCatching(input.validity, tipoInput);
    if (input.validity.valueMissing) {
        input.placeholder = mensajeError;
        input.parentElement.classList.add("warning");
    } else {
        input.parentElement.classList.remove("warning");
    }

    if (input.dataset.tipo == "email") {

        let elementoPadre = input.parentElement;
        if (input.validity.typeMismatch) {
            elementoPadre.classList.add("danger");
            elementoPadre.firstElementChild.innerHTML = `<a>${mensajeError}</a>`;
        } else {
            input.parentElement.classList.remove("danger");
            elementoPadre.firstElementChild.innerHTML = "E-mail";
        }
    }

    if (arr["arr2"] !== undefined) {
        let arrValueMissing = [];
        let arrTypeMismatch = [];
        console.log(arr["arr2"]);
        arr["arr2"].forEach((e) => {
            
            arrValueMissing.push(e["valueMissing"]);
            arrTypeMismatch.push(e["typeMismatch"]);
        });

        if (!arr["arr1"].includes("") && !arrValueMissing.includes(true) && !arrTypeMismatch.includes(true)) {
            buttonSubmit.classList.remove("button-disabled");
            buttonSubmit.attributes.removeNamedItem("disabled");
            enviarEmail();
        }

    }

}


const errorType = [
    "valueMissing",
    "typeMismatch"
]

const errorCatching = (errorInput, tipoInput) => {
    let mensaje = "";

    errorType.forEach(error => {
        if (errorInput[error]) {
            mensaje = mensajesDeError[tipoInput][error];
        }
    });

    return mensaje;
}

const inputs = document.querySelectorAll("#input");

const getInputValue = () => {
    let arr1 = [];
    let arr2 = [];
    inputs.forEach(input => {
        arr1.push(input.value);
        arr2.push(input.validity);
    }
    );
    return { arr1, arr2 };
}

export {
    validar,
    getInputValue
}