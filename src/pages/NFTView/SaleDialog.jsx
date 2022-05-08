import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { MDescription, MTitle } from "src/components/MTextLabels";
import MTextField from "src/components/MInput/MTextField";
import { Form, Field } from "react-final-form";
import { InputAdornment } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value != index}>
      {value == index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const SaleDialog = (props) => {
  const [value, setValue] = React.useState(0);

  const [timeValue, setTimeValue] = React.useState(
    new Date("2018-01-01T00:00:00.000Z")
  );

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (values) => {};
  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        if (values.quantity > 100) {
          errors.quantity = "Quantity is not greater than 100";
        }
      }}
      render={({ handleSubmit, submitting, form, values, pristine }) => {
        return (
          <form>
            <Dialog open={props.open} onClose={props.onClose}>
              <DialogTitle sx={{ backgroundColor: "#24253c" }}>
                Sell
              </DialogTitle>
              <DialogContent sx={{ backgroundColor: "#24253c" }}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                    sx={{ flexDirection: "row !important" }}
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="Fixed price"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Timed Auction"
                    />
                  </RadioGroup>
                </FormControl>
                <TabPanel value={value} index={0}>
                  <MTitle>Quantity</MTitle>
                  <MDescription>
                    For quantities listed greater than 1, buyers will need to
                    purchase the entire quantity. Users are not able to purchase
                    partial amounts on Bitgert
                  </MDescription>
                  <Field
                    name="quantity"
                    component={MTextField}
                    inputProps={{ min: 1, max: 10, type: "number" }}
                    autoFocus
                    fullWidth
                    label="Quantity"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DateTimePicker
                        renderInput={(params) => <TextField {...params} />}
                        value={timeValue}
                        onChange={(newValue) => {
                          setTimeValue(newValue);
                        }}
                        className="date-time"
                      />
                      <DateTimePicker
                        renderInput={(params) => <TextField {...params} />}
                        value={timeValue}
                        onChange={(newValue) => {
                          setTimeValue(newValue);
                        }}
                      />
                    </Stack>
                  </LocalizationProvider>
                </TabPanel>

                <DialogContentText sx={{ marginBottom: "10px" }}>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText>
                <Field
                  name="price"
                  component={MTextField}
                  inputProps={{ min: 1, type: "number" }}
                  autoFocus
                  fullWidth
                  label="Price"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">CR2</InputAdornment>
                    ),
                  }}
                />
              </DialogContent>
              <DialogActions sx={{ backgroundColor: "#24253c" }}>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={props.onClose}>Complete Listing</Button>
              </DialogActions>
            </Dialog>
          </form>
        );
      }}
    ></Form>
  );
};

export default SaleDialog;
