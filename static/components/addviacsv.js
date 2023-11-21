export default function addviascsv(){

    function handleCsvUpload() {
        // Trigger the file input click
        $("#csv-file-input").click();
    }

    // Handle file selection and form submission
    $(document).ready(function () {
        $("#csv-file-input").change(function () {
            // Get the selected file
            var file = this.files[0];

            // Create a FormData object and append the file
            var formData = new FormData();
            formData.append("csv_file", file);

            // Use Ajax to submit the form
            $.ajax({
                type: "POST",
                url: "/upload_csv",
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    // Handle the response from the server
                    console.log(response);
                    // Optionally, you can display a message to the user
                    alert(response.message);
                },
                error: function (error) {
                    // Handle the error
                    console.error("Error uploading CSV file:", error);
                }
            });
        });
    });

}