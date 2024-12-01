function initializeStaff() {
    loadStaffTable();
}

function loadStaffTable() {
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/staff",
        type: "GET",
        success: (res) => {
            // Assuming the response is an array or contains a 'data' field with an array of staff
            if (Array.isArray(res)) {
                addStaffToTable(res); // If the response is directly an array
            } else if (res.data && Array.isArray(res.data)) {
                addStaffToTable(res.data); // If the response contains a 'data' property
            } else {
                console.error("Unexpected response format:", res);
            }
        },
        error: (err) => {
            console.error("Error loading staff data:", err);
        }
    });
}

function addStaffToTable(staffList) {
    const staffTableBody = document.getElementById("staffTableBody");

    // Clear any existing rows in the table
    staffTableBody.innerHTML = "";

    // Validate that staffList is an array
    if (!Array.isArray(staffList)) {
        console.error("Invalid staff data format:", staffList);
        return;
    }

    // Iterate through each staff member and create table rows
    staffList.forEach((staff) => {
        const row = document.createElement("tr");

        // Construct the row's HTML
        row.innerHTML = `
            <td class="px-6 py-4">${staff.id || 'N/A'}</td>
            <td class="px-6 py-4">${staff.firstName || 'N/A'}</td>
            <td class="px-6 py-4">${staff.lastName || 'N/A'}</td>
            <td class="px-6 py-4">${staff.designation || 'N/A'}</td>
            <td class="px-6 py-4">${staff.gender || 'N/A'}</td>
            <td class="px-6 py-4">${staff.joinedDate || 'N/A'}</td>
            <td class="px-6 py-4">${staff.dob || 'N/A'}</td>
            <td class="px-6 py-4">${staff.addressLine1 || 'N/A'}</td>
            <td class="px-6 py-4">${staff.addressLine2 || 'N/A'}</td>
            <td class="px-6 py-4">${staff.addressLine3 || 'N/A'}</td>
            <td class="px-6 py-4">${staff.addressLine4 || 'N/A'}</td>
            <td class="px-6 py-4">${staff.addressLine5 || 'N/A'}</td>
            <td class="px-6 py-4">${staff.contactNo || 'N/A'}</td>
            <td class="px-6 py-4">${staff.email || 'N/A'}</td>
            <td class="px-6 py-4">${staff.role || 'N/A'}</td>
            <td class="px-6 py-4">
                <button class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700" onclick="toggleUpdateStaffModal()">
                    Edit
                </button>
                <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700" onclick="deleteStaff('${staff.id}')">
                    Delete
                </button>
            </td>
        `;

        // Append the row to the table body
        staffTableBody.appendChild(row);
    });
}

// Initialize the staff table on page load
document.addEventListener("DOMContentLoaded", initializeStaff);















// This array will store all the staff data
let staffData = [];

// Function to toggle visibility of the Add Staff Modal
function toggleAddStaffModal() {
    const modal = document.getElementById('addStaffModal');
    modal.classList.toggle('hidden'); // Show or hide the modal
}

// Function to toggle visibility of the Update Staff Modal
function toggleUpdateStaffModal() {
    const updateStaffModal = document.getElementById('updateStaffModal');
    updateStaffModal.classList.toggle('hidden');
}



// Function to handle form submission and add new staff
function saveStaff(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const form = document.getElementById("addStaffForm");

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const designation = form.designation.value;
    const gender = form.gender.value;
    const joinedDate = form.joinedDate.value;
    const dob = form.dob.value;
    const addressLine1 = form.address1.value;
    const addressLine2 = form.address2.value;
    const addressLine3 = form.address3.value;
    const addressLine4 = form.address4.value;
    const addressLine5 = form.address5.value;
    const contactNo = form.contactNo.value;
    const email = form.email.value;
    const role = document.getElementById("role").value;

    let staff = {
        firstName,
        lastName,
        designation,
        gender,
        joinedDate,
        dob,
        addressLine1,
        addressLine2,
        addressLine3,
        addressLine4,
        addressLine5,
        contactNo,
        email,
        role
    }

    let jsonStaff = JSON.stringify(staff)

    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/staff",
        type: "POST",
        data: jsonStaff,
        headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
           alert("Save Vehical")
        },
        error: (res) => {
            console.error(res);
            
        }
    });

    // Update the table with the new staff data
    updateStaffTable();
    // Reset the form fields
    form.reset();
    // Close the modal after saving
    toggleAddStaffModal();
}



// Function to render the staff data in the table
function updateStaffTable() {
    const tableBody = document.getElementById('staffTableBody');
    tableBody.innerHTML = ''; // Clear the current table rows

    // Loop through the staffData array and create a row for each staff member
    staffData.forEach(staff => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 text-sm text-gray-800">${staff.id}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.firstName}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.lastName}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.designation}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.gender}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.joinedDate}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.dob}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.addressLine1}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.addressLine2}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.addressLine3}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.addressLine4}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.addressLine5}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.contactNo}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.email}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${staff.role}</td>
            <td class="px-6 py-4 text-sm text-gray-800">
                <button onclick="editStaff(this)" class="text-blue-600 hover:text-blue-800">Edit</button>
                <button onclick="deleteStaff(${staff.id})" class="text-red-600 hover:text-red-800">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a staff member
function deleteStaff(staffId) {
    $.ajax({
        url: `http://localhost:5050/greenshow/api/v1/staff/${staffId}`,
        type: "DELETE",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log("Staff deleted successfully:", res);
            loadStaffTable()
        },
        error: (err) => {
            console.error("Error deleting crop:", err);
        }
    });
    console.log(staffId);    
}



// Function to edit staff member (just a basic placeholder, you'll implement the actual edit logic)
function editStaff(id) {
    toggleUpdateStaffModal();
    // Find the staff member to edit
    const staff = staffData.find(staff => staff.id === id);

    if (staff) {
        // You can use the staff object to pre-fill the edit form
        console.log('Editing staff:', staff);
        // Ideally, you'd show an edit modal with the staff's current data pre-filled in the form fields
    }
}

// Function to initialize the page with some sample data (optional, for testing purposes)
document.addEventListener('DOMContentLoaded', () => {
    // Sample data to test the functionality
    staffData = [
    ];

    // Render the initial table
    updateStaffTable();
});
