initializeEquipment()

function initializeEquipment() {
    loadEquipmentTable();
    loadStaffOnEquipment();
    loadFieldOnEquipment()
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
                <button class="text-blue-500 px-3 py-1 rounded-md hover:text-blue-700" onclick="editEquipment(this)">
                    <i class="fas fa-edit text-lg"></i>
                </button>
                <button class="text-red-500 px-3 py-1 rounded-md hover:text-red-700" onclick="deleteEquipment('${equipment.equipmentId}')">
                    <i class="fas fa-trash text-lg"></i>
                </button>
            </td>
        `;

        // Append the row to the table body
        equipmentTableBody.appendChild(row);
    });
}


// Initialize the vehicle table on page load
document.addEventListener("DOMContentLoaded", initializeVehical);


// Load Staff Id
function loadStaffOnEquipment() {
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

            const staffIdSelect = document.getElementById('staffIdOnEquipment');
            const editstaffIdOnEquipment = document.getElementById('editstaffIdOnEquipment');
            $('#staffIdOnEquipment').empty();
            $('#editstaffIdOnEquipment').empty();
            $('#staffIdOnEquipment').append('<option class="text-blue-500" selected>Select Staff</option>');
            $('#editstaffIdOnEquipment').append('<option class="text-blue-500" selected>Select Staff</option>');

            staffArray.forEach(staff => {
                const option = document.createElement('option');
                option.value = staff.id; // Staff ID as the option value
                option.textContent = staff.name; // Staff name as the displayed text
                staffIdSelect.appendChild(option);
                editstaffIdOnEquipment.appendChild(option);
            });
        },
        error: (res) => {
            console.error("Error fetching staff:", res);
        }
    });
}

// Load Field Id
function loadFieldOnEquipment() {
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/field",
        type: "GET",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log(res); // Inspect the response to confirm its structure
            let fieldArray = [];
            if (Array.isArray(res)) {
                fieldArray = res;
            } else if (res.data && Array.isArray(res.data)) {
                fieldArray = res.data;
            } else {
                console.error("Unexpected response format", res);
                return;
            }

            console.log(fieldArray)
            const fieldIdSelect = document.getElementById('fieldIdOnEquipment');
            const editfieldIdOnEquipment = document.getElementById('editfieldIdOnEquipment');
            $('#fieldIdOnEquipment').empty();
            $('#editfieldIdOnEquipment').empty();
            $('#fieldIdOnEquipment').append('<option class="text-blue-500" selected>Select Field Id</option>');
            $('#editfieldIdOnEquipment').append('<option class="text-blue-500" selected>Select Field Id</option>');

            fieldArray.forEach(field => {
                const option = document.createElement('option');
                option.value = field.fieldCode; // Staff ID as the option value
                option.textContent = field.name; // Staff name as the displayed text
                fieldIdSelect.appendChild(option);
                editfieldIdOnEquipment.appendChild(option);
            });
        },
        error: (res) => {
            console.error("Error fetching staff:", res);
        }
    });
}


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

    const form = document.getElementById("addEquipmentForm");

    // Create a FormData object to send multipart data
    const formData = new FormData(form);

    const availableCount = form.availableCount.value;
    const name = form.name.value;
    const type = form.type.value;
    const status = form.eqstatus.value;
    const fieldIdOnEquipment = form.fieldIdOnEquipment.value;
    const staffIdOnEquipment = form.staffIdOnEquipment.value;

    formData.append("availableCount", availableCount);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("status", status);
    formData.append("fieldIdOnEquipment", fieldIdOnEquipment);
    formData.append("staffIdOnEquipment", staffIdOnEquipment);

    console.log(formData);
    console.log(availableCount,name,type,status,fieldIdOnEquipment,staffIdOnEquipment)

    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/equipment",
        type: "POST",
        data: formData,
        processData: false, // Prevent jQuery from processing data
        contentType: false, // Let the browser set the correct boundary
        success: (res) => {
            alert("Equipment saved successfully!");
            loadEquipmentTable(); // Reload the table
            console.log("Response:", res);
        },
        error: (res) => {
            console.error("Error saving equipment:", res);
        }
    });

    // Reset the form and close the modal
    form.reset();
    toggleAddEquipmentModal();
}


// Edit Existing Equipment
let equipmentId = null;
function editEquipment(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName("td");

    // Populate edit form
    const form = document.getElementById("editEquipmentForm");
    let equipment_id = cells[0].textContent; // Store row index for update reference
    form.editname.value = cells[2].textContent;
    form.edittype.value = cells[3].textContent;
    form.editavailableCount.value = cells[1].textContent;
    form.editstatus.value = cells[4].textContent;

    equipmentId = equipment_id;

    toggleEditEquipmentModal();
}

// Update Equipment
function updateEquipment(event) {
    event.preventDefault();

    const availableCount = document.getElementById('editavailableCount').value;
    const name =  document.getElementById('editname').value;
    const type = document.getElementById('edittype').value;
    const status = document.getElementById('editstatus').value;
    const fieldIdOnEquipment = document.getElementById('editfieldIdOnEquipment').value;
    const staffIdOnEquipment = document.getElementById('editstaffIdOnEquipment').value;

    const equipmentData = {
        equipmentId,
        availableCount,
        name,
        type,
        status,
        fieldIdOnEquipment,
        staffIdOnEquipment
    }

    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/equipment",
        type: "PUT",
        data: JSON.stringify(equipmentData),
        contentType: "application/json",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log("Equipment Update Success ",res);
            initializeEquipment();
            toggleEditEquipmentModal();
        },
        error: (res) => {
            console.error(res);
        }
    });
}

// Delete Equipment
function deleteEquipment(equipmentId) {
    $.ajax({
        url: `http://localhost:5050/greenshow/api/v1/equipment/${equipmentId}`,
        type: "DELETE",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log("Equipment deleted successfully:", res);
            loadEquipmentTable()
        },
        error: (err) => {
            console.error("Error deleting crop:", err);
        }
    });
    console.log(equipmentId);
}




// Update Equipment Table
function updateEquipmentTable() {
    
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
