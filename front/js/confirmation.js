let orderId = JSON.parse(localStorage.getItem("order"));

displayOrderId(); // displayOrderId

function displayOrderId() {
  // displayOrderId
  let orderIdContainer = document.getElementById("orderId"); // aim the countainer
  orderIdContainer.innerHTML = `${orderId}`; // display the countainer
  localStorage.clear();
}
