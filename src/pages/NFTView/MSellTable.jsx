import React, {useEffect} from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Chip, Avatar, Button} from "@mui/material"
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Cancel, ShoppingBasket} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData } from "src/store/order/actions";
import { purple } from '@mui/material/colors';
import "dotenv/config";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#242638fa",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#312b424f",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const dispatch = useDispatch();
  const ordersData = useSelector((state) => state.orders);
  console.log(ordersData);
  useEffect(() => {
    dispatch(fetchOrderData());
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell >Quantity</StyledTableCell>
            <StyledTableCell >Max bid Price</StyledTableCell>
            <StyledTableCell >Creator</StyledTableCell>
            <StyledTableCell >Timed Limit</StyledTableCell>
            <StyledTableCell >Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersData.map((row, index) => (
            <StyledTableRow key={"Order_table" + index}>
              <StyledTableCell>
                {row.price}CR2
              </StyledTableCell>
              <StyledTableCell >{row.amount}</StyledTableCell>
              <StyledTableCell >{row.maxBidPrice == -1 && "#"}</StyledTableCell>
              <StyledTableCell >
                <Chip 
                  icon={
                    <Avatar sx={{width: 24, height: 24}} 
                      src={process.env.REACT_APP_BACKEND_URL + row.User.avatar_url || ""}
                    />
                  } label={row.User.nickName}/>
              </StyledTableCell>
              <StyledTableCell >{row.startTime == row.endTime && "#"}</StyledTableCell>
              <StyledTableCell >  
                <ColorButton variant="contained" endIcon={<Cancel />}>
                  Cancel
                </ColorButton>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));