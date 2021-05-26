import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import emailjs from 'emailjs-com';
import { useEffect } from "react";
import { Link } from "react-router-dom";
const API_ORDERS_URL = `http://localhost:4000/api/orders`;

const Confirmation = ({user}) => {
  const sendEmail = (e) => {
    e.preventDefault();
    console.log(e);

    emailjs.sendForm('default_service', 'template_order', e.target, `user_eGZkjyOWcdrxHJK1InigS`)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
  }

  const updateOrder = () => {
    if(localStorage.getItem('basket')) {
      let basket = JSON.parse(localStorage.getItem('basket'));
      let orderDetails = [];
      basket.map(item => {
        let orderItem = {
          prodId: item.id,
          quantity: item.quantity,
        }
        orderDetails.push(orderItem);
      })
      let order = {
        userId: user.id,
        status: 'pending',
        details: orderDetails,
      }

      axios.post(API_ORDERS_URL, order).then(res => {

        localStorage.removeItem('basket');
      })
    }
  }

  useEffect(() => {
    updateOrder();
  }, []);

  return (
    <div className="confirmation">
      <Typography variant="h5" align="center">
        Thank you {user.name}{". "}
        Thank you for your purchase!
      </Typography>
      <Button component={Link} variant="contained" type="button" to="/">
        Continue shopping
      </Button>
    </div>
  );
};

export default Confirmation;
