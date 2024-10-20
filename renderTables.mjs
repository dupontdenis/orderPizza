export function renderOrderList(orderArray) {
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = `<h2>${orderArray
    .map(
      (order) =>
        `<span class="badge rounded-pill bg-dark badge-lg mr-1">${order.emoji}</span>`
    )
    .join("")}</h2>`;
}

export function renderPizzaTable(orderArray) {
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
