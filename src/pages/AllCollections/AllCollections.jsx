import React, { useEffect } from "react";
import { MContainer, MBox, MFlexBox } from "src/components/MLayout";
import { MTitle, MDescription } from "src/components/MTextLabels";
import { Add } from "@mui/icons-material";
import MColorButtonView from "src/components/MInput/MColorButtonView";
import MCollectionCard from "src/components/MCards/MCollectionCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllCollections } from "src/store/contract/actions";

const AllCollections = (props) => {
  const dispatch = useDispatch();
  const allCollections = useSelector((state) => state.contract.allCollections);
  useEffect(() => {
    dispatch(getAllCollections());
  }, []);

  const onNewCollection = () => {
    props.history.push("/create-collection");
  };

  return (
    <MContainer maxWidth="xl">
      <MBox>
        <MTitle>Explore Collections</MTitle>
        <MDescription>You can create, view and mint asset here</MDescription>
        <MColorButtonView onClick={onNewCollection}>
          <Add />
          New collection
        </MColorButtonView>
      </MBox>
      <MFlexBox>
        {allCollections.map((item, index) => {
          return (
            <MCollectionCard
              data={item}
              key={item.id + index}
            ></MCollectionCard>
          );
        })}
      </MFlexBox>
    </MContainer>
  );
};

export default AllCollections;
