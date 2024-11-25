initializeEquipment()

function initializeEquipment() {
    loadEquipmentTable();
}

function loadEquipmentTable() {
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/equipment",
        type: "GET",
        success: (res) => {
            addEquipmentToTable(res.data); 
        },
        error: (err) => {
            console.error("Error loading vehicle data:", err);
        }
    });
}

function addEquipmentToTable(equipments) {
    const equipmentTableBody = document.getElementById("equipmentTableBody");

    // Clear any existing rows in the table
    equipmentTableBody.innerHTML = "";

    // Iterate through each vehicle and create table rows
    equipments.forEach((equipment) => {
        const row = document.createElement("tr");

        // Construct the row's HTML
        row.innerHTML = `
            <td class="px-6 py-4">${equipment.equipmentId || 'N/A'}</td>
            <td class="px-6 py-4">${equipment.availableCount || 'N/A'}</td>
            <td class="px-6 py-4">${equipment.name || 'N/A'}</td>
            <td class="px-6 py-4">${equipment.type || 'N/A'}</td>
            <td class="px-6 py-4">${equipment.status || 'N/A'}</td>
            <td class="px-6 py-4">${equipment.fieldCode || 'N/A'}</td>
            <td class="px-6 py-4">${equipment.staffId || 'N/A'}</td>
            <td class="px-6 py-4">
                <button class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700" onclick="editEquipment('${equipment.id}')">
                    Edit
                </button>
                <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700" onclick="deleteEquipment('${equipment.id}')">
                    Delete
                </button>
            </td>
        `;

        // Append the row to the table body
        equipmentTableBody.appendChild(row);
    });
}

// Example stub functions for Edit and Delete actions
function editEquipment(equipmentId) {
    alert(`Edit vehicle with ID: ${equipmentId}`);
}

function deleteEquipment(equipmentId) {
    alert(`Delete vehicle with ID: ${equipmentId}`);
}

// Initialize the vehicle table on page load
document.addEventListener("DOMContentLoaded", initializeVehical);






// Store Equipment Data
let equipmentData = [];

// Toggle Add Equipment Modal
function toggleAddEquipmentModal() {
    document.getElementById("addEquipmentModal").classList.toggle("hidden");
}

// Toggle Edit Equipment Modal
function toggleEditEquipmentModal() {
    document.getElementById("editEquipmentModal").classList.toggle("hidden");
}

// Add New Equipment
function addEquipment(event) {
    event.preventDefault(); // Prevent form submission
    const form = event.target;

    const newEquipment = {
        equipmentId: form.equipmentId.value.trim(),
        name: form.name.value.trim(),
        type: form.type.value.trim(),
        availableCount: parseInt(form.availableCount.value, 10),
        status: form.status.value.trim(),
    };

    equipmentData.push(newEquipment);
    updateEquipmentTable();
    form.reset();
    toggleAddEquipmentModal();
}

// Edit Existing Equipment
function editEquipment(equipmentId) {
    const equipment = equipmentData.find((item) => item.equipmentId === equipmentId);
    if (!equipment) return;

    const form = document.getElementById("editEquipmentForm");

    form.equipmentId.value = equipment.equipmentId;
    form.name.value = equipment.name;
    form.type.value = equipment.type;
    form.availableCount.value = equipment.availableCount;
    form.status.value = equipment.status;

    toggleEditEquipmentModal();
}

// Update Equipment
function updateEquipment(event) {
    event.preventDefault();
    const form = event.target;

    const updatedEquipment = {
        equipmentId: form.equipmentId.value.trim(),
        name: form.name.value.trim(),
        type: form.type.value.trim(),
        availableCount: parseInt(form.availableCount.value, 10),
        status: form.status.value.trim(),
    };

    const index = equipmentData.findIndex((item) => item.equipmentId === updatedEquipment.equipmentId);
    if (index !== -1) {
        equipmentData[index] = updatedEquipment;
        updateEquipmentTable();
        toggleEditEquipmentModal();
    }
}

// Delete Equipment
function deleteEquipment(equipmentId) {
    equipmentData = equipmentData.filter((item) => item.equipmentId !== equipmentId);
    updateEquipmentTable();
}

// Update Equipment Table
function updateEquipmentTable() {
    const tableBody = document.getElementById("equipmentTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    equipmentData.forEach((equipment) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="px-6 py-4 text-sm text-gray-800">${equipment.equipmentId}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${equipment.name}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${equipment.type}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${equipment.availableCount}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${equipment.status}</td>
            <td class="px-6 py-4 text-sm text-gray-800 flex gap-4">
                <button 
                    class="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600" 
                    onclick="editEquipment('${equipment.equipmentId}')">Edit</button>
                <button 
                    class="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600" 
                    onclick="deleteEquipment('${equipment.equipmentId}')">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Search Equipment
document.getElementById("searchInput").addEventListener("input", function (event) {
    const query = event.target.value.toLowerCase();
    const filteredData = equipmentData.filter(
        (equipment) =>
            equipment.equipmentId.toLowerCase().includes(query) ||
            equipment.name.toLowerCase().includes(query) ||
            equipment.type.toLowerCase().includes(query) ||
            equipment.status.toLowerCase().includes(query)
    );

    const tableBody = document.getElementById("equipmentTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    filteredData.forEach((equipment) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="px-6 py-4 text-sm text-gray-800">${equipment.equipmentId}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${equipment.name}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${equipment.type}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${equipment.availableCount}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${equipment.status}</td>
            <td class="px-6 py-4 text-sm text-gray-800 flex gap-4">
                <button 
                    class="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600" 
                    onclick="editEquipment('${equipment.equipmentId}')">Edit</button>
                <button 
                    class="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600" 
                    onclick="deleteEquipment('${equipment.equipmentId}')">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
});
