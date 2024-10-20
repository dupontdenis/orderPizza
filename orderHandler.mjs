import { displayPizzas } from "./displayPizzas.mjs";
import { pizzas } from "./pizzas.mjs";
import { calculateTotalPrice } from "./totalPriceCalculator.mjs";
import { calculatePizzaPrice } from "./pizzaPriceCalculator.mjs";

let orderArray = [];

export function initializeOrderHandler() {
  const form = document.getElementById("pizza-form");
  const orderList = document.getElementById("order-list");
  const pizzasSelect = document.getElementById("pizzas");
  const resetButton = document.getElementById("reset-button");
  const calculatePriceButton = document.getElementById(
    "calculate-price-button"
  );

  if (
    form &&
    orderList &&
    pizzasSelect &&
    resetButton &&
    calculatePriceButton
  ) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const selectedPizzas = Array.from(
        pizzasSelect.selectedOptions,
        ({ value }) => value
      );
      console.log("Selected Pizzas:", selectedPizzas); // Debugging line
      appendOrderList(selectedPizzas);
      displayAllOrders();
    });

    resetButton.addEventListener("click", () => {
      resetOrderList();
    });

    calculatePriceButton.addEventListener("click", () => {
      displayTotalPrice();
    });
  } else {
    console.error("Required DOM elements are missing.");
  }

  // Display all pizzas when the DOM is fully loaded
  displayPizzas(pizzas);
}

function appendOrderList(selectedPizzas) {
  selectedPizzas.forEach((pizzaName) => {
    const pizza = pizzas.find((p) => p.name === pizzaName);
    if (pizza) {
      const price = calculatePizzaPrice(pizza.toppings);
      orderArray.push({ name: pizza.name, emoji: pizza.emoji, price });
    }
  });

  updateOrderList();
}

function updateOrderList() {
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = `<h2>${orderArray
    .map(
      (order) =>
        `<span class="badge rounded-pill bg-dark badge-lg mr-1">${order.emoji}</span>`
    )
    .join("")}</h2>`;

  const pizzaTable = document.getElementById("pizza-table");
  pizzaTable.innerHTML = `
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        ${orderArray
          .map(
            (order) => `
          <tr>
            <td>${order.name}</td>
            <td>$${order.price.toFixed(2)}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function resetOrderList() {
  orderArray = [];
  updateOrderList();
  document.getElementById("total-price").innerHTML = "";
  document.getElementById("pizza-table").innerHTML = `
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <!-- Pizzas will be dynamically added here -->
      </tbody>
    </table>
  `; // Clear the pizza table content and add the header
}

function displayAllOrders() {
  const selectedPizzaObjects = orderArray.map((order) => {
    return { name: order.name, price: order.price };
  });

  updateOrderList();
}

function displayTotalPrice() {
  const totalPrice = calculateTotalPrice(orderArray.map((order) => order.name));
  document.getElementById(
    "total-price"
  ).innerHTML = `<h3>Total Price: $${totalPrice.toFixed(2)}</h3>`;
}
