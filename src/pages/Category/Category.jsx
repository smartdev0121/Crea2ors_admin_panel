import React, { useEffect } from "react";
import {
  List,
  Container,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  DialogTitle,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Delete } from "@mui/icons-material";
import styled from "styled-components";

import {
  fetchCategoryData,
  newCategoryAdded,
  CategoryDelete,
} from "src/store/data/actions";
import { useDispatch, useSelector } from "react-redux";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.data.categories);
  console.log(categories);
  const [cateDatas, setCateDatas] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [nameVal, setNameVal] = React.useState("");

  useEffect(async () => {
    dispatch(fetchCategoryData());
  }, []);

  useEffect(() => {
    setCateDatas(categories);
  }, [categories]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onNameChange = (eve) => {
    setNameVal(eve.target.value);
  };

  const onSubmit = () => {
    dispatch(newCategoryAdded(nameVal));
    handleClose();
  };

  const onDeleted = (eve, index) => {
    dispatch(CategoryDelete(index));
  };

  return (
    <Container maxWidth="md">
      <NewButton onClick={handleClickOpen}>New Category</NewButton>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {cateDatas?.map((item, index) => {
          return (
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(eve) => onDeleted(eve, item.id)}
                >
                  <Delete />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter new category's name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            defaultValue={nameVal}
            onChange={onNameChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Category;

const NewButton = styled(Button)`
  background: #516fff !important;
  color: white !important;
  margin: 10px !important;
`;
