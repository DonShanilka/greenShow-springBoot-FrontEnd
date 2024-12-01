// Initialize the user table
function initializeUser() {
    loadUserTable();
}

// Load user data from the API
function loadUserTable() {
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/user",  // Adjust URL if necessary
        type: "GET",
        success: (res) => {
            // Check if 'data' field is available in the response
            if (res.data && Array.isArray(res.data)) {
                addUserToTable(res.data); // Call the function to populate the table
            } else {
                console.error("Unexpected response format:", res);
            }
        },
        error: (err) => {
            console.error("Error loading user data:", err);
        }
    });
}

// Function to populate the user table with data
function addUserToTable(users) {
    const userTableBody = document.getElementById("userTableBody");

    // Clear any existing rows in the table
    userTableBody.innerHTML = "";

    // Iterate through the user data and create table rows
    users.forEach((user) => {
        const row = document.createElement("tr");

        // Create and add table row data
        row.innerHTML = `
            <td class="px-6 py-4">${user.email || 'N/A'}</td>
            <td class="px-6 py-4">${user.role || 'N/A'}</td>
            <td class="px-6 py-4">
                <button class="text-blue-500 px-3 py-1 rounded-md hover:text-blue-700" onclick="toggleEditUserModal()">
                    <i class="fas fa-edit text-lg"></i>
                </button>
                <button class="text-red-500 px-3 py-1 rounded-md hover:text-red-700" onclick="deleteUser('${user.id}')">
                    <i class="fas fa-trash text-lg"></i>
                </button>
            </td>
        `;

        // Append the row to the table body
        userTableBody.appendChild(row);
    });
}

// Example stub functions for Edit and Delete actions
function editUser(userId) {
    alert(`Edit user with ID: ${userId}`);
}

function deleteUser(userId) {
    alert(`Delete user with ID: ${userId}`);
}

// Initialize the user table on page load
document.addEventListener("DOMContentLoaded", initializeUser);







// Toggle modals
function toggleAddUserModal() {
    document.getElementById('addUserModal').classList.toggle('hidden');
}

function toggleEditUserModal() {
    document.getElementById('editUserModal').classList.toggle('hidden');
}

// User data array
let userData = [];

// Add new user
function addUser(event) {
    event.preventDefault();
    const form = event.target;
    const newUser = {
        id: Date.now(),
        email: form.email.value,
        password: form.password.value,
        role: form.role.value,
    };
    userData.push(newUser);
    updateUserTable();
    form.reset();
    toggleAddUserModal();
}

// Update user
function updateUser(event) {
    event.preventDefault();
    const form = event.target;
    const id = form.dataset.userId; // Get the ID from the dataset
    const userIndex = userData.findIndex(user => user.id == id);

    if (userIndex !== -1) {
        userData[userIndex] = {
            id,
            email: form.email.value,
            password: form.password.value,
            role: form.role.value,
        };
        updateUserTable();
        form.reset();
        toggleEditUserModal();
    }
}

// Populate edit form
function editUser(id) {
    const user = userData.find(user => user.id == id);
    if (user) {
        const form = document.getElementById('editUserForm');
        form.dataset.userId = user.id;
        form.email.value = user.email;
        form.password.value = user.password;
        form.role.value = user.role;
        toggleEditUserModal();
    }
}

// Delete user
function deleteUser(id) {
    userData = userData.filter(user => user.id != id);
    updateUserTable();
}

// Update table dynamically
function updateUserTable() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    userData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 text-sm text-gray-800">${user.email}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${user.role}</td>
            <td class="px-6 py-4 text-sm text-gray-800">
                <button onclick="editUser(${user.id})" class="text-blue-500 hover:text-blue-700">Edit</button>
                <button onclick="deleteUser(${user.id})" class="text-red-500 hover:text-red-700 ml-4">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
