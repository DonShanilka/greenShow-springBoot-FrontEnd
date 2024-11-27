initializeField()

function initializeField(){
    loadFieldTable()
}

function loadFieldTable() {
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/field",
        type: "GET",
        success: (res) => {
            // Assuming the response contains a 'data' field with an array of fields
            addFieldToTable(res);
        },
        error: (err) => {
            console.error("Error loading field data:", err);
        }
    });
}

function addFieldToTable(fields) {
    const fieldTableBody = document.getElementById("fieldTableBody");

    // Clear any existing rows in the table
    fieldTableBody.innerHTML = "";

    // Loop through each field and create table rows
    fields.forEach((field) => {
        const row = document.createElement("tr");

        // Construct the row's HTML
        row.innerHTML = `
            <td class="px-6 py-4">${field.fieldCode || 'N/A'}</td>
            <td class="px-6 py-4">${field.fieldName || 'N/A'}</td>
            <td class="px-6 py-4">${field.location || 'N/A'}</td>
            <td class="px-6 py-4">${field.extentSize || 'N/A'}</td>
            <td class="px-6 py-4">
                <img src="${field.image1 || 'https://via.placeholder.com/50'}" 
                     alt="Field Image 1" 
                     class="w-12 h-12 rounded-md object-cover">
            </td>
            <td class="px-6 py-4">
                <img src="${field.image2 || 'https://via.placeholder.com/50'}" 
                     alt="Field Image 2" 
                     class="w-12 h-12 rounded-md object-cover">
            </td>
            <td class="px-6 py-4">
                <button class="text-blue-500 hover:text-blue-800 px-3 py-1 rounded-md " onclick="ftoggleEditModal()">
                    <i class="fas fa-edit text-lg"></i>
                </button>
                <button class="text-red-500 hover:text-red-800 px-3 py-1 rounded-md " onclick="deleteField('${field.fieldCode}')">
                    <i class="fas fa-trash text-lg"></i>
                </button>
            </td>
        `;

        // Append the row to the table body
        fieldTableBody.appendChild(row);
    });
}






















// Toggle Add Modal
function ftoggleAddModal() {
    const addModal = document.getElementById("faddModal");
    addModal.classList.toggle("hidden");
}

// Toggle Edit Modal
function ftoggleEditModal() {
    const editModal = document.getElementById("feditModal");
    editModal.classList.toggle("hidden");
}

// Add Field
function addField(event) {
    event.preventDefault();

    const form = document.getElementById("addFieldForm");
    const fieldTableBody = document.getElementById("fieldTableBody");

    // Extract form data
    // const fieldCode = form.fieldCode.value.trim();
    const fieldName = form.fieldName.value.trim();
    const location = form.location.value.trim();
    const extentSize = form.extentSize.value.trim();
    const fieldImage1 = form.fieldImage1.files[0]?.name || "No Image";
    const fieldImage2 = form.fieldImage2.files[0]?.name || "No Image";

    const formData = new FormData(form);

    formData.append("fieldName", fieldName);
    formData.append("location", location);
    formData.append("extentSize", extentSize);
    // formData.append("season", season);
    
    if (fieldImage1) {
        formData.append("fieldImage1", fieldImage1);  // Append the file for upload
    }

    if (fieldImage2) {
        formData.append("fieldImage2", fieldImage2);  // Append the file for upload
    }

    // Send the FormData object via AJAX
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/field",
        type: "POST",
        data: formData,
        processData: false,  // Don't process the data (important for file upload)
        contentType: false,  // Don't set content type as jQuery will set it to multipart/form-data automatically
        success: (res) => {
            alert("Field saved successfully!");
        },
        error: (err) => {
            console.error("Error saving crop:", err);
        }
    });


    // Reset form and close modal
    form.reset();
    ftoggleAddModal();
}

// Edit Field
// function editField(event) {
//     button.preventDefault();
//     const row = button.parentElement.parentElement;
//     const cells = row.getElementsByTagName("td");

//     // Populate edit form
//     const form = document.getElementById("editFieldForm");
//     form.editId.value = row.rowIndex; // Store row index for update reference
//     form.fieldCode.value = cells[0].textContent;
//     form.fieldName.value = cells[1].textContent;
//     form.location.value = cells[2].textContent;
//     form.extentSize.value = cells[3].textContent;
//     console.log(form)

//     
// }

// Update Field
function updateField(event) {
    event.preventDefault();

    const form = document.getElementById("editFieldForm");
    const rowIndex = form.editId.value; // Get the stored row index
    const fieldTableBody = document.getElementById("fieldTableBody");
    const row = fieldTableBody.rows[rowIndex - 1]; // Rows are 0-indexed

    form.editId.value = row.rowIndex; // Store row index for update reference
    form.fieldCode.value = cells[0].textContent;
    form.fieldName.value = cells[1].textContent;
    form.location.value = cells[2].textContent;
    form.extentSize.value = cells[3].textContent;

    // Close modal
    ftoggleEditModal();
}

// Delete Field
function deleteField(fieldCode) {
    $.ajax({
        url: `http://localhost:5050/greenshow/api/v1/field/${fieldCode}`,
        type: "DELETE",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log("Equipment deleted successfully:", res);
            loadFieldTable()
        },
        error: (err) => {
            console.error("Error deleting crop:", err);
        }
    });
    console.log(fieldCode);
}
