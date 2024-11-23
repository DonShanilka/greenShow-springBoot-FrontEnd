const fieldTableBody = document.getElementById('fieldTableBody');

// Toggle Add Modal
function toggleAddModal() {
    const modal = document.getElementById('fieldAddModal');
    modal.classList.toggle('hidden');
}

// Toggle Edit Modal
function toggleEditModal() {
    const modal = document.getElementById('fieldEditModal');
    modal.classList.toggle('hidden');
}

// Add Field
function addField(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const fieldCode = formData.get('fieldCode');
    const fieldName = formData.get('fieldName');
    const location = formData.get('location');
    const extentSize = formData.get('extentSize');
    const fieldImage1 = formData.get('fieldImage1').name;
    const fieldImage2 = formData.get('fieldImage2').name;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="px-6 py-4">${fieldCode}</td>
        <td class="px-6 py-4">${fieldName}</td>
        <td class="px-6 py-4">${location}</td>
        <td class="px-6 py-4">${extentSize}</td>
        <td class="px-6 py-4">
            <img src="${fieldImage1}" alt="Image 1" class="h-16 w-16 inline-block object-cover rounded-full mr-2">
            <img src="${fieldImage2}" alt="Image 2" class="h-16 w-16 inline-block object-cover rounded-full">
        </td>
        <td class="px-6 py-4 space-x-2">
            <button onclick="toggleEditModal()" class="text-blue-500 hover:underline">Edit</button>
            <button onclick="deleteRow(this)" class="text-red-500 hover:underline">Delete</button>
        </td>
    `;
    fieldTableBody.appendChild(newRow);
    toggleAddModal();
    event.target.reset();
}

// Delete Row
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.remove();
}
