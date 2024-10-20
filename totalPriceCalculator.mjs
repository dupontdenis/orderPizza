import { pizzas } from "./pizzas.mjs";
import { calculatePizzaPrice } from "./pizzaPriceCalculator.mjs";

export function calculateTotalPrice(orderArray) {
  const totalPrice = orderArray.reduce((total, pizzaName) => {
    const pizza = pizzas.find((p) => p.name === pizzaName);
    if (pizza) {
      return total + calculatePizzaPrice(pizza.toppings);
    }
    return total;
  }, 0);

  return totalPrice;
}
