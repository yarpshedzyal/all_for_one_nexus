document.getElementById('add-as-csv-button').addEventListener('click', function () {
    const fileInput = document.getElementById('csv-file-input');
    fileInput.click();
});

// Event listener for file input change
document.getElementById('csv-file-input').addEventListener('change', function () {
    const fileInput = this;
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        // Process the selected CSV file
        processCsvFile(selectedFile);
    }
});

function processCsvFile(csvFile) {
    const formData = new FormData();
    formData.append('csv_file', csvFile);

    fetch('/add_csv', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('CSV file successfully added to the database.');
            // Optionally update the table or take other actions
        } else {
            alert('Failed to add CSV file. Please check the file format.');
        }
    });
}
