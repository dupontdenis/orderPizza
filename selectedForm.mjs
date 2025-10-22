import { displayPizzas } from "./displayPizzas.mjs";
import { pizzas } from "./pizzas.mjs";

let orderArray = [];

export function initializeForm() {
  const form = document.getElementById("pizza-form");
  const orderList = document.getElementById("order-list");
  const pizzasSelect = document.getElementById("selectPizza");
  const resetButton = document.getElementById("reset-button");

  if (form && orderList && pizzasSelect && resetButton) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const selectedPizzas = Array.from(
        pizzasSelect.selectedOptions,
        ({ value }) => value
      );
      appendOrderList(selectedPizzas);
      displayAllOrders();
    });

    resetButton.addEventListener("click", () => {
      resetOrderList();
    });
  } else {
    console.error("Required DOM elements are missing.");
  }

  // Display all pizzas when the DOM is fully loaded
  displayPizzas(pizzas);
}

function appendOrderList(selectedPizzas) {
  const pizzaEmojis = {
    Pepperoni: "🍕",
    Vegetarian: "🥗",
    "Meat Lovers": "🥩",
    Hawaiian: "🍍",
    Margherita: "🍅",
  };

  selectedPizzas.forEach((pizza) => {
    orderArray.push(pizzaEmojis[pizza]);
  });

  updateOrderList();
}

function updateOrderList() {
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = `<h2>${orderArray
    .map(
      (emoji) =>
        `<span class="badge rounded-pill bg-dark badge-lg mr-1">${emoji}</span>`
    )
    .join("")}</h2>`;
}

function resetOrderList() {
  orderArray = [];
  updateOrderList();
}

function displayAllOrders() {
  const selectedPizzaObjects = orderArray
    .map((emoji) => {
      return pizzas.find((pizza) => {
        const pizzaEmojis = {
          Pepperoni: "🍕",
          Vegetarian: "🥗",
          "Meat Lovers": "🥩",
          Hawaiian: "🍍",
          Margherita: "🍅",
        };
        return pizzaEmojis[pizza.name] === emoji;
      });
    })
    .filter(Boolean);

  displayPizzas(selectedPizzaObjects);
}
