let cart = JSON.parse(localStorage.getItem("cart")); // Local storage

getData(); // getData
getForm(); // getForm
postForm(); // postForm

function getData() {
  // getData
  if (cart !== null) {
    // if cart is not null
    fetch(`http://localhost:3000/api/products`) // fetch kanap
      .then((response) => response.json()) // get response
      .then((data) => {
        // get data
        let cartContainer = document.getElementById("cart__items"); // cart__items
        data.forEach((item) => {
          // for each item in data
          cart.forEach((element) => {
            // for each element in cart
            if (element.id === item._id) {
              // if element.id is equal to item._id
              let article = document.createElement("article");
              article.classList.add("cart__item");
              article.setAttribute("data-id", item._id); // set dataId
              article.setAttribute("data-color", element.color); // set dataColor
              cartContainer.appendChild(article);
              let divImg = document.createElement("div");
              divImg.classList.add("cart__item__img");
              article.appendChild(divImg);
              let img = document.createElement("img");
              img.setAttribute("src", item.imageUrl);
              divImg.appendChild(img);
              let divInfo = document.createElement("div");
              divInfo.classList.add("cart__item__content");
              article.appendChild(divInfo);
              let divDescription = document.createElement("div");
              divDescription.classList.add("cart__item__content__description");
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
              divSettings.classList.add("cart__item__content__settings");
              divInfo.appendChild(divSettings);
              let divQuantity = document.createElement("div");
              divQuantity.classList.add(
                "cart__item__content__settings__quantity"
              );
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
              displayTotalPriceQuantity(item); // displayTotalPrice&Quantity
            }
          });
        });
        deleteItem(); // deleteItem
      })
      .catch((error) => {
        // error
        console.log(error); // error
      });
  } else {
    // if cart is null
    alert("Votre panier est vide 1");
  }
}

function changeQuantity(input) {
  // changeQuantity
  input.addEventListener("change", (e) => {
    // on change
    e.stopPropagation(); // stop propagation
    console.log(e.target.value); // e.target.value
    //let value = e.target.value; // value
    if (e.target.value > 0 && e.target.value <= 100) {
      let values = document.getElementsByClassName("itemQuantity");
      for (let i = 0; i < values.length; i++) {
        // iterate over the values
        for (let j = 0; j < cart.length; j++) {
          // iterate over the cart
          // for each value
          let value = values[i].value;
          let dataId =
            document.getElementsByClassName("cart__item")[i].dataset.id; // get dataId
          let dataColor =
            document.getElementsByClassName("cart__item")[i].dataset.color; // get dataColor
          if (dataId === cart[j].id && dataColor === cart[j].color) {
            // if dataId and dataColor are equal to cart[i]
            cart[j].quantity = value;
            localStorage.setItem("cart", JSON.stringify(cart)); // set cart
            location.reload(); // reload
          }
        }
      }
    } else {
      for (let i = 0; i < cart.length; i++) {
        e.target.value = cart[i].quantity;
        alert("Veuillez entrer une valeur entre 1 et 100");
        break;
      }
    }
  });
}

function displayTotalPriceQuantity(data) {
  // displayTotalPrice&Quantity
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
  if (deleteButtons.length > 0) {
    // if deleteButtons is not null
    for (let i = 0; i < deleteButtons.length; i++) {
      // for each button
      deleteButtons[i].addEventListener("click", (e) => {
        // on click
        e.stopPropagation(); // stop propagation
        let dataId =
          document.getElementsByClassName("cart__item")[i].dataset.id; // get dataId
        let dataColor =
          document.getElementsByClassName("cart__item")[i].dataset.color; // get dataColor
        cart.forEach((element, index) => {
          // for each element in cart
          if (element.id === dataId && element.color === dataColor) {
            // if dataId and dataColor are equal to cart[i]
            cart.splice(index, 1); // delete element
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
          }
        });
      });
    }
  } else {
    // if deleteButtons.length is 0
    localStorage.clear();
    location.reload();
  }
}

// Regex check inputs
function validateEmail(email) {
  // validateEmail
  const regex =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(String(email).toLowerCase());
}
function onlyLetter(word) {
  const regexOnlyLetter = /^[a-zA-Z ,.'-]+$/; // only letters
  return regexOnlyLetter.test(String(word).toLowerCase());
}
function validateAdress(adress) {
  // validateAdress
  const regex = /^[a-zA-Z0-9\s\-\°]+$/; // only letters and numbers
  return regex.test(String(adress).toLowerCase());
}

function getForm() {
  // check form validity
  let form = document.getElementsByClassName("cart__order__form");
  for (inputs of form[0]) {
    // for each input
    inputs.addEventListener("change", (e) => {
      // on blur
      if (e.target.name === "firstName") {
        let firstName = document.getElementById("firstNameErrorMsg");
        // if input name is firstName
        if (!onlyLetter(e.target.value)) {
          // if only letters
          firstName.innerHTML = "Veuillez introduire un prénom valide";
        } else {
          firstName.innerHTML = "";
        }
      } else if (e.target.name === "lastName") {
        let lastName = document.getElementById("lastNameErrorMsg");
        // if input name is lastName
        if (!onlyLetter(e.target.value)) {
          // if only letters
          lastName.innerHTML = "Veuillez introduire un nom valide";
        } else {
          lastName.innerHTML = "";
        }
      } else if (e.target.name === "email") {
        let email = document.getElementById("emailErrorMsg");
        // if input name is email
        if (!validateEmail(e.target.value)) {
          // if email is valid
          email.innerHTML = "Veuillez introduire un email valide";
        } else {
          email.innerHTML = "";
        }
      } else if (e.target.name === "address") {
        let adress = document.getElementById("addressErrorMsg");
        // if input name is adress
        if (!validateAdress(e.target.value)) {
          // if adress is valid
          adress.innerHTML = "Veuillez introduire une adresse valide";
        } else {
          adress.innerHTML = "";
        }
      } else if (e.target.name === "city") {
        let city = document.getElementById("cityErrorMsg");
        // if input name is city
        if (!onlyLetter(e.target.value)) {
          // if only letters
          city.innerHTML = "Veuillez introduire une ville valide";
        } else {
          city.innerHTML = "";
        }
      }
    });
  }
}

function postForm() {
  // get orderId from server
  let submitForm = document.getElementById("order");
  submitForm.addEventListener("click", (e) => {
    e.preventDefault();
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;

    let arrIds = []; // array of ids
    if (cart !== null) {
      cart.map((element) => {
        // map cart
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
      if (
        arrIds !== null &&
        firstName !== "" &&
        onlyLetter(firstName) !== false &&
        lastName !== "" &&
        onlyLetter(lastName) !== false &&
        email !== "" &&
        validateEmail(email) !== false &&
        address !== "" &&
        validateAdress(address) !== false &&
        city !== "" &&
        onlyLetter(city) !== false
      ) {
        fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.clear(); // clear localStorage
            localStorage.setItem("order", JSON.stringify(data.orderId)); // set orderId
            window.location.href = "confirmation.html?orderid=" + data.orderId; // redirect to confirmation page
          })
          .catch((err) => console.log(err));
      } else {
        alert(
          "Veuillez remplir tous les champs && choisir au moins un produit"
        );
      }
    } else {
      alert("Votre panier est vide 2");
    }
  });
}
