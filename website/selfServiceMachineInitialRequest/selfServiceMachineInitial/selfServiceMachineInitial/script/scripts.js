import { names } from "./users.mjs";
let user;

let products = [
  {
    photo: "img/Cafe.png",
    name: "Café",
    price: 1,
    active: false,
    quantity: 0,
  }
];

 

let totalDisplay = document.getElementById("totalDisplay");
let totalProductUnit = document.getElementById("totalProductUnit");
let productName = document.getElementById("productName");
let quantity = document.getElementsByClassName("quantity");
let totalGlobal = 0;
let namesold = document.getElementsByClassName("namesold")[0];

function addCard(choice) {
  products[choice].quantity++;
  total = Math.round(1000 * products[choice].quantity * products[choice].price) / 1000;
  totalGlobal += products[choice].price;
  totalProductUnit.textContent = Math.round(1000 * total) / 1000;
  totalDisplay.textContent = Math.round(1000 * totalGlobal) / 1000;
  productName.textContent = `${products[choice].quantity} x ${products[choice].name}`;
  quantity[choice].textContent = products[choice].quantity;
}

function deleteCard(choice) {
  if (products[choice].quantity > 0) {
    products[choice].quantity--;
    total = Math.round(1000 * products[choice].quantity * products[choice].price) / 1000;
    totalGlobal -= products[choice].price;
  }
  totalProductUnit.textContent = Math.round(1000 * total) / 1000;
  totalDisplay.textContent = Math.round(1000 * totalGlobal) / 1000;
  productName.textContent = `${products[choice].quantity} x ${products[choice].name}`;
  quantity[choice].textContent = products[choice].quantity;
}



function updatesold() {
  if (user !== undefined) {
    let sold = user.sold;
    namesold.textContent = `${user.name} : ${sold} CHF`;
  }
}

function checkCredit() {

  if (user.sold < totalGlobal) {
    user.sold -= totalGlobal;
    Swal.fire({
      icon: 'warning',
      title: 'Solde négatif',
      text: 'Attention votre solde est passé en négatif'
    });
  } else {
    user.sold -= totalGlobal;
  }
  updatesold();
}

function displayAdmin(){
  let goToAdminPage = document.getElementsByClassName("connexionToAdminHidden")[0];
  goToAdminPage.classList.remove("connexionToAdminHidden");
}
function hideAdmin(){
  let hideAdminLink = document.getElementById("connexionToAdmin");
  hideAdminLink.classList.add("connexionToAdminHidden");
}



function userListeConnect() {
  let selectElement = document.getElementById('scrollingLisMenu');
  let selectIndex = selectElement.selectedIndex;
  let selectedUser = selectElement.options[selectIndex].value;
  user = names.find(user => user.name === selectedUser);

  if (user) {
    Swal.fire({
      title: 'Mot de passe requis',
      input: 'password',
      inputPlaceholder: 'Entrez votre mot de passe',
      showCancelButton: true,
      confirmButtonText: 'Se connecter',
      cancelButtonText: 'Annuler',
      preConfirm: (enteredPassword) => {
        if (enteredPassword == user.password) {
          let connectionText = document.querySelector('.connectionText');
          connectionText.textContent = 'Vous êtes connecté en tant que : ' + selectedUser;
          updatesold();

          Swal.fire({
            icon: 'success',
            title: 'Connexion réussie',
            text: 'Vous êtes connecté en tant que : ' + selectedUser,
            confirmButtonText: 'OK'
          });
        } 
        else 
        {
          Swal.fire({
            icon: 'error',
            title: 'Erreur de mot de passe',
            text: 'Le mot de passe est incorrect. Veuillez réessayer.'
          });
        }
      }
    });
  }
  if(selectedUser.Admin === true){
    displayAdmin();
  }
  else{
    hideAdmin();
  }

}

document.addEventListener("DOMContentLoaded", function () {
  let connectionText = document.getElementsByClassName("connectionText")[0];
  let listNames = document.getElementById("scrollingLisMenu");

  if (typeof names !== "undefined" && Array.isArray(names)) {
    for (let i = 0; i < names.length; i++) {
      const option = document.createElement("option");
      option.textContent = names[i].name;
      listNames.classList.add("clickableLi");
      option.classList.add("clickableLi");

      listNames.addEventListener("change", userListeConnect);

      listNames.appendChild(option);
    }
  }
});