import { toppingPrices } from "./toppingPrices.mjs";

export function calculatePizzaPrice(toppings) {
  return toppings.reduce((total, topping) => {
    return total + (toppingPrices.get(topping) || 0);
  }, 0);
}
