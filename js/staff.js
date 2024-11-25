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
                <button class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700" onclick="editStaff('${staff.id}')">
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

// Example stub functions for Edit and Delete actions
function editStaff(staffId) {
    alert(`Edit staff with ID: ${staffId}`);
}

function deleteStaff(staffId) {
    alert(`Delete staff with ID: ${staffId}`);
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

// Function to handle form submission and add new staff
function saveStaff(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form data
    const form = event.target;
    const newStaff = {
        id: staffData.length + 1, // Automatically generate ID based on current staff count
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        designation: form.designation.value,
        gender: form.gender.value,
        joinedDate: form.joinedDate.value,
        dob: form.dob.value,
        contactNo: form.contactNo.value,
        email: form.email.value,
        role: form.role.value,
        addressLine1: form.addressLine1.value,
        addressLine2: form.addressLine2.value,
        addressLine3: form.addressLine3.value,
        addressLine4: form.addressLine4.value,
        addressLine5: form.addressLine5.value
    };

    // Add the new staff to the staffData array
    staffData.push(newStaff);

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
                <button onclick="editStaff(${staff.id})" class="text-blue-600 hover:text-blue-800">Edit</button>
                <button onclick="deleteStaff(${staff.id})" class="text-red-600 hover:text-red-800">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a staff member
function deleteStaff(id) {
    // Remove the staff member from the staffData array
    staffData = staffData.filter(staff => staff.id !== id);

    // Re-render the table
    updateStaffTable();
}

// Function to edit staff member (just a basic placeholder, you'll implement the actual edit logic)
function editStaff(id) {
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

