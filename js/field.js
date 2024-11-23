// JavaScript for Field Management

// Sample data array to store fields
let fields = [];

// Utility function to toggle the Add Field Modal
function ftoggleAddModal() {
    const addModal = document.getElementById('fieldaddModal');
    addModal.classList.toggle('hidden');
}

// Utility function to render fields in the table
function renderFields() {
    const tableBody = document.getElementById('fieldTableBody');
    tableBody.innerHTML = '';

    fields.forEach((field, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4">${field.fieldCode}</td>
            <td class="px-6 py-4">${field.fieldName}</td>
            <td class="px-6 py-4">${field.location}</td>
            <td class="px-6 py-4">${field.extentSize}</td>
            <td class="px-6 py-4">
                <img src="${field.fieldImage1}" alt="Field Image 1" class="h-16 w-16 object-cover rounded-md">
            </td>
            <td class="px-6 py-4">
                <img src="${field.fieldImage2 || '#'}" alt="Field Image 2" class="h-16 w-16 object-cover rounded-md">
            </td>
            <td class="px-6 py-4 flex gap-2">
                <button onclick="editField(${index})" 
                    class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Edit</button>
                <button onclick="deleteField(${index})" 
                    class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to add a new field
function addField(event) {
    event.preventDefault();
    const form = document.getElementById('addFieldForm');
    const formData = new FormData(form);

    const newField = {
        fieldCode: formData.get('fieldCode'),
        fieldName: formData.get('fieldName'),
        location: formData.get('location'),
        extentSize: formData.get('extentSize'),
        fieldImage1: URL.createObjectURL(formData.get('fieldImage1')),
        fieldImage2: formData.get('fieldImage2') ? URL.createObjectURL(formData.get('fieldImage2')) : null,
    };

    fields.push(newField);
    renderFields();
    ftoggleAddModal();
    form.reset();
}

// Function to delete a field
function deleteField(index) {
    if (confirm('Are you sure you want to delete this field?')) {
        fields.splice(index, 1);
        renderFields();
    }
}

// Function to edit a field (simplified to just log the field for now)
function editField(index) {
    alert(`Edit functionality for Field: ${fields[index].fieldName} (Field Code: ${fields[index].fieldCode})`);
}

// Event listener to handle search functionality
document.getElementById('searchInput').addEventListener('input', function (event) {
    const query = event.target.value.toLowerCase();
    const filteredFields = fields.filter(field =>
        field.fieldCode.toLowerCase().includes(query) ||
        field.fieldName.toLowerCase().includes(query) ||
        field.location.toLowerCase().includes(query)
    );

    const tableBody = document.getElementById('fieldTableBody');
    tableBody.innerHTML = '';

    filteredFields.forEach((field, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4">${field.fieldCode}</td>
            <td class="px-6 py-4">${field.fieldName}</td>
            <td class="px-6 py-4">${field.location}</td>
            <td class="px-6 py-4">${field.extentSize}</td>
            <td class="px-6 py-4">
                <img src="${field.fieldImage1}" alt="Field Image 1" class="h-16 w-16 object-cover rounded-md">
            </td>
            <td class="px-6 py-4">
                <img src="${field.fieldImage2 || '#'}" alt="Field Image 2" class="h-16 w-16 object-cover rounded-md">
            </td>
            <td class="px-6 py-4 flex gap-2">
                <button onclick="editField(${index})" 
                    class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Edit</button>
                <button onclick="deleteField(${index})" 
                    class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
});

// Initial rendering
renderFields();


// Variable to track if we are editing a field
let isEditing = false;
let editingFieldIndex = null;

// Utility function to toggle the modal and reset form if not editing
function ftoggleAddModal() {
    const addModal = document.getElementById('fieldaddModal');
    addModal.classList.toggle('hidden');

    if (!isEditing) {
        document.getElementById('addFieldForm').reset();
        document.querySelector('#addFieldForm button[type="submit"]').innerText = 'Add Field';
        document.querySelector('#fieldaddModal h3').innerText = 'Add New Field';
    }
}

// Function to add or update a field
function saveField(event) {
    event.preventDefault();
    const form = document.getElementById('addFieldForm');
    const formData = new FormData(form);

    const field = {
        fieldCode: formData.get('fieldCode'),
        fieldName: formData.get('fieldName'),
        location: formData.get('location'),
        extentSize: formData.get('extentSize'),
        fieldImage1: formData.get('fieldImage1') ? URL.createObjectURL(formData.get('fieldImage1')) : null,
        fieldImage2: formData.get('fieldImage2') ? URL.createObjectURL(formData.get('fieldImage2')) : null,
    };

    if (isEditing) {
        // Update the existing field
        fields[editingFieldIndex] = field;
        isEditing = false;
        editingFieldIndex = null;
    } else {
        // Add a new field
        fields.push(field);
    }

    renderFields();
    ftoggleAddModal();
    form.reset();
}

// Function to populate the form for editing
function editField(index) {
    isEditing = true;
    editingFieldIndex = index;

    const field = fields[index];
    const form = document.getElementById('addFieldForm');

    // Populate the form with the selected field data
    form.elements['fieldCode'].value = field.fieldCode;
    form.elements['fieldName'].value = field.fieldName;
    form.elements['location'].value = field.location;
    form.elements['extentSize'].value = field.extentSize;

    // Images cannot be prefilled in file inputs, so they are skipped.

    // Update modal title and button text
    document.querySelector('#addFieldForm button[type="submit"]').innerText = 'Update Field';
    document.querySelector('#fieldaddModal h3').innerText = 'Update Field';

    ftoggleAddModal();
}

// Function to delete a field
function deleteField(index) {
    if (confirm('Are you sure you want to delete this field?')) {
        fields.splice(index, 1);
        renderFields();
    }
}

// Render fields in the table
function renderFields() {
    const tableBody = document.getElementById('fieldTableBody');
    tableBody.innerHTML = '';

    fields.forEach((field, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4">${field.fieldCode}</td>
            <td class="px-6 py-4">${field.fieldName}</td>
            <td class="px-6 py-4">${field.location}</td>
            <td class="px-6 py-4">${field.extentSize}</td>
            <td class="px-6 py-4">
                <img src="${field.fieldImage1}" alt="Field Image 1" class="h-16 w-16 object-cover rounded-md">
            </td>
            <td class="px-6 py-4">
                <img src="${field.fieldImage2 || '#'}" alt="Field Image 2" class="h-16 w-16 object-cover rounded-md">
            </td>
            <td class="px-6 py-4 flex gap-2">
                <button onclick="editField(${index})" 
                    class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Edit</button>
                <button onclick="deleteField(${index})" 
                    class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Attach the saveField function to the form submission
document.getElementById('addFieldForm').addEventListener('submit', saveField);

// Initial render
renderFields();
