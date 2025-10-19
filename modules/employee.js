var employeeModule = {
  data: [],
  initForms: function () {},
  fetchData: async function () {
    data = await fetch("data/employees.json").then((res) => res.json());
    this.renderEmployees();
  },
  addEmployee: function (employee) {
    data.push(employee);
    this.renderEmployees();
  },
  editEmployee: function (email) {
    console.log("Edit employee:", email);
    const employee = data.find((e) => e.email == email);
    //renderEmployees();
  },
  searchEmployee: function (keyword) {
    data = data.filter(
      (e) => e.name.includes(keyword) || e.email.includes(keyword)
    );
    renderEmployees();
  },
  deleteEmployee: function (email) {
    data = data.filter((e) => e.email !== email);
    this.renderEmployees();
  },
  renderEmployees: function () {
    const tableBody = document.getElementById("employee-table");
    tableBody.innerHTML = ""; // Xóa toàn bộ row cũ
    data.forEach((e) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${e.name}</td>
        <td>${e.position}</td>
        <td>${e.email}</td>
        <td>
            <button class="btn-edit">📝</button>
            <button class="btn-delete">🗑️</button>
        </td>
        `;

      row
        .querySelector(".btn-edit")
        .addEventListener("click", () => this.editEmployee(e.email));
      row
        .querySelector(".btn-delete")
        .addEventListener("click", () => this.deleteEmployee(e.email));

      tableBody.appendChild(row);
    });
  },
};

document.getElementById("addEmployeeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const email = document.getElementById("email").value;
  employeeModule.addEmployee({ name, position, email });
  e.target.reset();
});

employeeModule.fetchData();
