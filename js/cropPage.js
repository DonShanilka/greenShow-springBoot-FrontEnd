initializeCrop()

function initializeCrop(){
    loadCropTable()
}

function loadCropTable(){
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/crops",
        type: "GET",
        success: (res) => {
            addCropToTable(res.data)
        },
        error: (res) => {
            console.error(res);
        }
    });
}


function addCropToTable(crops) {
    // Get the table body element
    const cropTableBody = document.getElementById("cropTableBody");

    // Clear any existing rows in the table
    cropTableBody.innerHTML = "";

    // Loop through each crop and create a table row
    crops.forEach(crop => {
        // Create a new table row element
        const row = document.createElement("tr");

        // Construct the row HTML
        row.innerHTML = `
            <td class="px-6 py-4">
                <img src="${crop.cropImage || 'crop image'}" 
                     alt="${crop.cropName || 'Crop Image'}" 
                     class="w-12 h-12 rounded-md object-cover">
            </td>
            <td class="px-6 py-4">${crop.cropName || 'N/A'}</td>
            <td class="px-6 py-4">${crop.scientificName || 'N/A'}</td>
            <td class="px-6 py-4">${crop.category || 'N/A'}</td>
            <td class="px-6 py-4">${crop.season || 'N/A'}</td>
            <td class="px-6 py-4">
                <button class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700" onclick="editCrop('${crop.id}')">
                <i class="fas fa-edit text-lg"></i>
                </button>
                <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700" onclick="deleteCrop('${crop.id}')">
                <i class="fas fa-trash text-lg"></i>
                </button>
            </td>
        `;

        // Append the row to the table body
        cropTableBody.appendChild(row);
    });
}


// Add Modal Toggle
function toggleAddModal() {
    const addModal = document.getElementById("addModal");
    addModal.classList.toggle("hidden");
}

// Edit Modal Toggle
function toggleEditModal() {
    const editModal = document.getElementById("editModal");
    editModal.classList.toggle("hidden");
}

// Preview Image
function previewImage(input, previewId) {
    const file = input.files[0];
    const preview = document.getElementById(previewId);
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
    }
}

// Add Crop
function addCrop(event) {
    event.preventDefault();
    const form = document.getElementById("addCropForm");

    // Create a FormData object to handle file uploads and other form data
    const formData = new FormData(form); // Automatically includes all form fields and files

    // If you want to manually append the fields in case needed
    const cropImage = document.getElementById("cropImage").files[0];
    const cropName = form.cropName.value;
    const scientificName = form.scientificName.value;
    const category = form.category.value;
    const season = form.season.value;

    // Manually append fields (optional if you want to handle files and text fields separately)
    formData.append("cropName", cropName);
    formData.append("scientificName", scientificName);
    formData.append("category", category);
    formData.append("season", season);
    
    if (cropImage) {
        formData.append("cropImage", cropImage);  // Append the file for upload
    }

    // Send the FormData object via AJAX
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/crops",
        type: "POST",
        data: formData,
        processData: false,  // Don't process the data (important for file upload)
        contentType: false,  // Don't set content type as jQuery will set it to multipart/form-data automatically
        success: (res) => {
            alert("Crop saved successfully!");
        },
        error: (err) => {
            console.error("Error saving crop:", err);
        }
    });

    // Close modal and reset form
    toggleAddModal();
    form.reset();
}







// Edit Crop
function editCrop(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");
    const editForm = document.getElementById("editCropForm");

    // Populate form fields
    editForm.editId.value = row.rowIndex;
    editForm.editCropName.value = cells[1].innerText;
    editForm.editScientificName.value = cells[2].innerText;
    editForm.editCategory.value = cells[3].innerText;
    editForm.editSeason.value = cells[4].innerText;

    toggleEditModal();
}

// Update Crop
function updateCrop(event) {
    event.preventDefault();
    const form = document.getElementById("editCropForm");
    const rowIndex = form.editId.value;
    const cropTable = document.getElementById("cropTableBody");
    const row = cropTable.rows[rowIndex - 1]; // Adjust for header

    // Update table row
    row.cells[1].innerText = form.editCropName.value;
    row.cells[2].innerText = form.editScientificName.value;
    row.cells[3].innerText = form.editCategory.value;
    row.cells[4].innerText = form.editSeason.value;

    // Close modal
    toggleEditModal();
}

// Delete Crop
function deleteCrop(button) {
    const row = button.closest("tr");
    row.remove();
}
