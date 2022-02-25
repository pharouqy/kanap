let orderId = JSON.parse(localStorage.getItem("order"));

displayOrderId(); // displayOrderId

function displayOrderId() {
  // displayOrderId
  let orderIdContainer = document.getElementById("orderId");
  orderIdContainer.innerHTML = `${orderId}`;
}
