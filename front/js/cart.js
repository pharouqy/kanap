let cart = JSON.parse(localStorage.getItem("cart"));

getData(); // getData
getForm(); // getForm
postForm(); // postForm

function getData() {
  // getData
  fetch(`http://localhost:3000/api/products`) // fetch kanap
    .then((response) => response.json()) // get response
    .then((data) => {
      // get data
      data.forEach((item) => {
        // for each item in data
        let cartContainer = document.getElementById("cart__items");
        cart.forEach((element) => {
          // for each element in cart
          if (element.id === item._id) {
            let article = document.createElement("article");
            article.classList.add("cart__item");
            article.setAttribute("data-id", item._id);
            article.setAttribute("data-color", element.color);
            cartContainer.appendChild(article);
            let divImg = document.createElement("div");
            divImg.classList.add("cart__item__img");
            article.appendChild(divImg);
            let img = document.createElement("img");
            img.setAttribute("src", item.imageUrl);
            divImg.appendChild(img);
            let divInfo = document.createElement("div");
            divInfo.classList.add("cart__item__info");
            article.appendChild(divInfo);
            let divDescription = document.createElement("div");
            divDescription.classList.add("cart__item__description");
            divInfo.appendChild(divDescription);
            let h2 = document.createElement("h2");
            h2.innerHTML = item.name;
            divDescription.appendChild(h2);
            let color = document.createElement("p");
            color.innerHTML = element.color;
            divDescription.appendChild(color);
            let price = document.createElement("p");
            price.innerHTML = `${item.price} €`;
            divDescription.appendChild(price);
            let divSettings = document.createElement("div");
            divSettings.classList.add("cart__item__settings");
            divInfo.appendChild(divSettings);
            let divQuantity = document.createElement("div");
            divQuantity.classList.add("cart__item__quantity");
            divSettings.appendChild(divQuantity);
            let titleQuant = document.createElement("p");
            titleQuant.innerHTML = `Qté : `;
            divSettings.appendChild(titleQuant);
            let inputQuant = document.createElement("input");
            inputQuant.classList.add("itemQuantity");
            inputQuant.setAttribute("type", "number");
            inputQuant.setAttribute("value", element.quantity);
            inputQuant.setAttribute("min", "1");
            inputQuant.setAttribute("max", "100");
            changeQuantity(inputQuant); // changeQuantity
            divSettings.appendChild(inputQuant);
            let divDelete = document.createElement("div");
            divDelete.classList.add("cart__item__content__settings__delete");
            divSettings.appendChild(divDelete);
            let buttonDelete = document.createElement("button");
            buttonDelete.classList.add("deleteItem");
            buttonDelete.innerHTML = "Supprimer";
            divDelete.appendChild(buttonDelete);
            displayTotalPrice(item); // displayTotalPrice&Quantity
          }
        });
      });
      deleteItem(); // deleteItem
    })
    .catch((error) => {
      // error
      console.log(error); // error
    });
}

function changeQuantity(input) {
  // changeQuantity
  input.addEventListener("change", () => {
    // on change
    let values = document.getElementsByClassName("itemQuantity");
    for (let i = 0; i < values.length; i++) {
      // for each value
      let value = values[i].value;
      let dataId = document.getElementsByClassName("cart__item")[i].dataset.id; // get dataId
      let dataColor =
        document.getElementsByClassName("cart__item")[i].dataset.color; // get dataColor
      if (dataId === cart[i].id && dataColor === cart[i].color) {
        // if dataId and dataColor are equal to cart[i]
        cart[i].quantity = value;
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      }
    }
  });
}

function displayTotalPrice(data) {
  let totalQuantity = document.getElementById("totalQuantity");
  let totalPrice = document.getElementById("totalPrice");
  let total = 0;
  let quantity = 0;
  cart.forEach((element) => {
    total += parseInt(element.quantity) * parseInt(data.price);
    quantity += parseInt(element.quantity);
  });
  totalQuantity.innerHTML = `${quantity}`;
  totalPrice.innerHTML = `${total}`;
}

function deleteItem() {
  // deleteItem
  let deleteButtons = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteButtons.length; i++) {
    // for each button
    deleteButtons[i].addEventListener("click", (e) => {
      // on click
      e.stopPropagation(); // stop propagation
      let dataId = document.getElementsByClassName("cart__item")[i].dataset.id; // get dataId
      let dataColor =
        document.getElementsByClassName("cart__item")[i].dataset.color; // get dataColor
      cart.forEach((element, index) => {
        // for each element in cart
        if (element.id === dataId && element.color === dataColor) {
          // if dataId and dataColor are equal to cart[i]
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        }
      });
    });
  }
}

// Regex check inputs
function validateEmail(email) { // validateEmail
  const regex =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(String(email).toLowerCase());
}
function onlyLetter(word) {
  const regexOnlyLetter = /^[a-zA-Z ,.'-]+$/; // only letters
  return regexOnlyLetter.test(String(word).toLowerCase());
}
function validateAdress(adress) { // validateAdress
  const regex = /^[a-zA-Z0-9\s\-]+$/;
  return regex.test(String(adress).toLowerCase());
}

function getForm() {
  let form = document.getElementsByClassName("cart__order__form");
  for (inputs of form[0]) {
    // for each input
    inputs.addEventListener("change", (e) => {
      // on blur
      if (e.target.name === "firstName") {
        // if input name is firstName
        if (!onlyLetter(e.target.value)) {
          // if only letters
          let firstName = document.getElementById("firstNameErrorMsg");
          firstName.innerHTML = "Veuillez introduire un prénom valide";
        }
      } else if (e.target.name === "lastName") {
        // if input name is lastName
        if (!onlyLetter(e.target.value)) {
          // if only letters
          let lastName = document.getElementById("lastNameErrorMsg");
          lastName.innerHTML = "Veuillez introduire un nom valide";
        }
      } else if (e.target.name === "email") {
        // if input name is email
        if (!validateEmail(e.target.value)) {
          // if email is valid
          let email = document.getElementById("emailErrorMsg");
          email.innerHTML = "Veuillez introduire un email valide";
        }
      } else if (e.target.name === "adress") {
        // if input name is adress
        if (!validateAdress(e.target.value)) {
          // if adress is valid
          let adress = document.getElementById("adressErrorMsg");
          adress.innerHTML = "Veuillez introduire une adresse valide";
        }
      } else if (e.target.name === "city") {
        // if input name is city
        if (!onlyLetter(e.target.value)) {
          // if only letters
          let city = document.getElementById("cityErrorMsg");
          city.innerHTML = "Veuillez introduire une ville valide";
        }
      }
    });
  }
}

function postForm() {
  let submitForm = document.getElementById("order");
  submitForm.addEventListener("click", (e) => {
    e.preventDefault();
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;

    let arrIds = [];
    cart.map((element) => { // map cart
      return arrIds.push(element.id);
    });
    const order = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        city: city,
      },
      products: arrIds,
    };
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        localStorage.setItem("order", JSON.stringify(data.orderId));
        window.location.href = "confirmation.html";
      })
      .catch((err) => console.log(err));
  });
}
