import React from "react";
import styled from "styled-components";
import { Button, Paper, Stack, Grid, Skeleton } from "@mui/material";
import { MImg } from "../MImages";
import { Visibility, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

const MCollectionCard = ({ isLoading, data }) => {
  return (
    <CardContainer>
      <FlexBetween>
        <Stack>
          {isLoading ? (
            <Skeleton width="130px" height="20px" animation="wave" />
          ) : (
            <MTitle>{data.name}</MTitle>
          )}

          <div>
            {isLoading ? (
              <Skeleton width="130px" height="20px" animation="wave" />
            ) : (
              <SubTitle>
                {data.category
                  ? data.category + "/" + data.subCategory
                  : data.subCategory}
              </SubTitle>
            )}
            {isLoading ? (
              <Skeleton width="120px" height="20px" animation="wave" />
            ) : (
              <MEditionText>Edition: 8/{data.token_limit}</MEditionText>
            )}
          </div>
        </Stack>
        {isLoading ? (
          <Skeleton width="98px" height="83px" animation="wave" />
        ) : (
          <Stack>
            <Link to={`/collection-view/${data.contract_address}`}>
              <ViewButton>
                <Visibility fontSize="small" />
                &nbsp;View
              </ViewButton>
            </Link>
            <Link to={`/collection-view/${data.contract_address}`}>
              <AddButton>
                <Add fontSize="small" />
                &nbsp;Add Item
              </AddButton>
            </Link>
          </Stack>
        )}
      </FlexBetween>
      <Grid container spacing={1} sx={{ height: "130px" }}>
        {isLoading ? (
          <Skeleton width="180px" height="122px" animation="wave" />
        ) : (
          <Grid item xs={8} sx={{ height: "130px" }}>
            <MImg src={data.image_url}></MImg>
          </Grid>
        )}

        <Grid item xs={4} sx={{ height: "100%" }}>
          <Stack spacing={1} sx={{ height: "100%" }}>
            {isLoading ? (
              <Skeleton width="86px" height="57px" animation="wave" />
            ) : (
              <ImageBox>
                <MImg src={data.image_url}></MImg>
              </ImageBox>
            )}

            {isLoading ? (
              <Skeleton width="86px" height="57px" animation="wave" />
            ) : (
              <ImageBox>
                <MImg src={data.image_url}></MImg>
              </ImageBox>
            )}
          </Stack>
        </Grid>
      </Grid>
      {isLoading ? (
        <Skeleton width="270px" height="22px" animation="wave" />
      ) : (
        <MDescription>{data.description}</MDescription>
      )}
    </CardContainer>
  );
};

export default MCollectionCard;

const ImageBox = styled.div`
  height: calc((100% - 8px) / 2);
`;
const MTitle = styled.h6`
  color: #ffaf36 !important;
`;
const MDescription = styled.p`
  color: #aaa !important;
  margin: 5px 0;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardContainer = styled(Paper)`
  background-color: rgb(30, 32, 38) !important;
  max-width: 300px;
  padding: 10px 10px;
  border-radius: 5px;
  border: 1px solid #333;
  margin: 5px;
  &:hover {
    background-color: rgb(38 40 48) !important;
    transform: translateY(-1px);
  }
`;

export const MEditionText = styled.span`
  display: block;
  color: #aaa !important;
  font-size: 12px;
  margin: 5px 0;
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubTitle = styled.span`
  display: block;
  font-size: 13px;
  color: #ccc !important;
  margin: 5px 0;
`;

const ViewButton = styled(Button)`
  background-color: rgb(43, 49, 57) !important;
  text-transform: none !important;
  border: 1px solid #444 !important;
  color: #ccc !important;
  font-size: 14px !important;
  padding: 5px !important;
  margin: 3px !important;
  width: 100% !important;
`;

const AddButton = styled(Button)`
  text-transform: none !important;
  color: #ddd !important;
  padding: 5px !important;
  font-size: 14px !important;
  padding: 5px !important;
  margin: 3px !important;
`;
