initializeCrop()

function initializeCrop(){
    loadLogTable()
}

function loadLogTable(){
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/log",
        type: "GET",
        success: (res) => {
            addLogToTable(res.data);
            console.log(res.data);
        },
        error: (res) => {
            console.error(res);
        }
    });
    
}

function addLogToTable(log) {
    // Get the table body element
    const logTableBody = document.getElementById("logTableBody");

    // Clear any existing rows in the table
    logTableBody.innerHTML = "";

    // Loop through each crop and create a table row
    log.forEach(log => {
        // Create a new table row element
        const row = document.createElement("tr");

        // Construct the row HTML
        row.innerHTML = `
            <td class="px-6 py-4">${log.logCode || 'N/A'}</td>
            <td class="px-6 py-4">${log.logDate || 'N/A'}</td>
            <td class="px-6 py-4">${log.logDetails || 'N/A'}</td>
            <td class="px-6 py-4"><img src="${log.image || 'crop image'}"class="w-12 h-12 rounded-md object-cover"></td>
            <td class="px-6 py-4">
                <button class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700" onclick="toggleUpdateLogModal()
                ">
                <i class="fas fa-edit text-lg"></i>
                </button>
                <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700" onclick="deleteLog('${log.logCode}')">
                <i class="fas fa-trash text-lg"></i>
                </button>
            </td>
        `;

        // Append the row to the table body
        logTableBody.appendChild(row);
    });
}


//  Save Log
document.getElementById('logForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const formData = new FormData();
    const logDate = document.getElementById('logDate').value;
    const logDetails = document.getElementById('logDetails').value;
    const logImage = document.getElementById('logImage').files[0];

    formData.append('logDate', logDate); 
    formData.append('logDetails', logDetails);
    if (logImage) {
        formData.append('logImage', logImage); 
    }

    console.log('Submitting FormData:', Array.from(formData.entries()));

    $.ajax({
        url: 'http://localhost:5050/greenshow/api/v1/log', 
        type: 'POST',
        data: formData,
        processData: false, 
        contentType: false, 
        success: (res) => {
            alert('Log saved successfully!');
            console.log('Server Response:', res);
            document.getElementById('logForm').reset();
        },
        error: (err) => {
            console.error('Error saving log:', err);
            alert('Failed to save log. Please try again.');
        }
    });
});


// Log Delete 
function deleteLog(logCode) {
    $.ajax({
        url: `http://localhost:5050/greenshow/api/v1/log/${logCode}`,
        type: "DELETE",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log("Log deleted successfully:", res);
            loadLogTable()
        },
        error: (err) => {
            console.error("Error deleting crop:", err);
        }
    });
    console.log(logCode);  
}

// update form modal 
function toggleUpdateLogModal() {
    const modal = document.getElementById('updateLogModal');
    modal.classList.toggle('hidden');
}


// update log
function updateLog(button) {
    toggleUpdateLogModal()
}