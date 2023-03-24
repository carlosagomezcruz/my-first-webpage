import { validar, getInputValue } from './validador.js';


const inputs = document.querySelectorAll("#input");
const form = document.querySelector("[data-form]");

let arr = "";

form.onchange =  () => {
   const arr2 = getInputValue();
   arr = arr2;
};

inputs.forEach(input => {
    input.addEventListener("blur", (e) => {
        validar(e.target, arr);
    });
}
);

