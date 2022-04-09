import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
// Style the Button component
const CustomButton = styled(Button)((theme) => ({
  color: "#e0dfff",
  background: "#394dd966",
  borderRadius: "20px",
  textTransform: "none",
  padding: "7px 30px",
  "&:hover": {
    backgroundColor: "#394dd999",
  },
}));

const FileUploader = (props) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  return (
    <>
      <CustomButton onClick={handleClick}>Upload a file</CustomButton>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
};
export default FileUploader;
