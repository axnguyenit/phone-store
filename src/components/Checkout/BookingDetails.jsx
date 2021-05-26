import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Button,
  Typography,
  ListItemText,
} from "@material-ui/core";

const BookingDetails = ({ checkoutData, handleBackStep, handleNextStep, totalPrice }) => {
  return (
    <>
      <List>
        {checkoutData.map((item) => (
          <ListItem>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
              />
            <Typography variant="body2">
              ${item.total}
            </Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Total price" />
          <Typography variant="body2">
            ${totalPrice}
          </Typography>
        </ListItem>
      </List>

      <div className="actions">
        <Button
          size="medium"
          onClick={(e) => handleBackStep(e, "Address")}
          color="secondary"
          variant="contained"
        >
          Previous
        </Button>
        <Button
          onClick={(e) => handleNextStep(e, "Payment")}
          size="medium"
          color="primary"
          variant="contained"
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default BookingDetails;
