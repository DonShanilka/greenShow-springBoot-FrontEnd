







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
