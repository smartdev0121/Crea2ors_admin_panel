import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const MColorButtonView = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "800",
  borderColor: "#da4bfd",
  backgroundColor: "#da4bfd",
  padding: "10px 30px",
  "&:hover": {
    backgroundColor: "#da4bfde1",
    borderColor: "#da4bfd",
  },
}));

export default MColorButtonView;
