const id = new URLSearchParams(window.location.search).get("id"); // Récuperel'id depuis l'url

getKanap();
addToCart();

function getKanap() {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      displayKanap(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayKanap(kanap) {
  // displayKanap
  const imgContainer = document.querySelector(".item__img");
  const img = document.createElement("img");
  img.src = kanap.imageUrl;
  img.setAttribute("alt", kanap.altTxt);
  imgContainer.appendChild(img);
  const idTitle = document.getElementById("title");
  idTitle.textContent = kanap.name;
  const price = document.getElementById("price");
  price.textContent = kanap.price;
  const description = document.getElementById("description");
  description.textContent = kanap.description;
  colorSelector(kanap.colors); // colorSelector
}

function colorSelector(colors) {
  // colorSelector
  const colorContainer = document.getElementById("colors");
  colors.forEach((color) => {
    let colorOption = document.createElement("option");
    colorOption.value = color;
    colorOption.textContent = color;
    colorContainer.appendChild(colorOption);
  });
}

function addToCart() {
  const btnAddToCart = document.getElementById("addToCart"); // get addToCart button
  btnAddToCart.addEventListener("click", () => {
    // addToCart
    let cart = JSON.parse(localStorage.getItem("cart"));
    let title = document.getElementById("title").textContent; // get name
    let color = document.getElementById("colors").value; // get color
    let quantity = document.getElementById("quantity").value; // get quantity
    let cartItem = {
      // create cartItem
      id: id, // id
      title: title, // title
      color: color, // color
      quantity: quantity, // quantity
    }; // create object
    if (quantity > 0 && quantity <= 100 && color !== "") {
      // if quantity > 0
      if (localStorage.getItem("cart") === null) {
        cart = []; // initialize cart
        cart.push(cartItem); // push cartItem
        localStorage.setItem("cart", JSON.stringify(cart)); // Mettre le tableau dans le local storage
        window.location.href = "cart.html"; // redirect to cart
      } else {
        let flagId = false; // flag id
        for (let el in cart) {
          if (title === cart[el].title && color === cart[el].color) {
            // if title and color is the same
            cart[el].quantity =
              parseInt(cart[el].quantity) + parseInt(quantity);
            flagId = true;
            break; // Arreter la boucle
          }
        }
        if (flagId === false) {
          // if title and color is not the same
          cart.push(cartItem);
        }
        localStorage.setItem("cart", JSON.stringify(cart)); // set cart
        window.location.href = "cart.html"; // redirect to cart
      }
    } else {
      alert(
        "La quantité doit etre superieur à 0 && une couleur doit etre choisie"
      );
    }
  });
}
