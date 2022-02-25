const id = new URLSearchParams(window.location.search).get("id");

getKanap();
addToCart();

function getKanap() {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      displayKanap(data);
      console.log(data);
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
  const btnAddToCart = document.getElementById("addToCart");
  btnAddToCart.addEventListener("click", () => {
    // addToCart
    let cart = JSON.parse(localStorage.getItem("cart"));
    let title = document.getElementById("title").textContent; // get name
    //let price = document.getElementById("price").textContent; // get price
    let color = document.getElementById("colors").value; // get color
    let quantity = document.getElementById("quantity").value; // get quantity
    //let total = price * quantity; // get total
    let cartItem = {
      // create cartItem
      id : id,
      title: title,
      //price: price,
      color: color,
      quantity: quantity,
      //total: total,
    }; // create object
    if (quantity > 0) {
      // if quantity > 0
      if (localStorage.getItem("cart") === null) {
        cart = [];
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "cart.html";
      } else {
        let flagId = false;
        for (let el in cart) {
          if (title === cart[el].title && color === cart[el].color) {
            // if title and color is the same
            cart[el].quantity =
              parseInt(cart[el].quantity) + parseInt(quantity);
            flagId = true;
            break;
          }
        }
        if (flagId === false) {
          // if title and color is not the same
          cart.push(cartItem);
        }
        localStorage.setItem("cart", JSON.stringify(cart)); // set cart
        window.location.href = "cart.html";
      }
    }
  });
}
