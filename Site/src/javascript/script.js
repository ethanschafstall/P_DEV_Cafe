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

let names = [
  {
    name: "Vincent",
    sold: 5,
    password: 5555,
    admin:false
  },
  {
    name: "Benoit",
    sold: 5,
    password: 6666,
    admin:true
  },
  {
    name: "Bernard",
    sold: 5,
    password: 7777,
    admin:false
  },
  {
    name: "Evin",
    sold: 5,
    password: 8888,
    admin:false
  },
  {
    name: "Mathis",
    sold: 100,
    password: 1111,
    admin:false
  },
  {
    name: "Mateen",
    sold: 42,
    password: 3333,
    admin:false
  }
];

let totaldisplay = document.getElementById("totaldisplay");
let totalsmall = document.getElementById("totalsmall");
let displayname = document.getElementById("displayname");
let quantity = document.getElementsByClassName("quantity");
let totalGlobal = 0;
let namesold = document.getElementsByClassName("namesold")[0];
let message = document.getElementById('message');

function addCard(choice) {
  products[choice].quantity++;
  total = Math.round(1000 * products[choice].quantity * products[choice].price) / 1000;
  totalGlobal += products[choice].price;
  totalsmall.textContent = Math.round(1000 * total) / 1000;
  totaldisplay.textContent = `${Math.round(1000 * totalGlobal) / 1000} CHF`;
  displayname.textContent = `${products[choice].quantity} x ${products[choice].name}`;
  quantity[choice].textContent = products[choice].quantity;
}

function deleteCard(choice) {
  if (products[choice].quantity > 0) {
    products[choice].quantity--;
    total = Math.round(1000 * products[choice].quantity * products[choice].price) / 1000;
    totalGlobal -= products[choice].price;
  }
  totalsmall.textContent = Math.round(1000 * total) / 1000;
  totaldisplay.textContent = `${Math.round(1000 * totalGlobal) / 1000} CHF`;
  displayname.textContent = `${products[choice].quantity} x ${products[choice].name}`;
  quantity[choice].textContent = products[choice].quantity;
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

        if (user.admin) {
          let adminButton = document.getElementById('adminButton');
          adminButton.removeAttribute('disabled');
          adminButton.style.display = 'inline-block';
        }
      }
    });
  }
}


function redirectToAdminPage() {

  if (user && user.admin) {
    window.location.href = "./admin.html";
  } 
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
