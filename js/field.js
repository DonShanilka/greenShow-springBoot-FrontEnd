// Toggle Add Modal
function ftoggleAddModal() {
    const addModal = document.getElementById("faddModal");
    addModal.classList.toggle("hidden");
}

// Toggle Edit Modal
function ftoggleEditModal() {
    const editModal = document.getElementById("feditModal");
    editModal.classList.toggle("hidden");
}

// Add Field
function addField(event) {
    event.preventDefault();

    const form = document.getElementById("addFieldForm");
    const fieldTableBody = document.getElementById("fieldTableBody");

    // Extract form data
    const fieldCode = form.fieldCode.value.trim();
    const fieldName = form.fieldName.value.trim();
    const location = form.location.value.trim();
    const extentSize = form.extentSize.value.trim();
    const fieldImage1 = form.fieldImage1.files[0]?.name || "No Image";
    const fieldImage2 = form.fieldImage2.files[0]?.name || "No Image";

    // Create new row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td class="px-6 py-4">${fieldCode}</td>
        <td class="px-6 py-4">${fieldName}</td>
        <td class="px-6 py-4">${location}</td>
        <td class="px-6 py-4">${extentSize}</td>
        <td class="px-6 py-4">${fieldImage1}</td>
        <td class="px-6 py-4">${fieldImage2}</td>
        <td class="px-6 py-4 flex gap-2">
            <button onclick="editField(this)" class="text-blue-500 hover:text-blue-600">
                <i class="fas fa-edit text-lg"></i>
            </button>
            <button onclick="deleteField(this)" class="text-red-500 hover:text-red-600">
                <i class="fas fa-trash text-lg"></i>
            </button>
        </td>
    `;

    // Append to table
    fieldTableBody.appendChild(newRow);

    // Reset form and close modal
    form.reset();
    ftoggleAddModal();
}

// Edit Field
function editField(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName("td");

    // Populate edit form
    const form = document.getElementById("editFieldForm");
    form.editId.value = row.rowIndex; // Store row index for update reference
    form.fieldCode.value = cells[0].textContent;
    form.fieldName.value = cells[1].textContent;
    form.location.value = cells[2].textContent;
    form.extentSize.value = cells[3].textContent;

    ftoggleEditModal();
}

// Update Field
function updateField(event) {
    event.preventDefault();

    const form = document.getElementById("editFieldForm");
    const rowIndex = form.editId.value; // Get the stored row index
    const fieldTableBody = document.getElementById("fieldTableBody");
    const row = fieldTableBody.rows[rowIndex - 1]; // Rows are 0-indexed

    // Update row cells
    const cells = row.getElementsByTagName("td");
    cells[0].textContent = form.fieldCode.value.trim();
    cells[1].textContent = form.fieldName.value.trim();
    cells[2].textContent = form.location.value.trim();
    cells[3].textContent = form.extentSize.value.trim();
    cells[4].textContent = form.fieldImage1.files[0]?.name || cells[4].textContent;
    cells[5].textContent = form.fieldImage2.files[0]?.name || cells[5].textContent;

    // Close modal
    ftoggleEditModal();
}

// Delete Field
function deleteField(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}
