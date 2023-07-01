const form = document.getElementById('add-token-form');
const table = document.getElementById('token-table');

// Function to add row to table
function addRowToTable(token) {
  const row = table.insertRow();
  row.insertCell().textContent = token.name;
  row.insertCell().textContent = token.lightness;
  row.insertCell().textContent = token.chroma;
  row.insertCell().textContent = token.hue;
  row.insertCell().textContent = token.contrast_ratio;

  // Add delete button to each row
  const deleteCell = row.insertCell();
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteToken(token.id, row));
  deleteCell.appendChild(deleteButton);
}

// Function to delete token
function deleteToken(id, row) {
  fetch(`/tokens/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    // Remove row from table
    row.remove();
  });
}

// Add event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const lightness = document.getElementById('lightness').value;
  const chroma = document.getElementById('chroma').value;
  const hue = document.getElementById('hue').value;
  const contrast_ratio = document.getElementById('contrast_ratio').value;
  
  fetch('/tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, lightness, chroma, hue, contrast_ratio }),
  })
  .then(response => response.json())
  .then(data => {
    // Add new token to table
    addRowToTable({ id: data.id, name, lightness, chroma, hue, contrast_ratio });
  });
});

// Load existing tokens
fetch('/tokens')
.then(response => response.json())
.then(data => {
  for (const token of data) {
    addRowToTable(token);
  }
});
