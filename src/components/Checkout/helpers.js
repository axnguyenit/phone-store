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
  handleChange,
  orderInfo,
  handleBackStep,
  handleNextStep,
}) => {
  switch (bookingStep) {
    case "Address":
      return (
        <CheckoutForm
        user={user}
        orderInfo={orderInfo}
        checkoutData={checkoutData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
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
