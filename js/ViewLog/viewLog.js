loadLogIdInViewLog();

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