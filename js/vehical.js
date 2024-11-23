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
