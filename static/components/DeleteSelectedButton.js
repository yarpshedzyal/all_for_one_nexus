function DeleteSelectedButton() {
  document.getElementById('delete-selected-button').addEventListener('click', function () {
    // Get all checkboxes
    const checkboxes = document.querySelectorAll('input[name="selected_product"]');
    const selectedIds = [];

    // Collect IDs of selected items
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        selectedIds.push(checkbox.value);
      }
    });

    if (selectedIds.length === 0) {
      alert('No items selected for deletion.');
      return;
    }

    // Ask for confirmation
    const confirmation = confirm(`Are you sure you want to delete ${selectedIds.length} selected items?`);

    if (confirmation) {
      // Send an AJAX request to delete selected items
      fetch('/delete_selected', {
        method: 'POST',
        body: JSON.stringify({ selectedIds }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Items were successfully deleted, you can update the table or take other actions here
            alert(`Deleted ${selectedIds.length} items.`);
          } else {
            // Handle the case where the deletion was not successful
            alert('Failed to delete items.');
          }
        });
    }
  });
}

export default DeleteSelectedButton;