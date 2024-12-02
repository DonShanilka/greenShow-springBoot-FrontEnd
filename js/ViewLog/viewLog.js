initializeLogView();

function initializeLogView() {
    loadLogIdInViewLog();
    loadFieldOnLog();
    loadStaffOnLog();
    loadCropOnLog();
}

function loadLogIdInViewLog() {
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/log",
        type: "GET",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log(res); // Inspect the response to confirm its structure
            let logArray = [];
            if (Array.isArray(res)) {
                logArray = res;
            } else if (res.data && Array.isArray(res.data)) {
                logArray = res.data;
            } else {
                console.error("Unexpected response format", res);
                return;
            }

            const clogId = document.getElementById('c-logId');
            const flogId = document.getElementById('f-logId');
            const slogId = document.getElementById('s-logId');
            
            $('#c-logId').empty();
            $('#f-logId').empty();
            $('#s-logId').empty();

            $('#c-logId').append('<option class="text-blue-500" selected>Select Log</option>');
            $('#f-logId').append('<option class="text-blue-500" selected>Select Log</option>');
            $('#s-logId').append('<option class="text-blue-500" selected>Select Log</option>');

            logArray.forEach(log => {
                const option = document.createElement('option');
                option.value = log.logCode; 
                clogId.appendChild(option);
            });

            logArray.forEach(log => {
                const option = document.createElement('option');
                option.value = log.logCode; 
                flogId.appendChild(option);
            });

            logArray.forEach(log => {
                const option = document.createElement('option');
                option.value = log.logCode; 
                slogId.appendChild(option);
            });
        },
        error: (res) => {
            console.error("Error fetching staff:", res);
        }
    });
}


// Load Staff Id
function loadStaffOnLog() {
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/staff",
        type: "GET",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log(res); // Inspect the response to confirm its structure
            let staffArray = [];
            if (Array.isArray(res)) {
                staffArray = res;
            } else if (res.data && Array.isArray(res.data)) {
                staffArray = res.data;
            } else {
                console.error("Unexpected response format", res);
                return;
            }

            const staffIdSelect = document.getElementById('s-staffId');
            $('#s-staffId').empty();
            $('#s-staffId').append('<option class="text-blue-500" selected>Select Staff</option>');

            staffArray.forEach(staff => {
                const option = document.createElement('option');
                option.value = staff.id;
                staffIdSelect.appendChild(option);
            });
        },
        error: (res) => {
            console.error("Error fetching staff:", res);
        }
    });
}

// Load Field Id
function loadFieldOnLog() {
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/field",
        type: "GET",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log(res); // Inspect the response to confirm its structure
            let fieldArray = [];
            if (Array.isArray(res)) {
                fieldArray = res;
            } else if (res.data && Array.isArray(res.data)) {
                fieldArray = res.data;
            } else {
                console.error("Unexpected response format", res);
                return;
            }

            console.log("Field ID ",fieldArray)
            const fieldIdSelect = document.getElementById('f-fieldId');
            $('#f-fieldId').empty();
            $('#f-fieldId').append('<option class="text-blue-500" selected>Select Field Id</option>');

            fieldArray.forEach(field => {
                const option = document.createElement('option');
                option.value = field.fieldCode; 
                fieldIdSelect.appendChild(option);
            });
        },
        error: (res) => {
            console.error("Error fetching staff:", res);
        }
    });
}

// Load Crop Id
function loadCropOnLog() {
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/crops",
        type: "GET",
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (res) => {
            console.log(res); // Inspect the response to confirm its structure
            let cropArray = [];
            if (Array.isArray(res)) {
                cropArray = res;
            } else if (res.data && Array.isArray(res.data)) {
                cropArray = res.data;
            } else {
                console.error("Unexpected response format", res);
                return;
            }

            console.log("Crop ID ",cropArray)
            const cropId = document.getElementById('c-cropId');
            $('#c-cropId').empty();
            $('#c-cropId').append('<option class="text-blue-500" selected>Select Crop Id</option>');

            cropArray.forEach(crop => {
                const option = document.createElement('option');
                option.value = crop.cropCode; 
                cropId.appendChild(option);
            });
        },
        error: (res) => {
            console.error("Error fetching staff:", res);
        }
    });
}
