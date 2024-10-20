export function displayPizzas(pizzas, clearContent = true) {
  const pizzaTableElement = document.getElementById("pizza-table");

  // Clear the existing content if clearContent is true
  if (clearContent) {
    pizzaTableElement.innerHTML = "";
  }

  if (pizzas.length === 0) {
    pizzaTableElement.innerHTML = "<p>No pizzas available.</p>";
    return;
  }

  const headers = Object.keys(pizzas[0]);

  const tableHTML = `
    <table class="table table-striped table-hover table-bordered">
      <thead class="thead-dark">
        <tr>
          ${headers
            .map(
              (header) =>
                `<th>${header.charAt(0).toUpperCase() + header.slice(1)}</th>`
            )
            .join("")}
        </tr>
      </thead>
      <tbody>
        ${pizzas
          .map(
            (pizza) => `
          <tr>
            ${headers
              .map(
                (header) =>
                  `<td>${
                    Array.isArray(pizza[header])
                      ? pizza[header].join(", ")
                      : pizza[header]
                  }</td>`
              )
              .join("")}
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;

  pizzaTableElement.innerHTML += tableHTML;
}
