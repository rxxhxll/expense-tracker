let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const form = document.getElementById("form");
const list = document.getElementById("list");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const emptyMsg = document.getElementById("empty");
const submitBtn = document.getElementById("submitBtn");

let chart;
let editId = null;

function formatCurrency(num) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(num);
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const type = document.getElementById("type").value;


  if (!title || isNaN(amount) || amount <= 0) {
    alert("Enter valid data");
    return;
  }

  if (amount > 1e9) {
    alert("Amount too large");
    return;
  }

  
  const transaction = {
    id: editId !== null ? editId : Date.now(),
    title,
    amount,
    category,
    type
  };

  if (editId !== null) {
    
    transactions = transactions.map(t =>
      t.id === editId ? transaction : t
    );
    editId = null;
    submitBtn.textContent = "Add";
  } else {
    
    transactions.push(transaction);
  }

  updateUI();
  form.reset();
});

function editTransaction(id) {
  const t = transactions.find(t => t.id === id);
  if (!t) return;

  document.getElementById("title").value = t.title;
  document.getElementById("amount").value = t.amount;
  document.getElementById("category").value = t.category;
  document.getElementById("type").value = t.type;

  editId = id;
  submitBtn.textContent = "Update";
}


function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateUI();
}


function updateUI() {
  localStorage.setItem("transactions", JSON.stringify(transactions));

  list.innerHTML = "";

  let income = 0;
  let expense = 0;
  const categoryMap = {};

  transactions.forEach(t => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expense += t.amount;
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }

    const div = document.createElement("div");
    div.className = `transaction ${t.type}`;

    div.innerHTML = `
      <span>
        ${t.title}<br>
        <small>${t.category}</small>
      </span>

      <span>
        ${t.type === "income" ? "+" : "-"}
        ${formatCurrency(t.amount)}
        <button onclick="editTransaction(${t.id})">Edit</button>
        <button onclick="deleteTransaction(${t.id})">X</button>
      </span>
    `;

    list.appendChild(div);
  });

  incomeEl.textContent = formatCurrency(income);
  expenseEl.textContent = formatCurrency(expense);
  balanceEl.textContent = formatCurrency(income - expense);

  emptyMsg.style.display = transactions.length === 0 ? "block" : "none";

  updateChart(categoryMap);
}

function updateChart(data) {
  const ctx = document.getElementById("chart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data)
      }]
    }
  });
}

updateUI();