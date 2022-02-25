getKanaps();

function getKanaps() { // get kanap
  fetch(`http://localhost:3000/api/products`) // fetch kanap
    .then((response) => response.json()) // get response
    .then((data) => { // get data
      console.log(data);
      displayKanap(data); // display kanap
    })
    .catch((error) => { // error
      console.log(error); // error
    });
}
function displayKanap(kanap) { // display kanap
  const kanapContainer = document.getElementById("items");
  kanap.forEach((item) => {
    let urlKanap = `product.html?id=${item._id}`; // url kanap
    let kanapLink = document.createElement("a");
    kanapLink.href = urlKanap;
    kanapContainer.appendChild(kanapLink);
    let kanapArticle = document.createElement("article");
    kanapLink.appendChild(kanapArticle);
    let kanapImage = document.createElement("img");
    kanapImage.src = item.imageUrl;
    kanapImage.setAttribute("alt", item.altTxt);
    kanapArticle.appendChild(kanapImage);
    let kanapTitle = document.createElement("h3");
    kanapTitle.textContent = item.name;
    kanapArticle.appendChild(kanapTitle);
    let kanapDescription = document.createElement("p");
    kanapDescription.textContent = item.description;
    kanapArticle.appendChild(kanapDescription);
  });
}
