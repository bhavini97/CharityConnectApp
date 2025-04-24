const token = localStorage.getItem("token");

async function fetchOrganisations() {
  const res = await axios.get('/admin/user', {
    headers: { Authorization: `Bearer ${token}` }
  });

  const tbody = document.querySelector("#orgTable tbody");
  tbody.innerHTML = "";

  res.data.organisations.forEach(org => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${org.username}</td>
      <td>${org.email}</td>
      <td>${org.status}</td>
      <td>
        <button onclick="changeStatus(${org.id}, 'ACCEPT')">Accept</button>
        <button onclick="deleteOrganisation(${org.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

async function deleteOrganisation(id) {
  if (confirm("Are you sure you want to delete this organisation?")) {
    const response = await axios.delete(`/admin/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    fetchOrganisations();
  }
}

async function changeStatus(id, newStatus) {
  await axios.put(`/admin/user/${id}/status`, { status: newStatus }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  fetchOrganisations();
}

window.onload = fetchOrganisations;