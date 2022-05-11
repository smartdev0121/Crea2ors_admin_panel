import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function MBidDialog(props) {
  const [bidPrice, setBidPrice] = React.useState(0);
  const subscribeBidPrice = () => {
    props.onPlaceBid(props.index, bidPrice);
    props.onClose();
  };

  const onChange = (eve) => {
    setBidPrice(eve.target.value);
  };
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            value={bidPrice}
            onChange={onChange}
            margin="dense"
            label="Enter Bid Price"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={subscribeBidPrice}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
