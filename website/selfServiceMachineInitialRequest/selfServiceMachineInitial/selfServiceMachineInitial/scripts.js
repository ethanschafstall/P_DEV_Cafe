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
    credits: 5
  },
  {
    name: "Benoit",
    credits: 5
  },
  {
    name: "Bernard",
    credits: 5
  },
  {
    name: "Evin",
    credits: 5
  },
  {
    name: "Mathis",
    credits: 100
  },
  {
    name: "Mateen",
    credits: 42
  }
];

let totalDisplay = document.getElementById("totalDisplay");
let totalProductUnit = document.getElementById("totalProductUnit");
let productName = document.getElementById("productName");
let quantity = document.getElementsByClassName("quantity");
let totalGlobal = 0;
let nameCredits = document.getElementsByClassName("nameCredits")[0];

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

// create li element that contains the names
document.addEventListener("DOMContentLoaded", function () {
  let connectionText = document.getElementsByClassName("connectionText")[0];
  // allocation the html element that id is nameList to a variable
  let listNames = document.getElementById("scrollingLisMenu");


  // check if the list of names exists and if it is an array
  if (typeof names !== "undefined" && Array.isArray(names)) {
    // loop that crate the li element to put the names in
    for (let i = 0; i < names.length; i++) {
      const option = document.createElement("option");
      option.textContent = names[i].name;
      listNames.classList.add("clickableLi");
      option.classList.add("clickableLi");

      listNames.addEventListener("change", function () {
        user = listNames.selectedIndex;
        connectionText.textContent = `Vous êtes connecté en tant que : ${names[user].name}`;
        let chosenName = names.filter((value) => {
          return value.name === names[user].name
        });
        let credits = chosenName[0].credits;
        nameCredits.textContent = `${names[user].name} : ${credits} crédits`;
      });

      listNames.appendChild(option);
    }
  }
});

function updateCredits() {
  if (user !== null) {
    let credits = names[user].credits;
    nameCredits.textContent = `${names[user].name} : ${credits} crédits`;
  }
}

function checkCredit() {
  if (user !== null) {
    if (names[user].credits < totalGlobal) {
      names[user].credits -= totalGlobal;
      window.alert("Attention vous êtes en négatif de crédits");
    }
    else {
      names[user].credits -= totalGlobal;
    }
    updateCredits();
  }
}
