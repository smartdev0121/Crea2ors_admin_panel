import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import "./MTextField.scss";

const CustomInput = styled(TextField)({
  width: "100%",
  "& label.Mui-focused": {
    color: "#999",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#95959561",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#9b9b9b61",
      color: "#999",
    },
    "&:hover fieldset": {
      borderColor: "#ffffff61",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#444",
    },
  },
  "& .MuiInputLabel-root": {
    zIndex: "unset",
  },
});
const MTextField = (props) => {
  const {
    disabled,
    icon,
    input,
    label,
    meta: { asyncValidating, touched, error },
    required,
    placeholder,
    helperText,
  } = props;

  let validClass = "";
  if (touched && error) {
    validClass = "is-invalid";
  } else if (touched) {
    validClass = "is-valid";
  }

  return (
    <div>
      <CustomInput
        type={input.type}
        icon={icon}
        label={label}
        className={validClass}
        disabled={disabled}
        placeholder={placeholder}
        InputLabelProps={{ ...props.InputLabelProps }}
        InputProps={{ ...props.InputProps }}
        multiline={{ ...props.multiline }}
        helperText={helperText}
        name={input.name}
        required={required}
        value={typeof input.value === "number" ? `${input.value}` : input.value}
        onChange={input.onChange}
      />
      {asyncValidating && (
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <div className="invalid-feedback">{touched && error}</div>
    </div>
  );
};
export default MTextField;
