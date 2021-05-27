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
import axios from "axios";
import "./style.css";

const API_BASKETS_URL = `http://localhost:4000/api/baskets`;
const API_USERS_URL = `http://localhost:4000/api/users`;
const steps = ["Address", "Details", "Payment"];

const Checkout = () => {
  const [user, setUser] = useState();
  const [bookingStep, setBookingStep] = useState("Address");
  const [checkoutData, setCheckoutData] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();

  const fetchUser = () => {
    if(localStorage.getItem('userID')) {
      const userID = JSON.parse(localStorage.getItem('userID'));
      axios.get(API_USERS_URL + '/' + userID).then(res => {
        setUser(res.data);
      })
    }
    else {
      history.goBack();
    }
  }

  const fetchCheckoutData = () => {
    if(localStorage.getItem('basket')) {
      let basket = JSON.parse(localStorage.getItem('basket'));
      let total = 0;

      basket.map(item => total += item.total);
      if(localStorage.getItem('products')) {
        let products = JSON.parse(localStorage.getItem('products'));
        let checkoutData = [];
        products.map(product => {
          basket.map(item => {
            if(product.id === item.id) {
              let itemTerm = item;
              itemTerm.name = product.name;

              checkoutData.push(itemTerm);
            }
          })
        })
        setTotalPrice(total);
        setCheckoutData(checkoutData);
      }
    }
  }

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

  useEffect(() => {
    fetchUser();
    fetchCheckoutData();
  }, []);

  return (
    <>
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
              checkoutData,
              totalPrice,
              handleChange,
              handleSubmit,
              handleBackStep,
              handleNextStep,
            })}
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Checkout;
