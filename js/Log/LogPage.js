

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
