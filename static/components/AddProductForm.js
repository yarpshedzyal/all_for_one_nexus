function AddProductForm() {
  document.getElementById('add-product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values
    const ASIN = document.getElementById('ASIN').value;
    const SKU = document.getElementById('SKU').value;
    const Name = document.getElementById('Name').value;
    const ThrLink = document.getElementById('ThrLink').value;
    const WSlink = document.getElementById('WSlink').value;
    const PricingStrategy = document.getElementById('PricingStrategy').value;
    const BasicHndlingTime = document.getElementById('BasicHndlingTime').value;
    const Price = document.getElementById('Price').value;
    const DeliveryPriceTHR10001 = document.getElementById('DeliveryPriceTHR10001').value;
    const DeliveryPriceWS10001 = document.getElementById('DeliveryPriceWS10001').value;
    const DeliveryPriceTHR90001 = document.getElementById('DeliveryPriceTHR90001').value;
    const DeliveryPriceWS90001 = document.getElementById('DeliveryPriceWS90001').value;
    const ThresholdForMedianHTCalculation = document.getElementById('ThresholdForMedianHTCalculation').value;
    const OrdersCount = document.getElementById('OrdersCount').value;
    const UnitsSoldCount = document.getElementById('UnitsSoldCount').value;
    const ReturnsCount = document.getElementById('ReturnsCount').value;
    const AZCount = document.getElementById('AZCount').value;
    const ItemNumber = document.getElementById('ItemNumber').value;
    const StockAviability = document.getElementById('StockAviability').value;
    const FreeShippingWithPlus = document.getElementById('FreeShippingWithPlus').value;
    const estimated_referral_fee = document.getElementById('estimated_referral_fee').value;

    // Send the data to your Flask server using Fetch
    fetch('/add_product', {
        method: 'POST',
        body: JSON.stringify({
            ASIN: ASIN,
            SKU: SKU,
            Name: Name,
            ThrLink: ThrLink,
            WSlink: WSlink,
            PricingStrategy: PricingStrategy,
            BasicHndlingTime: BasicHndlingTime,
            DeliveryPriceTHR10001: DeliveryPriceTHR10001,
            DeliveryPriceWS10001: DeliveryPriceWS10001,
            DeliveryPriceTHR90001: DeliveryPriceTHR90001,
            DeliveryPriceWS90001: DeliveryPriceWS90001,
            ThresholdForMedianHTCalculation: ThresholdForMedianHTCalculation,
            OrdersCount: OrdersCount,
            UnitsSoldCount: UnitsSoldCount,
            ReturnsCount: ReturnsCount,
            AZCount: AZCount,
            ItemNumber: ItemNumber,
            StockAviability: StockAviability,
            FreeShippingWithPlus: FreeShippingWithPlus,
            Price: Price,
            estimated_referral_fee : estimated_referral_fee
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