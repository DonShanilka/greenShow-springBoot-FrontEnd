function initializeVehical() {
    loadVehicalTable();
}

function loadVehicalTable() {
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/vehicle",
        type: "GET",
        success: (res) => {
            // Assuming the response contains a 'data' field with an array of vehicles
            if (Array.isArray(res)) {
                addVehicalToTable(res); // If the response is directly an array
            } else if (res.data && Array.isArray(res.data)) {
                addVehicalToTable(res.data); // If the response contains a 'data' property
            } else {
                console.error("Unexpected response format:", res);
            }
        },
        error: (err) => {
            console.error("Error loading vehicle data:", err);
        }
    });
}

function addVehicalToTable(vehicles) {
    const vehicleTableBody = document.getElementById("vehicleTableBody");

    // Clear any existing rows in the table
    vehicleTableBody.innerHTML = "";

    // Validate that vehicles is an array
    if (!Array.isArray(vehicles)) {
        console.error("Invalid vehicle data format:", vehicles);
        return;
    }

    // Iterate through each vehicle and create table rows
    vehicles.forEach((vehicle) => {
        const row = document.createElement("tr");

        // Construct the row's HTML
        row.innerHTML = `
            <td class="px-6 py-4">${vehicle.vehicleCode || 'N/A'}</td>
            <td class="px-6 py-4">${vehicle.licensePlate || 'N/A'}</td>
            <td class="px-6 py-4">${vehicle.category || 'N/A'}</td>
            <td class="px-6 py-4">${vehicle.fuelType || 'N/A'}</td>
            <td class="px-6 py-4">${vehicle.status || 'N/A'}</td>
            <td class="px-6 py-4">${vehicle.remarks || 'N/A'}</td>
            <td class="px-6 py-4">
                <button class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700" onclick="editVehicle('${vehicle.id}')">
                    Edit
                </button>
                <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700" onclick="deleteVehicle('${vehicle.id}')">
                    Delete
                </button>
            </td>
        `;

        // Append the row to the table body
        vehicleTableBody.appendChild(row);
    });
}

// Example stub functions for Edit and Delete actions
function editVehicle(vehicleId) {
    alert(`Edit vehicle with ID: ${vehicleId}`);
}

function deleteVehicle(vehicleId) {
    alert(`Delete vehicle with ID: ${vehicleId}`);
}

// Initialize the vehicle table on page load
document.addEventListener("DOMContentLoaded", initializeVehical);











// Handle Add and Edit Vehicle Modal toggling
function toggleAddVehicleModal() {
    document.getElementById('addVehicleModal').classList.toggle('hidden');
}

function toggleEditVehicleModal() {
    document.getElementById('editVehicleModal').classList.toggle('hidden');
}

// Add new vehicle
function addVehicle(event) {
    event.preventDefault();
    const form = event.target;
    const newVehicle = {
        vehicleCode: form.vehicleCode.value,
        licensePlate: form.licensePlate.value,
        category: form.category.value,
        fuelType: form.fuelType.value,
        status: form.status.value,
        remarks: form.remarks.value,
    };
    vehicleData.push(newVehicle);
    updateVehicleTable();
    form.reset();
    toggleAddVehicleModal();
}

// Update vehicle information
function updateVehicle(event) {
    event.preventDefault();
    const form = event.target;
    const updatedVehicle = {
        vehicleCode: form.vehicleCode.value,
        licensePlate: form.licensePlate.value,
        category: form.category.value,
        fuelType: form.fuelType.value,
        status: form.status.value,
        remarks: form.remarks.value,
    };
    const index = vehicleData.findIndex(v => v.vehicleCode === form.vehicleCode.value);
    vehicleData[index] = updatedVehicle;
    updateVehicleTable();
    form.reset();
    toggleEditVehicleModal();
}

// Delete vehicle
function deleteVehicle(vehicleCode) {
    vehicleData = vehicleData.filter(vehicle => vehicle.vehicleCode !== vehicleCode);
    updateVehicleTable();
}

// Edit vehicle and populate the form for editing
function editVehicle(vehicleCode) {
    const vehicle = vehicleData.find(v => v.vehicleCode === vehicleCode);
    const form = document.getElementById('editVehicleForm');
    
    // Populate the form fields with vehicle data
    form.vehicleCode.value = vehicle.vehicleCode;
    form.licensePlate.value = vehicle.licensePlate;
    form.category.value = vehicle.category;
    form.fuelType.value = vehicle.fuelType;
    form.status.value = vehicle.status;
    form.remarks.value = vehicle.remarks;

    toggleEditVehicleModal(); // Open the modal
}

// Vehicle data array
let vehicleData = [];

// Update table with new vehicle data
function updateVehicleTable() {
    const tableBody = document.getElementById('vehicleTableBody');
    tableBody.innerHTML = '';
    vehicleData.forEach(vehicle => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 text-sm text-gray-800">${vehicle.vehicleCode}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${vehicle.licensePlate}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${vehicle.category}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${vehicle.fuelType}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${vehicle.status}</td>
            <td class="px-6 py-4 text-sm text-gray-800">
                <img src="${vehicle.remarks}" alt="Vehicle Image" class="w-16 h-16 object-cover rounded-lg">
            </td>
            <td class="px-6 py-4 text-sm text-gray-800">
                <span onclick="editVehicle('${vehicle.vehicleCode}')" class="icon-btn text-blue-500 hover:text-blue-600">
                    <i class="fas fa-edit"></i>
                </span>
                <span onclick="deleteVehicle('${vehicle.vehicleCode}')" class="icon-btn text-red-500 hover:text-red-600">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize table with initial vehicle data
document.addEventListener('DOMContentLoaded', updateVehicleTable);
