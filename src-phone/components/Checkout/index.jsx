import { useState, useEffect, useRef } from "react";
import {
  Step,
  Paper,
  Stepper,
  StepLabel,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { renderRelatedComponent } from "./helpers";
import "./style.css";

// import NavBar from '../Header/NavBar';

const steps = ["Address", "Details", "Payment"];

const convertObjectToArray = (countries) =>
  Object.entries(countries || {}).map(([code, name]) => ({ code, name }));

const usePreviousState = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Checkout = ({ basketData, orderInfo, orderError, handleCheckout }) => {
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
  const [checkoutData, setCheckoutData] = useState("");

  const previousShippingCountry = usePreviousState(user.shippingCountry);
  const previousShippingSubdivision = usePreviousState(
    user.shippingSubdivision
  );

  const history = useHistory();

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
              orderInfo,
              orderError,
              bookingStep,
              handleChange,
              handleSubmit,
              checkoutData,
              handleBackStep,
              handleNextStep,
              handleCheckout,
              handleSelectChange,
            })}
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Checkout;
