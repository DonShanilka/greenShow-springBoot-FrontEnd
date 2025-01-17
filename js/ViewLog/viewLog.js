initializeLogView();

function initializeLogView() {
    loadLogIdInViewLog();
    loadFieldOnLog();
    loadStaffOnLog();
    loadCropOnLog();
}

function loadLogIdInViewLog() {
    let jwtToken = localStorage.getItem('jwtToken');
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/log",
        type: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
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

            const clogId = document.getElementById('c_logId');
            const flogId = document.getElementById('f_logId');
            const slogId = document.getElementById('s_logId');
            
            $('#c_logId').empty();
            $('#f_logId').empty();
            $('#s-logId').empty();

            $('#c_logId').append('<option class="text-blue-500" selected>Select Log</option>');
            $('#f_logId').append('<option class="text-blue-500" selected>Select Log</option>');
            $('#s_logId').append('<option class="text-blue-500" selected>Select Log</option>');

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
    let jwtToken = localStorage.getItem('jwtToken');
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/staff",
        type: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
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

            const staffIdSelect = document.getElementById('s_staffId');
            $('#s_staffId').empty();
            $('#s_staffId').append('<option class="text-blue-500" selected>Select Staff</option>');

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
    let jwtToken = localStorage.getItem('jwtToken');
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/field",
        type: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
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

            // console.log("Field ID ",fieldArray)
            const fieldIdSelect = document.getElementById('f_fieldId');
            $('#f_fieldId').empty();
            $('#f_fieldId').append('<option class="text-blue-500" selected>Select Field Id</option>');

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
    let jwtToken = localStorage.getItem('jwtToken');
    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/crops",
        type: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
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
            const cropId = document.getElementById('c_cropId');
            $('#c_cropId').empty();
            $('#c_cropId').append('<option class="text-blue-500" selected>Select Crop Id</option>');

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


// Add LogCrop
function saveLogCrop(event) {
    event.preventDefault();
    let jwtToken = localStorage.getItem('jwtToken');
    const form = document.getElementById("addLogCrop");

    const logId = form.c_logId.value;
    const cropId = form.c_cropId.value;

    let logCrop = {
        logId,
        cropId
    }

    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/log/logCrops",
        type: "POST",
        data: JSON.stringify(logCrop),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`
        },
        success: (res) => {
           alert("Save LogCrop")
        },
        error: (res) => {
            console.error(res);
            
        }
    });

    form.reset();
}

// saveLogField 
function saveLogField(event) {
    event.preventDefault();
    let jwtToken = localStorage.getItem('jwtToken');
    const form = document.getElementById("addLogField");

    const logId = form.f_logId.value;
    const fieldId = form.f_fieldId.value;

    let logField = {
        logId,
        fieldId
    }

    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/log/logField",
        type: "POST",
        data: JSON.stringify(logField),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`
        },
        success: (res) => {
           alert("Save LogField")
        },
        error: (res) => {
            console.error(res);
            
        }
    });

    form.reset();
}

// saveLogStaff 
function saveLogStaff(event) {
    event.preventDefault();
    let jwtToken = localStorage.getItem('jwtToken');
    const form = document.getElementById("addLogStaff");

    const logId = form.s_logId.value;
    const staffId = form.s_staffId.value;

    let logStaff = {
        logId,
        staffId
    }

    $.ajax({
        url: "http://localhost:5050/greenshow/api/v1/log/logStaff",
        type: "POST",
        data: JSON.stringify(logStaff),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`
        },
        success: (res) => {
           alert("Save LogStaff")
        },
        error: (res) => {
            console.error(res);
            
        }
    });

    form.reset();
}