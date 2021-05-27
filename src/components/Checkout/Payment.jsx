import { Button } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import emailjs from 'emailjs-com';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const Payment = ({
  user,
  checkoutData,
  totalPrice,
  handleBackStep,
  handleNextStep,
  handleCheckout,
}) => {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    console.log(e.target);
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      //send email about order details to user
      emailjs.sendForm('default_service', 'template_order', e.target, `user_eGZkjyOWcdrxHJK1InigS`)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      handleNextStep(e, "confirmation");
    }
  };
  console.log(user);
  return (
    <>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              {
                checkoutData.map((item, index) => {
                  return <div key={index}>
                    <input name={`prod_name${index + 1}`} type="text" value={item.name} hidden/>
                    <input name={`prod_unitPrice${index + 1}`} type="text" value={item.unitPrice} hidden/>
                    <input name={`prod_quantity${index + 1}`} type="text" value={item.quantity} hidden/>
                    <input name={`prod_total${index + 1}`} type="text" value={item.total} hidden/>
                  </div>
                })
              }

              <div>
                <input name="to_name" type="text" value={user.name} hidden/>
                <input name="to_email" type="text" value={user.email} hidden/>
                <input name="phone" type="text" value={user.phone} hidden/>
                <input name="address" type="text" value={user.address} hidden/>
                <input name="sub_total" type="text" value={totalPrice} hidden/>
              </div>

              <CardElement />
              <div className="actions payment-actions">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => handleBackStep(e, "Details")}
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay ${totalPrice}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default Payment;
