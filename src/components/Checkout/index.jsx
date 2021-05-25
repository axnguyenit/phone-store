import React, { useState, useEffect, useRef } from "react";
import {
  Step,
  Paper,
  Stepper,
  StepLabel,
  Container,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { renderRelatedComponent } from "./helpers";
import "./style.css";

// const NavBar = React.lazy(() => import('../Header/NavBar'));
// import NavBar from '';

const steps = ["Address", "Details", "Payment"];

const Checkout = () => {
  const [user, setUser] = useState({
    city: "",
    email: "",
    address: "",
    postCode: "",
    lastName: "",
    firstName: "",
    shippingOption: {},
    shippingOptions: [],
    shippingCountry: {},
    shippingCountries: [],
    shippingSubdivision: {},
    shippingSubdivisions: [],
  });
  const [bookingStep, setBookingStep] = useState("Address");

  const history = useHistory();
  // history.replace('/checkout');
  // console.log(history);
  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingStep("Details");
  };

  const handleNextStep = (e, step) => {
    e.preventDefault();
    setBookingStep(step);
  };

  const handleBackStep = (e, step) => {
    e.preventDefault();
    setBookingStep(step);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSelectChange = (e, state) => {
    const { name, value } = e.target;
    if (state === "shippingOptions") {
      setUser({
        ...user,
        [name]: {
          id: value,
        },
      });
    } else {
      setUser({
        ...user,
        [name]: {
          name: user[state].find((country) => country.code === value).name,
          code: value,
        },
      });
    }
  };

  return (
    <>
      {/* <NavBar/> */}
      <div className="checkout">
        <Container>
          <Paper className="paper" elevation={3}>
            <Typography align="center" variant="h5" gutterBottom>
              Checkout
            </Typography>
            {bookingStep !== "confirmation" && (
              <Stepper
                className="stepper"
                activeStep={steps.indexOf(bookingStep)}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
            {renderRelatedComponent({
              user,
              bookingStep,
              handleChange,
              handleSubmit,
              handleBackStep,
              handleNextStep,
              handleSelectChange,
            })}
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Checkout;
