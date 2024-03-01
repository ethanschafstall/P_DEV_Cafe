import { names } from "./selfServiceMachineInitial/scripts.js";

let listNames = document.getElementById("selecHmlListUser");


document.addEventListener("DOMContentLoaded", function () {

    for(i = 0; i< names.length; i++){
        const option = document.createElement("option");
        listNames.classList.add("clickableLi");
        option.classList.add("clickableLi");
        option.textContent = names[i].name;
        console.log(names[i]);
        listNames.appendChild(option);
    }
});