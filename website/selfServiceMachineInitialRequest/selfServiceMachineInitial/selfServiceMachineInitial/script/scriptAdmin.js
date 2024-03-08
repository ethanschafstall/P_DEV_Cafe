import { names } from "./users.mjs";

let listNames = document.getElementById("selecHmlListUser");
let user;

document.addEventListener("DOMContentLoaded", function () {

    for (let i = 0; i < names.length; i++) {
        console.log(names.name)
        const option = document.createElement("option");
        listNames.classList.add("clickableLi");
        option.classList.add("clickableLi");
        option.textContent = names[i].name;
        console.log(names[i]);
        listNames.addEventListener("change",DisplayUserName)
        listNames.appendChild(option);
    }
});

function ChosenUser() {
    user = listNames.selectedIndex;
    let chosenName = names.filter((value) =>{
        return value.name === names[user].name
    });
    return chosenName;
}

function DisplayUserName(){
    let nameOfUser = document.getElementsByClassName("nameOfUser")[0];
    let userName = ChosenUser();
    if(userName.length > 0){
        nameOfUser.textContent = userName[0].name;
    }
    DisplayUserInfo();
}
function DisplayUserInfo(){
    let userInfo = document.getElementsByClassName("infoUser")[0];
    let userData = ChosenUser();
    if(userData.length > 0){
        let displayString = `Nom: ${userData[0].name}, Soldes: ${userData[0].sold}`;
        userInfo.textContent = displayString;
    }
}