function initializeVehical() {
    loadVehicalTable();
    loadStaffOnVehicle();
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
            <td class="px-6 text-center py-4">${vehicle.vehicleCode || 'N/A'}</td>
            <td class="px-6 text-center py-4">${vehicle.licensePlate || 'N/A'}</td>
            <td class="px-6 text-center py-4">${vehicle.category || 'N/A'}</td>
            <td class="px-6 text-center py-4">${vehicle.fuelType || 'N/A'}</td>
            <td class="px-6 text-center py-4">${vehicle.status || 'N/A'}</td>
            <td class="px-6 text-center py-4">${vehicle.remarks || 'N/A'}</td>
            <td class="px-6 text-center py-4">${vehicle.staffId || 'N/A'}</td>
            <td class="px-6 text-center py-4">
                <button class="text-blue-500 text-white px-3 py-1 rounded-md hover:text-blue-700" onclick="editVehicle(this)">
                <i class="fas fa-edit text-lg"></i>
                </button>
                <button class="text-red-500 text-white px-3 py-1 rounded-md hover:text-red-700" onclick="deleteVehicle('${vehicle.vehicleCode}')">
                <i class="fas fa-trash text-lg"></i>
                </button>
            </td>
        `;

        // Append the row to the table body
        vehicleTableBody.appendChild(row);
    });
}


function loadStaffOnVehicle() {
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/staff",
        type: "GET",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log(res); // Inspect the response to confirm its structure
            let staffArray = [];
            if (Array.isArray(res)) {
                staffArray = res;
            } else if (res.data && Array.isArray(res.data)) {
                staffArray = res.data;
            } else {
                console.error("Unexpected response format", res);
                return;
            }

            const staffIdSelect = document.getElementById('staffIdOnVehicle');
            const updateStaffIdOnVehicle = document.getElementById('updateStaffIdOnVehicle');
            $('#staffIdOnVehicle').empty();
            $('#updateStaffIdOnVehicle').empty();
            $('#staffIdOnVehicle').append('<option class="text-blue-500" selected>Select Staff</option>');
            $('#updateStaffIdOnVehicle').append('<option class="text-blue-500" selected>Select Staff</option>');

            staffArray.forEach(staff => {
                const option = document.createElement('option');
                option.value = staff.id; // Staff ID as the option value
                option.textContent = staff.name; // Staff name as the displayed text
                staffIdSelect.appendChild(option);
                updateStaffIdOnVehicle.appendChild(option);
            });
        },
        error: (res) => {
            console.error("Error fetching staff:", res);
        }
    });
}


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

    const form = document.getElementById("addVehicleForm");

    const licensePlate = form.licensePlate.value;
    const category = form.category.value;
    const fuelType = form.fuelType.value;
    const status = form.status.value;
    const remarks = form.remarks.value;
    const staffId = form.staffIdOnVehicle.value;
    // form.staffId.value

    // const formData = new FormData(form);

    // formData.append("licensePlate", licensePlate);
    // formData.append("category", category);
    // formData.append("fuelType", fuelType);
    // formData.append("status", status);
    // formData.append("remarks", remarks);
    // formData.append("staffId", staffId); 

    let vehical = {
        licensePlate,
        category,
        fuelType,
        status,
        remarks,
        staffId
    }

    let jsonVehical = JSON.stringify(vehical)

    // Send the FormData object via AJAX
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/vehicle",
        type: "POST",
        data: jsonVehical,
        headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
           alert("Save Vehical")
           loadVehicalTable();
        },
        error: (res) => {
            console.error(res);
            
        }
    });

    form.reset();
    toggleAddVehicleModal();
}


// Delete vehicle
function deleteVehicle(vehicleCode) {
    $.ajax({
        url: `http://localhost:5050/greenshow/api/v1/vehicle/${vehicleCode}`,
        type: "DELETE",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log("Vehical deleted successfully:", res);
            loadVehicalTable()
        },
        error: (err) => {
            console.error("Error deleting crop:", err);
        }
    });
    console.log(vehicleCode);  
}

// Edit vehicle and populate the form for editing
let vehicleCode = null;
function editVehicle(button) {
    const row = button.parentElement.parentElement;;
    const form = document.getElementById('editVehicleForm');
    
    let vehical_Code = row.cells[0].textContent;
    form.licensePlate.value = row.cells[1].textContent;
    form.category.value = row.cells[2].textContent;
    form.fuelType.value = row.cells[3].textContent;
    form.status.value  = row.cells[4].textContent;
    form.remarks.value  = row.cells[5].textContent;

    vehicleCode = vehical_Code;

    toggleEditVehicleModal(); 
}

function updateVehicle(event) {
    event.preventDefault();
    
    const licensePlate = document.getElementById('editlicensePlate').value;
    const category = document.getElementById('editcategory').value;
    const fuelType = document.getElementById('editfuelType').value;
    const status = document.getElementById('editstatus').value;
    const remarks = document.getElementById('editremarks').value;
    const staffId = document.getElementById('updateStaffIdOnVehicle').value;

    const vehicalData = {
        vehicleCode,
        licensePlate,
        category,
        fuelType,
        status,
        remarks,
        staffId
    }

    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/vehicle",
        type: "PUT",
        data: JSON.stringify(vehicalData),
        contentType: "application/json",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log("Vehical Update Success ", res);
            initializeVehical();
            toggleEditVehicleModal();
            console.log(vehicalData);
        },
        error: (res) => {
            console.error(res);
        }
    });
}

