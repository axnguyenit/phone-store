import React from "react";
import {
  List,
  ListItem,
  Button,
  Typography,
  ListItemText,
} from "@material-ui/core";

const BookingDetails = ({ checkoutData, handleBackStep, handleNextStep }) => (
  <>
    <List>
      {/* {checkoutData.live.line_items.map((item) => ( */}
        <ListItem>
          <ListItemText
            primary="Sony Xperia XZ2"
            secondary={`Quantity: 2`}
          />
          <Typography variant="body2">
            5.000.000
            {/* {item.line_total.formatted_with_symbol} */}
          </Typography>
        </ListItem>
      {/* ))} */}
      <ListItem>
        <ListItemText primary="Total price" />
        <Typography variant="body2">
          {/* {checkoutData.live.subtotal.formatted_with_code} */}
          5.000.000
        </Typography>
      </ListItem>
    </List>

    <div className="actions">
      <Button
        size="medium"
        onClick={(e) => handleBackStep(e, "Address")}
        variant="contained"
      >
        Go Back
      </Button>
      <Button
        onClick={(e) => handleNextStep(e, "Payment")}
        size="medium"
        color="secondary"
        variant="contained"
      >
        Next
      </Button>
    </div>
  </>
);

export default BookingDetails;
