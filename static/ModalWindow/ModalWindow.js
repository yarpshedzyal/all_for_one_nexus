
function ModalWindow() {
  function showModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.style.display = 'block';

    // Show the form fields
    const addProductForm = document.getElementById('add-product-form');
    addProductForm.style.display = 'block';
  }

  // Function to hide the modal and form fields
  function hideModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.style.display = 'none';

    // Hide the form fields
    const addProductForm = document.getElementById('add-product-form');
    addProductForm.style.display = 'none';
  }

  // Show the modal when the "Add Product" button is clicked
  document.getElementById('add-product-button').addEventListener('click', showModal);

  // Hide the modal when the close button is clicked
  document.getElementById('close-add-product-modal').addEventListener('click', hideModal);

  // Hide the modal when the form is submitted
  document.getElementById('add-product-form').addEventListener('submit', function (e) {
    e.preventDefault();
    hideModal();
  });
}

export default ModalWindow;