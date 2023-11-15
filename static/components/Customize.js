function Cuscomize() {
 
    const customizeButton = document.getElementById('customize-button');
    const customizeDialog = document.getElementById('customize-dialog');
    const customizeCheckboxes = document.getElementById('customize-checkboxes');
    const customizeSaveButton = document.getElementById('customize-save');
    const customizeCancelButton = document.getElementById('customize-cancel');
    // const customizeCloseButton = document.getElementById('customize-close');
    let tableHeaders = document.querySelectorAll('th[data-column]'); // Get table headers with data attributes
 
      

    // Function to hide the dialog
    function hideCustomizeDialog() {
        customizeDialog.style.display = 'none';
    }

    // refresh arr elements tableHeaders
    customizeButton.addEventListener("click",()=>{ 
        tableHeaders = document.querySelectorAll('th[data-column]');  
        return tableHeaders;
    }); 
    

    // Function to handle the "Close" button click
    // customizeCloseButton.addEventListener('click', hideCustomizeDialog);

    // Function to create checkboxes for column customization 
    tableHeaders.forEach(header => {
        const column = header.getAttribute('data-column');
        const checkbox = document.createElement('input');
        checkbox.classList.add("form-check-input");
        checkbox.classList.add("me-2");
        checkbox.type = 'checkbox';
        checkbox.value = column;
        checkbox.checked = true; // Default: Show all columns

        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(column));

        const checkboxContainer = document.createElement('div');
        checkboxContainer.appendChild(label);

        customizeCheckboxes.appendChild(checkboxContainer);
    });

    // Function to save customizations and apply them
    customizeSaveButton.addEventListener('click', function () {
        const selectedColumns = Array.from(customizeCheckboxes.querySelectorAll('input:checked')).map(checkbox => checkbox.value);

        // Show/hide table headers and data cells based on selected columns
        tableHeaders.forEach(header => {
            const column = header.getAttribute('data-column');
            if (selectedColumns.includes(column)) {
                header.style.display = 'table-cell'; // Show selected headers
            } else {
                header.style.display = 'none'; // Hide unselected headers
            }
        });

        // Show/hide table data cells based on selected columns
        const tableRows = document.querySelectorAll('tr');
        tableRows.forEach(row => {
            const cells = Array.from(row.querySelectorAll('td[data-column]'));
            cells.forEach(cell => {
                const column = cell.getAttribute('data-column');
                if (selectedColumns.includes(column)) {
                    cell.style.display = 'table-cell'; // Show selected data cells
                } else {
                    cell.style.display = 'none'; // Hide unselected data cells
                }
            });
        });

        hideCustomizeDialog(); // Hide the dialog after saving customizations
    });

    // Function to cancel and close the dialog
    customizeCancelButton.addEventListener('click', hideCustomizeDialog);
 
}

export default Cuscomize;