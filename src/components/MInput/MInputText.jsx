import React from "react";
import styled from "styled-components";

const CustomInput = styled.input`
  background: transparent;
  border: 1px solid #999;
  border-radius: 5px;
  color: white;
`;

const MInputText = (props) => {
  const {
    disabled,
    type,
    icon,
    input,
    label,
    meta: { asyncValidating, touched, error },
  } = props;

  let validClass = "";
  if (touched && error) {
    validClass = "is-invalid";
  } else if (touched) {
    validClass = "is-valid";
  }

  return (
    <CustomInput
      type={type}
      icon={icon}
      label={label}
      className={validClass}
      disabled={disabled}
      value={typeof input.value === "number" ? `${input.value}` : input.value}
      onChange={input.onChange}
    />
  );
};

export default MInputText;
