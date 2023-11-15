function AddProductForm() {
  document.getElementById('add-product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values
    const sku = document.getElementById('sku').value;
    const name = document.getElementById('name').value;
    const thrLink = document.getElementById('thr-link').value;
    const wsLink = document.getElementById('ws-link').value;
    const pricingStrategy = document.getElementById('pricing-strategy').value;
    const basicHandlingTime = document.getElementById('basic-handling-time').value;
    const price = document.getElementById('price').value;
    const medianHT = document.getElementById('median-ht').value;

    // Send the data to your Flask server using Fetch
    fetch('/add_product', {
        method: 'POST',
        body: JSON.stringify({
            sku: sku,
            name: name,
            thrLink: thrLink,
            wsLink: wsLink,
            pricingStrategy: pricingStrategy,
            basicHandlingTime: basicHandlingTime,
            price: price,
            medianHT: medianHT
            // Add other fields as needed
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            if (data.success) {
                // Close the modal and potentially update the product list
                // document.getElementById('modal-overlay').style.display = 'none';
                // You can update the product list here if needed
            } else {
                // Handle errors, display a message, etc.
            }
        });
});
}

export default AddProductForm;