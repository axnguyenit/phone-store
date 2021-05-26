import {
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const CheckoutForm = ({
  user = {},
  handleChange,
  handleSubmit,
  checkoutData,
  totalPrice,
}) => {
  console.log(user);
  console.log(checkoutData);
  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="phone"
              name="phone"
              placeholder="Phone"
              value={user.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="address"
              name="address"
              placeholder="Address"
              value={user.address}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <div className="actions">
          <Button 
            size="medium" 
            to="/basket" 
            color="secondary"
            component={Link}
            variant="contained"
          >
            Previous
          </Button>
          <Button 
            type="submit" 
            size="medium" 
            color="primary" 
            variant="contained"
          >
            Next
          </Button>
        </div>
      </form>
    </>
)};

export default CheckoutForm;
