
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
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            designation: 'Manager',
            gender: 'Male',
            joinedDate: '2022-01-01',
            dob: '1985-05-15',
            contactNo: '123-456-7890',
            email: 'john.doe@example.com',
            role: 'Manager',
            addressLine1: '123 Main St',
            addressLine2: 'Apt 101',
            addressLine3: 'City Center',
            addressLine4: 'New York',
            addressLine5: 'NY 10001',
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            designation: 'Developer',
            gender: 'Female',
            joinedDate: '2023-02-20',
            dob: '1990-07-23',
            contactNo: '234-567-8901',
            email: 'jane.smith@example.com',
            role: 'Developer',
            addressLine1: '456 Oak St',
            addressLine2: 'Suite 5B',
            addressLine3: 'Brooklyn',
            addressLine4: 'New York',
            addressLine5: 'NY 11201',
        }
    ];

    // Render the initial table
    updateStaffTable();
});

