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
  IconButton,
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
  DeleteForever,
  Public,
  HelpOutline,
} from "@mui/icons-material";
import MTextField from "../../components/MInput/MTextField";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import { MPanButton } from "../../components/MButtons/MPanButton";
import "./CreateNFTPage.scss";

const cryptoTypes = ["A2F", "BRISE", "BNB"];

const settingTypes = ["FIXED", "BID", "AUCTION"];

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
  const [file, setFile] = React.useState(null);
  const hiddenFileInput = React.useRef(null);
  const [result, setResult] = React.useState(null);
  const [saleStatus, setSaleStatus] = React.useState(true);
  const [price, setPrice] = React.useState(0);
  const [settingType, setSettingType] = React.useState(settingTypes[0]);
  const useDisplayImage = () => {
    const uploader = (e) => {
      const imageFile = e.target.files[0];

      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    };
    return { uploader };
  };

  const { uploader } = useDisplayImage();

  const onFileChanged = (e) => {
    uploader(e);
    setFile(e.target.files[0]);
  };

  const onUploadClicked = () => {
    hiddenFileInput.current.click();
  };

  const removeFile = () => {
    setFile(null);
    setResult(null);
  };

  const onPutOn = (e) => {
    setSaleStatus(e.target.checked);
  };

  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const onPanClicked = (type) => {
    setSettingType(type);
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
                      {result && (
                        <IconButton className="delete-btn" onClick={removeFile}>
                          <DeleteForever sx={{ color: "white" }} />
                        </IconButton>
                      )}

                      <input
                        type="file"
                        hidden
                        ref={hiddenFileInput}
                        id="media_file"
                        onChange={onFileChanged}
                        accept=".PNG, .GIF, .WEBP, .MP4, .MP3, .jpg, .jpeg"
                      />
                      {result ? (
                        <img src={result || ""} className="viewport" />
                      ) : (
                        <>
                          <h6 className="grey-txt multi-txt">
                            PNG, GIF, WEBP, MP4 or MP3. Max: 100MB
                          </h6>
                          <CustomButton onClick={onUploadClicked}>
                            Upload a File
                          </CustomButton>
                        </>
                      )}
                    </div>

                    <div className="put-market-part">
                      <label>Put on marketplace</label>
                      <Switch checked={saleStatus} onChange={onPutOn} />
                    </div>

                    {saleStatus && (
                      <div className="price-part">
                        <label className="grey-txt">
                          Enter price to allow users instantly purchase your NFT
                        </label>
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "space-around" }}
                        >
                          {settingTypes.map((item) => {
                            console.log(item);
                            return (
                              <MPanButton
                                key={item}
                                className="pan-btn"
                                onClick={() => onPanClicked(item)}
                              >
                                <div>
                                  {item === "FIXED" && <LocalOffer />}
                                  {item === "BID" && <AllInclusive />}
                                  {item === "AUCTION" && <Public />}
                                </div>
                                <div>
                                  {item === "FIXED" && `Fixed`}
                                  {item === "BID" && `Open for`}
                                  {item === "AUCTION" && `Timed`}
                                  <br />
                                  {item === "FIXED" && `price`}
                                  {item === "BID" && `bids`}
                                  {item === "AUCTION" && `auction`}
                                </div>
                              </MPanButton>
                            );
                          })}
                        </Stack>
                        {settingType == "FIXED" && (
                          <>
                            <label className="subtitle">Price</label>
                            <Stack direction="row">
                              <Field
                                label="Enter price for one piece"
                                className="loyalty"
                                name="price"
                                onChange={onPriceChange}
                                initialValue={price}
                                inputProps={{
                                  min: 0,
                                  type: "number",
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment
                                      position="end"
                                      sx={{ color: "#888" }}
                                    >
                                      CR2&nbsp;{" "}
                                    </InputAdornment>
                                  ),
                                }}
                                component={MTextField}
                              />
                              {/* <MSelectBox values={cryptoTypes} sx={{ width: "70px" }} /> */}
                            </Stack>

                            <h6 className="grey-txt">
                              Service fee: <span>2.5%</span>
                            </h6>
                            <h6 className="grey-txt">
                              You will receive:
                              <span className="will-receive">
                                &nbsp;{(price * 2.5) / 100} CR2
                              </span>{" "}
                              =
                              <span>
                                &nbsp; $
                                {Number((0.001 * price * 2.5) / 100).toFixed(6)}
                              </span>
                            </h6>
                          </>
                        )}
                      </div>
                    )}

                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* <label className="unlock subtitle">
                        Unlock once purchased
                      </label>
                      <Switch /> */}
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
                      {result ? (
                        <img src={result || ""} className="viewport" />
                      ) : (
                        <h6>Upload file to preview your brand new NFT</h6>
                      )}
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
