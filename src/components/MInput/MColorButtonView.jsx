import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const MColorButtonView = styled(Button)(({ theme }) => ({
  color: "black",
  fontWeight: "800",
  borderColor: "#ffd132",
  backgroundColor: "#ffd132",
  padding: "10px 30px",
  "&:hover": {
    backgroundColor: "#ffd132e1",
    borderColor: "#ffd132",
  },
}));

export default MColorButtonView;
