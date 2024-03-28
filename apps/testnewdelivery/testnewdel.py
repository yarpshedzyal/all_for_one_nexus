import requests

# Define the GraphQL query


query = """
query fetchCartData(
  $customerId: Int
  $hideInHouse: Boolean
  $session: String
  $storeNumber: StoreNumber!
) {
  customerCart(
    customerId: $customerId
    session: $session
  ) {
    customerId
    missingShippingAddress
    shippingAddress {
      destinationType
      stateAbbreviation
      zipcode
    }
    totalQuantity
    calculatedCustomerCart(storeNumber: $storeNumber) {
      amountToFreeFreight
      cartHasMembership
      leasingPaymentAmount
      unusableCouponCodes
      usableCouponCodes
      payPalPaymentAvailable
      requiresShippingCalculation
      transactionPreview {
        summedDiscount
        summedMembershipDifference
        summedItemsSubtotal
        summedTax
        summedTotal
        orders {
          discount
          guid
          isDeliveryOrder
          isPickupOrder
          productRestrictions {
            itemNumber
            restrictedStateAbbreviations
          }
          shippingMethod
          total
          type
          verifyingTaxSubtotal
          deliveryQuantities(storeNumber: $storeNumber) {
            isOverOrdered
            itemId
            quantityAvailable
          }
          items {
            accessoryIdentifiers
            cacheId
            cartItemId
            customizableItemId
            fulfillmentMethodName
            isAvailableForDelivery
            isAvailableForPickup
            isAvailableForShipping
            isPickup
            isSingleItem
            itemId
            itemDescription
            outletItemId
            pickupAvailabilityTime
            price
            priceRequirements
            priceType
            quantityOrdered
            quoteId
            quoteName
            subtotalVerifying
            volumeInCubicInches
            weight
            baseItem {
              isGenericItem
              itemNumber
              catalogData(storeNumber: $storeNumber) {
                accessories {
                  name
                  required
                  options {
                    description
                    id
                    price
                  }
                }
                customizationRequired
                customizationUrl
                isPerishable
                primaryListingImage {
                  medium
                }
                shopping {
                  extendedWarranties(hideInHouse: $hideInHouse) {
                    id
                    isThirdParty
                    name
                    price
                  }
                  isCustomizable
                  mustBuy
                  requestAQuoteUrl
                  startBuy
                }
                substituteItem(storeNumber: $storeNumber) {
                  catalogData {
                    primaryListingImage {
                      medium
                    }
                  }
                  description
                  id
                  itemNumber
                  memberPrice(storeNumber: $storeNumber)
                }
              }
              storeInformation(storeNumber: $storeNumber) {
                isDropShip
                quantityAvailable
              }
              shippingInformation {
                canBeDelivered
              }
            }
            cartItemTagsCollection(storeNumber: $storeNumber) {
              fitsLiftgate
              isPerishable
              leadTimeDescription
              leadTimeType
              mustShipCommonCarrier
              restrictExpeditedShipping
              warnFreeShippingNotAllowed
            }
            extendedWarranty {
              formattedDescription
              price
            }
            installNetworkOptions {
              normalizedServiceName
              price
              serviceTierPricingId
            }
            outletItem {
              primaryImageUri
            }
          }
          missingMixAndMatchBuyXGetYItemsCollection {
            quantity
            items {
              discountAmount
              price
              valueType
              item {
                id 
                itemNumber 
                catalogData {
                  customizationRequired
                  customizationUrl
                  primaryListingImage {
                    medium
                  }
                  shopping {
                    allowOutOfStockPurchase
                    hasWarning
                    isCustomizable
                    requestAQuoteUrl
                    warningContent
                  }
                }
                description
              }
            }
            items {
              itemList {
                item {
                  id 
                  itemNumber
                  catalogData {
                    customizationRequired
                    customizationUrl
                    primaryListingImage {
                      medium
                    }
                    shopping {
                      allowOutOfStockPurchase
                      hasWarning
                      isCustomizable
                      requestAQuoteUrl
                      warningContent
                    }
                  }
                  description
                }
              }
            }
          }
        }
      }
    }
  }
}

"""

# Define the variables for the query
variables = {
    "customerId": None,
    "hideInHouse": False,
    "storeNumber": 222
}

csrf_token = "UfXOyFBl12LEJiF74K8u0TxirDRasGcikllaeEDW"
# Define the headers
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Cookie": "__cfruid=cfbe9da6f2a6a9ee409a8966db3bbccfb0cc5e24-1687171070; mf_f6e86d43-cfb9-4e62-b757-fbf21f8a0d19=||1699970691765||0||||0|0|86.65605; _fbp=fb.1.1699970691860.249876618; _gcl_au=1.1.212739809.1707864675; customer_location_data=eyJpdiI6InZZM0QzSzExMzExY0FXZldLS2U3OFE9PSIsInZhbHVlIjoiOVZZQ1RlUml4eFRpazFBTGVYK0VYeTFnN0ZpTDZENnZRdHp4TWFTTDlaSDV2RUNQM3djYmdDZHdvblZsdm9TSDFZU3ArRVRxd2U0akNrRWhjTXFjT0hVUjhKYnF3cm45T3VEMXRNZ2ZaM21pRlkreG9GMlVZT3lVV3RvOFlQWFE4Z0hVNURiY2tqdmorUGZ4NzRMYkhyMkgvNVRxUWMrcVF4ckQxaSswUk1sVnU0MkRRYVlxYVBEK1V1ZGVieU5IbnUxQjRqYTYxTFFWakVGTUZTQUFNUWtZSjlkOG8yTXA3Zm1Xcm1qUEJQTT0iLCJtYWMiOiI3NWI0MDViZmFhZDlmYzkxZWNhNzRjYWUzMmRhOGMxYWVkMjYzZWY5Yzc2YWExYWRjYzhkNDM2NzdhNDFiN2U5IiwidGFnIjoiIn0%3D; _cfuvid=5rYe1oUWou1PMKfEN.L6VBUnLOrGJruR8yJUk7UHiu0-1710237815568-0.0.1.1-604800000; _gid=GA1.2.1698743653.1710237817; _gac_=1.1710237897.Cj0KCQjw-r-vBhC-ARIsAGgUO2BhiX9-ZAVqm2Z2e67dG9DYtnEV1cf1q95PpgRBUwnNL5k1nvNV2RIaApT_EALw_wcB; _gac_UA-17225940-1=1.1710237898.Cj0KCQjw-r-vBhC-ARIsAGgUO2BhiX9-ZAVqm2Z2e67dG9DYtnEV1cf1q95PpgRBUwnNL5k1nvNV2RIaApT_EALw_wcB; _gcl_aw=GCL.1710237898.Cj0KCQjw-r-vBhC-ARIsAGgUO2BhiX9-ZAVqm2Z2e67dG9DYtnEV1cf1q95PpgRBUwnNL5k1nvNV2RIaApT_EALw_wcB; laravel_session=eyJpdiI6ImZaKzFwY3VQWFJESVloTzNBelRKTlE9PSIsInZhbHVlIjoiaWZoR2xGR0QyV2VNR1BFVU1sOXVaUFA3NXc0MU9YY3pVWCtmcE5RTGQrSXk3TklVQ3kyNDlzK2xtWFpIdFRBcUloYmc1UG9OdjhQL0wzR3pTbkI0S1dlOGRIeDl1aEovVkJ3Z0VOL2xHMXZHNS91TnFhTGNWUFlwbGljTlBQWFgiLCJtYWMiOiJiYjdjMTA3ODM0ZmI2ODg1ZTVmZmYxYmZiMzYxMTgzZTIwNDgyNDkzZDFmZjkwOTI2YjkwZjM3MThjY2Y3NmYwIiwidGFnIjoiIn0%3D; _ga_4144MP4WMH=GS1.1.1710502909.110.1.1710506591.60.0.0; _ga=GA1.2.1464614154.1699970691",
    "Referer": "https://www.therestaurantstore.com/cart",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
}

headers["X-Csrf-Token"] = csrf_token
# Make the request
response = requests.post(
    'https://www.therestaurantstore.com/api/graphql?query=fetchCartData',
    json={"query": query, "variables": variables},
    headers=headers
)

# Check if the request was successful
if response.status_code == 200:
    # Print the JSON response
    print(response.json())
else:
    print('Error:', response.status_code)