import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const MColorButton = styled(Button)(({ theme }) => ({
  color: "#ffd132",
  borderColor: "#ffd132",
  padding: "10px 30px",
  "&:hover": {
    backgroundColor: "#8d8d8d57",
    borderColor: "#ffd132",
  },
}));

export default MColorButton;
