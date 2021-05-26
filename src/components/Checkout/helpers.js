import CheckoutForm from "./CheckoutForm";
import BookingDetails from "./BookingDetails";
import Confirmation from "./Confirmation";
import Payment from "./Payment";

export const renderRelatedComponent = ({
  user,
  bookingStep,
  handleSubmit,
  checkoutData,
  totalPrice,
  handleBackStep,
  handleNextStep,
  handleCheckout,
}) => {
  switch (bookingStep) {
    case "Address":
      return (
        <CheckoutForm
          user={user}
          checkoutData={checkoutData}
          totalPrice={totalPrice}
          handleSubmit={handleSubmit}
        />
      );
    case "Details":
      return (
        <BookingDetails
          user={user}
          checkoutData={checkoutData}
          totalPrice={totalPrice}
          handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
          handleCheckout={handleCheckout}
        />
      );
    case "Payment":
      return (
        <Payment
          user={user}
          checkoutData={checkoutData}
          totalPrice={totalPrice}
          handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
          handleCheckout={handleCheckout}
        />
      );
    case "confirmation":
      return  <Confirmation 
                user={user}
                checkoutData={checkoutData}
                totalPrice={totalPrice}
              />;
    default:
      return null;
  }
};
