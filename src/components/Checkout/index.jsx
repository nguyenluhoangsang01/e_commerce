import {
  CssBaseline,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import commerce from "../../lib/commerce";
import AddressForm from "./AddressForm";
import Confirmation from "./Confirmation";
import PaymentForm from "./PaymentForm";
import useStyles from "./styles";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, errorMessage, handleCaptureCheckout }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const navigate = useNavigate();

  const [checkoutToken, setCheckoutToken] = useState(null);

  useEffect(() => {
    const generateCheckoutToken = () => {
      cart.line_items?.length &&
        commerce.checkout
          .generateToken(cart.id, { type: "cart" })
          .then((token) => setCheckoutToken(token))
          .catch((error) => {
            console.log("There was an error in generating a token", error);
            navigate("/", { replace: true });
          });
    };

    generateCheckoutToken();
  }, [cart.id, cart.line_items, navigate]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleData = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} handleData={handleData} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        order={order}
        errorMessage={errorMessage}
        handleCaptureCheckout={handleCaptureCheckout}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <Confirmation order={order} errorMessage={errorMessage} />
          ) : (
            <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
