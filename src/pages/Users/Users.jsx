import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Chip from "@mui/material/Chip";

import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Button } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDatas, blockUser } from "src/store/data/actions";

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable({}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rowsData = useSelector((state) => state.data.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDatas());
  }, []);
  // Avoid a layout jump when reaching the last page with empty rows.

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onBlockClicked = (eve, type, id) => {
    console.log(id, type);
    dispatch(blockUser(id, type));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Wallet Address</TableCell>
            <TableCell align="right">Nick Name</TableCell>
            <TableCell align="right">Personal Site</TableCell>
            <TableCell align="right">Email Address</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Collection</TableCell>
            <TableCell align="right">NFTs Owned</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData &&
            (rowsPerPage > 0
              ? rowsData?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : rowsData
            ).map((row, index) => {
              let walletAddress =
                String(row.walletAddress).substring(0, 6) +
                "..." +
                String(row.walletAddress).substring(38);
              return (
                <TableRow key={"table" + index}>
                  <TableCell component="th" align="right">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {walletAddress}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.nickName || "Not set"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.nickName || "Not set"}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.email || "Not set"}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <Chip
                      label={row.verified == 1 ? "verified" : "unverified"}
                      color={row.verified == 1 ? "success" : "warning"}
                    />
                  </TableCell>

                  <TableCell style={{ width: 160 }} align="right">
                    {row?.collections ? row?.collections.length : 0}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row?.owned ? row?.owned.length : 0}
                  </TableCell>
                  <TableCell align="right">
                    {row.verified == "-1" ? (
                      <Button
                        onClick={(eve) =>
                          onBlockClicked(eve, "UNBLOCK", row.id)
                        }
                        variant="contained"
                        color="success"
                        sx={{ borderRadius: "20px" }}
                      >
                        Unblock
                      </Button>
                    ) : (
                      <Button
                        onClick={(eve) => onBlockClicked(eve, "BLOCK", row.id)}
                        variant="contained"
                        color="error"
                        sx={{ borderRadius: "20px" }}
                      >
                        Block
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={10}
              count={rowsData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

const promises = async () => {};

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
