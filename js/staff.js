// Populate Edit Form and Open Modal
function editStaff(button) {
    const row = button.closest("tr");
    const modal = document.getElementById("editStaffModal");

    // Example: Assuming row has additional `data-*` attributes storing staff info
    const form = document.getElementById("editStaffForm");
    form.staffId.value = row.getAttribute("data-id");
    form.firstName.value = row.getAttribute("data-firstname");
    form.lastName.value = row.getAttribute("data-lastname");
    form.designation.value = row.getAttribute("data-designation");
    form.gender.value = row.getAttribute("data-gender");
    form.joinedDate.value = row.getAttribute("data-joineddate");
    form.dob.value = row.getAttribute("data-dob");
    form.addressLine1.value = row.getAttribute("data-addressline1");
    form.addressLine2.value = row.getAttribute("data-addressline2");
    form.addressLine3.value = row.getAttribute("data-addressline3");
    form.addressLine4.value = row.getAttribute("data-addressline4");
    form.addressLine5.value = row.getAttribute("data-addressline5");
    form.contactNo.value = row.getAttribute("data-contactno");
    form.email.value = row.getAttribute("data-email");
    form.role.value = row.getAttribute("data-role");

    toggleEditStaffModal();
}

// Update Staff Information
function updateStaff(event) {
    event.preventDefault();

    const form = document.getElementById("editStaffForm");
    const staffId = form.staffId.value;

    // Find row by ID and update its content
    const staffTableBody = document.getElementById("staffTableBody");
    const rows = staffTableBody.getElementsByTagName("tr");

    for (let row of rows) {
        if (row.getAttribute("data-id") === staffId) {
            row.setAttribute("data-firstname", form.firstName.value.trim());
            row.setAttribute("data-lastname", form.lastName.value.trim());
            row.setAttribute("data-designation", form.designation.value.trim());
            row.setAttribute("data-gender", form.gender.value);
            row.setAttribute("data-joineddate", form.joinedDate.value);
            row.setAttribute("data-dob", form.dob.value);
            row.setAttribute("data-addressline1", form.addressLine1.value.trim());
            row.setAttribute("data-addressline2", form.addressLine2.value.trim());
            row.setAttribute("data-addressline3", form.addressLine3.value.trim());
            row.setAttribute("data-addressline4", form.addressLine4.value.trim());
            row.setAttribute("data-addressline5", form.addressLine5.value.trim());
            row.setAttribute("data-contactno", form.contactNo.value.trim());
            row.setAttribute("data-email", form.email.value.trim());
            row.setAttribute("data-role", form.role.value.trim());
            break;
        }
    }

    toggleEditStaffModal();
}
