import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Confirmation = ({user}) => {
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
