let user;
let cafe;

let products = [
  {
    photo: "img/Cafe.png",
    name: "Café",
    price: 1,
    active: false,
    quantity: 0,
  }
];

let cafes = [
  {
    name: "",
    type: "",
    price: "",
    kg: "",
    description: ""
  },
  {
    name: "Espresso",
    type: "Robusta",
    price: 2.5,
    kg: 1,
    description: "Un café concentré avec une saveur intense."
  },
  {
    name: "Cappuccino",
    type: "Arabica",
    price: 3.0,
    kg: 1,
    description: "Un mélange équilibré de café, de lait et de mousse de lait."
  },
  {
    name: "Latte Macchiato",
    type: "Arabica",
    price: 3.5,
    kg: 1,
    description: "Café avec beaucoup de lait et une petite quantité de mousse de lait."
  },
  {
    name: "Mocha",
    type: "Arabica",
    price: 4.0,
    kg: 1,
    description: "Café au chocolat avec du lait et de la crème fouettée."
  },
  {
    name: "Cold Brew",
    type: "Arabica",
    price: 3.8,
    kg: 1,
    description: "Café infusé à froid pour une saveur douce et rafraîchissante."
  }
];

let names = [
  {
    name: "",
    sold: "",
    nmbcafe: ""
  },
  {
    name: "Benoit",
    sold: 5,
    password: 6666,
    admin: true,
    nmbcafe: 0
  },
  {
    name: "Bernard",
    sold: 5,
    password: 7777,
    admin: false,
    nmbcafe: 0
  },
  {
    name: "Evin",
    sold: 5,
    password: 8888,
    admin: false,
    nmbcafe: 0
  },
  {
    name: "Mathis",
    sold: 100,
    password: 1111,
    admin: false,
    nmbcafe: 0
  },
  {
    name: "Mateen",
    sold: 42,
    password: 3333,
    admin: false,
    nmbcafe: 0
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
        else {
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
  user.nmbcafe += totalGlobal;
  updatesold();
  displayUserInfo();
}


document.addEventListener("DOMContentLoaded", function () {
  let connectionText = document.getElementsByClassName("connectionText")[0];
  let listNames = document.getElementById("scrollingLisMenu");

  if (typeof names !== "undefined" && Array.isArray(names)) {
    for (let i = 0; i < names.length; i++) {
      const option = document.createElement("option");
      option.textContent = names[i].name;

      listNames.addEventListener("change", userListeConnect);

      listNames.appendChild(option);
    }
  }
});

//////////////////////////////////////////////////////////// Admin ///////////////////////////////////////////////////////////////


function addBalance() {
  let selectElement = document.getElementById('userList');
  let selectIndex = selectElement.selectedIndex;
  let selectedUser = selectElement.options[selectIndex].value;
  let user = names.find(user => user.name === selectedUser);
  let addBalanceInput = document.getElementById('addBalance');

  if (user) {
    let amountToAdd = parseFloat(addBalanceInput.value);

    if (!isNaN(amountToAdd) && amountToAdd > 0) {
      user.sold += amountToAdd;

      Swal.fire({
        icon: 'success',
        title: 'Solde ajouté avec succès pour : ' + user.name,
        text: `Nouveau solde : ${user.sold} CHF`,
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Attention',
        text: 'Veuillez entrer un montant valide à ajouter'
      });
    }
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Utilisateur non trouvé'
    });
  }
  displayUserInfo();
  updatesold();
}

function subtractBalance() {
  let selectElement = document.getElementById('userList');
  let selectIndex = selectElement.selectedIndex;
  let selectedUser = selectElement.options[selectIndex].value;
  let user = names.find(user => user.name === selectedUser);
  let subtractBalanceInput = document.getElementById('subtractBalance'); // Ajoutez l'ID correspondant dans votre HTML

  if (user) {
    let amountToSubtract = parseFloat(subtractBalanceInput.value);

    if (!isNaN(amountToSubtract) && amountToSubtract > 0) {
      if (user.sold >= amountToSubtract) {
        user.sold -= amountToSubtract;

        Swal.fire({
          icon: 'success',
          title: 'Solde soustrait avec succès pour : ' + user.name,
          text: `Nouveau solde : ${user.sold} CHF`,
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Solde insuffisant',
          text: 'Le solde de l\'utilisateur est inférieur au montant à soustraire.'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Attention',
        text: 'Veuillez entrer un montant valide à soustraire'
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Utilisateur non trouvé'
    });
  }
  displayUserInfo();
  updatesold();
}



function displayUserInfo() {
  let selectElement = document.getElementById('userList');
  let selectIndex = selectElement.selectedIndex;
  let selectedUser = selectElement.options[selectIndex].value;
  user = names.find(user => user.name === selectedUser);

  if (user) {
    let userNameElement = document.getElementById('userName');
    let userPassword = document.getElementById('userPassword');
    let userBalanceElement = document.getElementById('userBalance');
    let userNumberCafeElement = document.getElementById('userNumberCafe');

    userNameElement.textContent = user.name;
    userPassword.textContent = user.password;
    userBalanceElement.textContent = `${user.sold} CHF`;
    userNumberCafe.textContent = user.nmbcafe;

    if (user.admin) {
      let adminButton = document.getElementById('adminButton');
      adminButton.removeAttribute('disabled');
      adminButton.style.display = 'inline-block';
    }
  }
}

function createUser() {
  let username, password;
  
  Swal.fire({
    title: 'Créer un nouvel utilisateur',
    html: `
      <input id="username" class="swal2-input" placeholder="Nom d'utilisateur">
      <input id="password" type="password" class="swal2-input" placeholder="Mot de passe">
    `,
    showCancelButton: true,
    confirmButtonText: 'Créer',
    cancelButtonText: 'Annuler',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      username = Swal.getPopup().querySelector('#username').value;
      password = Swal.getPopup().querySelector('#password').value;

      if (!username || !password) {
        Swal.showValidationMessage('Veuillez remplir tous les champs');
        return false;
      }
      return true;
    }
  })
  .then((result) => {
    if (result.isConfirmed) {
      const newUser = {
        name: username,
        sold: 0,
        password: password,
        admin: false,
        nmbcafe: 0
      };

      names.push(newUser);
      Swal.fire({
        title: 'Succès',
        text: 'Utilisateur créé avec succès',
        icon: 'success'
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let listNames = document.getElementById("userList");

  if (listNames && typeof names !== "undefined" && Array.isArray(names)) {
    for (let i = 0; i < names.length; i++) {
      const option = document.createElement("option");
      option.textContent = names[i].name;
      option.value = names[i].name;

      listNames.addEventListener("change", displayUserInfo);

      listNames.appendChild(option);
    }
  }
});


//////////////////////////////////////////////////////////// Admin cafe ///////////////////////////////////////////////////////////////


let selectedCafe;
let cafeList = document.getElementById("cafeList");
let cafeNameElement = document.getElementById('cafeName');
let cafePriceElement = document.getElementById('cafePrice');
let cafeQuantityElement = document.getElementById('cafeQuantity');
let cafeTypeElement = document.getElementById('cafeType');
let cafeDescriptionElement = document.getElementById('cafeDescription');

function addCafe() {
  let selectedCafeIndex = cafeList.selectedIndex;
  let selectedCafe = cafes[selectedCafeIndex];

  if (selectedCafe) {
    let addCafeQuantityInput = document.getElementById('addCafeQuantity');
    let quantityToAdd = parseInt(addCafeQuantityInput.value);

    if (!isNaN(quantityToAdd) && quantityToAdd > 0) {
      selectedCafe.kg += quantityToAdd;

      Swal.fire({
        icon: 'success',
        title: 'Café ajouté avec succès : ' + selectedCafe.name,
        text: `Nouvelle quantité en stock : ${selectedCafe.kg} kg`,
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Attention',
        text: 'Veuillez entrer une quantité valide à ajouter'
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Café non trouvé'
    });
  }
  displayCafeInfo();
}

function subtractCafe() {
  let selectedCafeIndex = cafeList.selectedIndex;
  let selectedCafe = cafes[selectedCafeIndex];

  if (selectedCafe) {
    let subtractCafeQuantityInput = document.getElementById('subtractCafeQuantity');
    let quantityToSubtract = parseInt(subtractCafeQuantityInput.value);

    if (!isNaN(quantityToSubtract) && quantityToSubtract > 0) {
      if (selectedCafe.kg >= quantityToSubtract) {
        selectedCafe.kg -= quantityToSubtract;

        Swal.fire({
          icon: 'success',
          title: 'Café retiré avec succès : ' + selectedCafe.name,
          text: `Nouvelle quantité en stock : ${selectedCafe.kg} kg`,
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Stock insuffisant',
          text: 'La quantité demandée est supérieure à celle en stock.'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Attention',
        text: 'Veuillez entrer une quantité valide à soustraire'
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Café non trouvé'
    });
  }
  displayCafeInfo();
}

function displayCafeInfo() {
  let selectedCafeIndex = cafeList.selectedIndex;
  selectedCafe = cafes[selectedCafeIndex];

  if (selectedCafe) {
    cafeNameElement.textContent = `${selectedCafe.name}`;
    cafePriceElement.textContent = `${selectedCafe.price}`;
    cafeQuantityElement.textContent = `${selectedCafe.kg}`;
    cafeTypeElement.textContent = `${selectedCafe.type}`;
    cafeDescriptionElement.textContent = `${selectedCafe.description}`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let cafeList = document.getElementById("cafeList");

  if (cafeList && typeof cafes !== "undefined" && Array.isArray(cafes)) {
    for (let i = 0; i < cafes.length; i++) {
      const option = document.createElement("option");
      option.textContent = cafes[i].name;
      option.value = cafes[i].name;
      cafeList.appendChild(option);
    }

    cafeList.addEventListener("change", function () {
      displayCafeInfo();
    });
  }
});
