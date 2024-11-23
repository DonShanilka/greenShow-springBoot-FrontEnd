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
    const cropTableBody = document.getElementById("cropTableBody");

    // Extract form data
    const cropImage = document.getElementById("cropImage").files[0]?.name || "No Image";
    const cropName = form.cropName.value;
    const scientificName = form.scientificName.value;
    const category = form.category.value;
    const season = form.season.value;

    // Create table row
    const newRow = `
    <tr>
        <td class="px-6 py-4">
            <img src="#" alt="${cropImage}" class="w-12 h-12 rounded object-cover" />
        </td>
        <td class="px-6 py-4">${cropName}</td>
        <td class="px-6 py-4">${scientificName}</td>
        <td class="px-6 py-4">${category}</td>
        <td class="px-6 py-4">${season}</td>
        <td class="px-6 py-4 flex gap-2">
            <button onclick="editCrop(this)" 
                class="text-blue-500 hover:text-blue-600">
                <i class="fas fa-edit text-lg"></i>
            </button>
            <button onclick="deleteCrop(this)" 
                class="text-red-500 hover:text-red-600">
                <i class="fas fa-trash text-lg"></i>    
            </button>
        </td>
    </tr>
`;

document.getElementById('cropTableBody').innerHTML += newRow;


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


$(document).ready(function () {
    // Add Crop
    $("#addCropForm").addCrop(function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("cropName", $("#cropName").val());
        formData.append("scientificName", $("#scientificName").val());
        formData.append("cropImage", $("#cropImage")[0].files[0]);
        formData.append("category", $("#category").val());
        formData.append("season", $("#season").val());

        $.ajax({
            url: "http://localhost:5050/greenshow/api/v1/crops",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                alert("Crop added successfully!");
                fetchAllCrops(); // Reload the crop list
                toggleAddModal();
                $("#addCropForm")[0].reset();
            },
            error: function () {
                alert("Failed to add crop!");
            },
        });
    });

    // Edit Crop
    $("#editCropForm").submit(function (event) {
        event.preventDefault();

        const cropCode = $("#editId").val(); // Assuming you have this hidden input in your form
        const formData = new FormData();
        formData.append("cropName", $("#editCropName").val());
        formData.append("scientificName", $("#editScientificName").val());
        formData.append("cropImage", $("#editCropImage")[0].files[0]);
        formData.append("category", $("#editCategory").val());
        formData.append("season", $("#editSeason").val());

        $.ajax({
            url: `http://localhost:5050/api/v1/crops/${cropCode}`,
            type: "PUT",
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                alert("Crop updated successfully!");
                fetchAllCrops(); // Reload the crop list
                toggleEditModal();
            },
            error: function () {
                alert("Failed to update crop!");
            },
        });
    });

    // Delete Crop
    $(document).on("click", ".delete-button", function () {
        const cropCode = $(this).data("id");

        if (confirm("Are you sure you want to delete this crop?")) {
            $.ajax({
                url: `http://localhost:5050/api/v1/crops/${cropCode}`,
                type: "DELETE",
                success: function () {
                    alert("Crop deleted successfully!");
                    fetchAllCrops(); // Reload the crop list
                },
                error: function () {
                    alert("Failed to delete crop!");
                },
            });
        }
    });

    // Fetch All Crops
    function fetchAllCrops() {
        $.ajax({
            url: "http://localhost:5050/api/v1/crops",
            type: "GET",
            success: function (response) {
                const cropTableBody = $("#cropTableBody");
                cropTableBody.empty();

                response.data.forEach((crop) => {
                    const newRow = `
                        <tr>
                            <td class="px-6 py-4">
                                <img src="${crop.cropImage}" alt="${crop.cropName}" class="w-12 h-12 rounded object-cover" />
                            </td>
                            <td class="px-6 py-4">${crop.cropName}</td>
                            <td class="px-6 py-4">${crop.scientificName}</td>
                            <td class="px-6 py-4">${crop.category}</td>
                            <td class="px-6 py-4">${crop.season}</td>
                            <td class="px-6 py-4 flex gap-2">
                                <button class="text-blue-500 hover:text-blue-600 edit-button" 
                                    data-id="${crop.cropCode}">
                                    <i class="fas fa-edit text-lg"></i>
                                </button>
                                <button class="text-red-500 hover:text-red-600 delete-button" 
                                    data-id="${crop.cropCode}">
                                    <i class="fas fa-trash text-lg"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                    cropTableBody.append(newRow);
                });
            },
            error: function () {
                alert("Failed to fetch crops!");
            },
        });
    }

    // Load crops on page load
    fetchAllCrops();
});
