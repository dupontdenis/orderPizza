import { pizzas } from "./pizzas.mjs";
import { displayPizzas } from "./displayPizzas.mjs";
import { initializeOrderHandler } from "./orderHandler.mjs";

initializeOrderHandler();
displayPizzas(pizzas);
