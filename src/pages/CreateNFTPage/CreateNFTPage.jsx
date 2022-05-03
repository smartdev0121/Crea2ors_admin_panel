import React from "react";
import {
  Box,
  Container,
  Switch,
  Stack,
  ToggleButton,
  TextField,
  FormControl,
  Button,
  Input,
  InputLabel,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import { styled } from "@mui/material/styles";
import MFileInput from "../../components/MInput/MFileInput";
import {
  LocalOffer,
  AllInclusive,
  Public,
  HelpOutline,
} from "@mui/icons-material";
import MTextField from "../../components/MInput/MTextField";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import "./CreateNFTPage.scss";

const cryptoTypes = ["A2F", "BRISE", "BNB"];
const PanButton = styled(ToggleButton)((theme) => ({
  color: "#e0dfff",
  background: "transparent",
  borderRadius: "20px",
  textTransform: "none",
  border: "1px solid #5c5c5c",
  margin: "5px",
  "&:hover": {
    borderColor: "#394dd999",
  },
  "&:active": {
    borderColor: "#394dd999",
  },
}));

const HideButton = styled(Button)((theme) => ({
  color: "#e0dfff",
  background: "transparent",
  borderRadius: "20px",
  textTransform: "none",
  border: "1px solid #5c5c5c",
  "&:hover": {
    backgroundColor: "#394dd999",
  },
  "&:active": {
    borderColor: "#394dd999",
  },
}));

const UnsavedButton = styled(Button)((theme) => ({
  color: "#e0dfff",
  background: "transparent",
  textTransform: "none",
  border: "none",
  "&:hover": {
    backgroundColor: "#394dd999",
  },
  "&:active": {
    borderColor: "#394dd999",
  },
}));

export default function CreateNFTPage() {
  const handleFile = (fileUploaded) => {
    const file = fileUploaded;
  };
  const onSubmit = () => {};
  return (
    <div className="whole-container">
      <Container
        maxWidth="md"
        sx={{ paddingTop: "100px", paddingBottom: "20px" }}
      >
        <div className="title">
          <h1>Create NFT-Collectible 1</h1>
        </div>
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
          }}
          render={({ handleSubmit, submitting, form, values, pristine }) => {
            return (
              <form onSubmit={handleSubmit} noValidate>
                <Stack direction="row">
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "#00000075",
                    }}
                  >
                    <label className="subtitle">Upload file</label>

                    <div className="file-upload-part">
                      <h3 className="grey-txt">
                        PNG, GIF, WEBP, MP4 or MP3. Max: 100MB
                      </h3>
                      <MFileInput handleFile={handleFile} />
                    </div>

                    <div className="put-market-part">
                      <label>Put on marketplace</label>
                      <Switch defaultChecked />
                    </div>

                    <div className="price-part">
                      <label className="grey-txt">
                        Enter price to allow users instantly purchase your NFT
                      </label>
                      <Stack
                        direction="row"
                        sx={{ justifyContent: "space-around" }}
                      >
                        <PanButton value="fixed" className="pan-btn">
                          <div>
                            <LocalOffer />
                          </div>
                          <div>
                            Fixed<br></br> Price
                          </div>
                        </PanButton>
                        <PanButton value="open" className="pan-btn">
                          <div>
                            <AllInclusive />
                          </div>
                          <div>
                            Open for<br></br> bids
                          </div>
                        </PanButton>
                        <PanButton value="timed" className="pan-btn">
                          <div>
                            <Public />
                          </div>
                          <div>
                            Timed<br></br> auction
                          </div>
                        </PanButton>
                      </Stack>
                      <label className="subtitle">Price</label>
                      <Stack direction="row">
                        <Field
                          label="Enter price for one piece"
                          type="number"
                          name="price"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="end"
                                sx={{ color: "#888" }}
                              >
                                A2F:&nbsp;{" "}
                              </InputAdornment>
                            ),
                          }}
                          component={MTextField}
                        />
                        {/* <MSelectBox values={cryptoTypes} sx={{ width: "70px" }} /> */}
                      </Stack>

                      <h3 className="grey-txt">
                        Service fee: <span>2.5%</span>
                      </h3>
                      <h4 className="grey-txt">
                        You will receive: <span className="will-receive"></span>
                      </h4>
                    </div>

                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <label className="unlock subtitle">
                        Unlock once purchased
                      </label>
                      <Switch />
                    </Stack>
                    <label className="grey-txt">
                      Content will be unlocked after successful transaction
                    </label>
                    <div>
                      <Field
                        type="text"
                        label="Name"
                        name="name"
                        placeholder='e.g. "Redeemable T-Shirt with logo"'
                        component={MTextField}
                      />

                      <Field
                        name="description"
                        type="text"
                        label="Description"
                        placeholder='e.g. "After purchasing you will be able to get the real T-shirt"'
                        component={MTextField}
                        multiline
                      />
                    </div>

                    <Stack direction="row">
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, mt: 3, width: "25ch", flex: "1 1" }}
                      >
                        <Field
                          type="number"
                          name="royalty"
                          label="Royalties"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                          component={MTextField}
                        />

                        <FormHelperText
                          id="standard-weight-helper-text"
                          className="grey-txt"
                        >
                          Suggested: 0%, 10%, 20%, 30%<br></br>
                          Maximum is 50%
                        </FormHelperText>
                      </FormControl>
                      {console.log("Here is error")}

                      <FormControl
                        variant="standard"
                        sx={{ m: 1, mt: 3, width: "25ch", flex: "1 1" }}
                      >
                        <Field
                          type="number"
                          name="copyNumber"
                          label="Number of copies"
                          placeholder="e.g. M"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                          component={MTextField}
                        />
                        <FormHelperText
                          className="grey-txt"
                          id="standard-weight-helper-text"
                        >
                          Amount of tokens
                        </FormHelperText>
                      </FormControl>
                    </Stack>
                    <div className="hide-btn-part">
                      <HideButton>Hide advanced settings</HideButton>
                    </div>
                    <div>
                      <label className="subtitle">
                        Properties <span>(Optional)</span>
                      </label>
                      <Stack direction="row">
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          placeholder="e.g.Size"
                        />
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          placeholder="e.g.M"
                        />
                      </Stack>
                    </div>
                    <div>
                      <FormControl variant="standard" sx={{ width: "100%" }}>
                        <InputLabel>
                          Alternative text for NFT <span>(Optional)</span>
                        </InputLabel>
                        <Input
                          id="component-helper"
                          aria-describedby="component-helper-text"
                          placeholder='Image description in details (do not start with word "image"'
                          multiline
                        />
                        <FormHelperText
                          id="component-helper-text"
                          className="grey-txt"
                        >
                          Text that will be used in VoiceOver for people with
                          disabilities
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className="create-item-part">
                      <MColorButtonView>Create Item</MColorButtonView>
                      <UnsavedButton>
                        Unsaved changes
                        <HelpOutline />
                      </UnsavedButton>
                    </div>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "#00000075",
                    }}
                  >
                    <div className="preview-part">
                      Upload file to preview your brand new NFT
                    </div>
                  </Box>
                </Stack>
              </form>
            );
          }}
        />
      </Container>
    </div>
  );
}
