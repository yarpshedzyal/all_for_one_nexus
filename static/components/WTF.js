 
function WTF() {
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');
    const itemsPerPageSelect = document.getElementById('items-per-page');
    console.dir(itemsPerPageSelect);
    // let itemsPerPage = parseInt(itemsPerPageSelect.value); // Initialize with default value

    // Define the initial values for pagination
    let currentPage = 1;           // Initialize the current page
    let itemsPerPage = 50;         // Initialize the items per page (default: 50)


    itemsPerPageSelect.addEventListener('change', function () {
        itemsPerPage = parseInt(this.value);
        currentPage = 1; // Reset to the first page when changing items per page 
        fetchData(currentPage, itemsPerPage); // Fetch data with the new items per page value
    });

    // Function to update the table based on the current page and items per page
    function updateTable() {
        // Calculate the start and end indices for the displayed items
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Get all table rows except for the header
        const tableRows = document.querySelectorAll('tr:not(.header)');

        // Loop through table rows and hide/show based on the current page and items per page
        tableRows.forEach((row, index) => {
            if (index >= startIndex && index < endIndex) {
                row.style.display = 'table-row'; // Show rows within the current range
            } else {
                row.style.display = 'none';      // Hide rows outside the current range
            }
        });

        // Update the current page number display
        currentPageSpan.textContent = currentPage;
    }

    // Event listener for the "Previous" button
    // prevPageButton.addEventListener('click', function () {
    //     if (currentPage > 1) {
    //         currentPage--;
    //         updateTable();
    //     }
    // });

    // Event listener for the "Next" button
    nextPageButton.addEventListener('click', function () {
        // Calculate the total number of pages based on the number of items
        const totalItems = document.querySelectorAll('tr:not(.header)').length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (currentPage < totalPages) {
            currentPage++;
            updateTable();
        }
    });

    // // Event listener for the items-per-page dropdown
    // itemsPerPageSelect.addEventListener('change', function () {
    //     itemsPerPage = parseInt(this.value);
    //     currentPage = 1; // Reset to the first page when changing items per page
    //     updateTable();
    // });

    // // Initialize the page with the default settings
    // updateTable();
 
}

export default WTF;