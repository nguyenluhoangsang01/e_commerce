import { Button, Divider, Typography } from "@material-ui/core";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Review from "../Review";

const stripe = loadStripe(`${process.env.REACT_APP_STRIPE_API_KEY}`);

const PaymentForm = ({
  shippingData,
  checkoutToken,
  nextStep,
  backStep,
  order,
  errorMessage,
  handleCaptureCheckout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken?.live?.line_items,
        customer: {
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          address: shippingData.address,
          email: shippingData.email,
          city: shippingData.city,
          zip: shippingData.zip,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubdivision,
          postal_zip: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: {
          shipping_method: shippingData.shippingOption,
        },
        payment: {
          gateway: "test_gateway",
          card: {
            number: "4242 4242 4242 4242",
            expiry_month: paymentMethod.card.exp_month,
            expiry_year: paymentMethod.card.exp_year,
            cvc: "123",
            postal_zip_code: paymentMethod.billing_details.address.postal_code,
          },
        },
      };

      handleCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment methods
      </Typography>
      {stripe && (
        <Elements stripe={stripe}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <CardElement />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "40px",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={backStep}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!stripe}
                  >
                    Pay {checkoutToken?.live.subtotal.formatted_with_symbol}
                  </Button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      )}
    </>
  );
};

export default PaymentForm;
