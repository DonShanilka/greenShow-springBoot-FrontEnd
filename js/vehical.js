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
        image: form.image.files[0] ? URL.createObjectURL(form.image.files[0]) : ''
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
        image: form.image.files[0] ? URL.createObjectURL(form.image.files[0]) : ''
    };
    const index = vehicleData.findIndex(v => v.vehicleCode === form.vehicleCode.value);
    vehicleData[index] = updatedVehicle;
    updateVehicleTable();
    form.reset();
    toggleEditVehicleModal();
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
                <img src="${vehicle.image}" alt="Vehicle Image" class="w-16 h-16 object-cover rounded-lg">
            </td>
            <td class="px-6 py-4 text-sm text-gray-800">
                <button onclick="editVehicle('${vehicle.vehicleCode}')" class="text-blue-600 hover:text-blue-800">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize table with initial vehicle data
document.addEventListener('DOMContentLoaded', updateVehicleTable);