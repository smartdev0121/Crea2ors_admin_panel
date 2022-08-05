import { Link as RouterLink } from "react-router-dom";
// material
import { Grid, Button, Container, Stack, Typography, Box } from "@mui/material";
// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import {
  BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch,
} from "../../sections/@dashboard/blog";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryData, fetchCollectionData } from "src/store/data/actions";

export default function HomePage() {
  const [categories, setCategories] = useState();
  const [collections, setCollections] = useState();

  const dispatch = useDispatch();
  const tempCategories = useSelector((state) => state.data.categories);
  const tempCollections = useSelector((state) => state.data.collections);
  const homepageDatas = useSelector((state) => state.data.homepageDatas);
  const [curType, setCurType] = useState(1);
  console.log("haha", tempCollections);
  console.log("Categories", tempCategories);

  useEffect(async () => {
    dispatch(fetchCategoryData());
    dispatch(fetchCollectionData(1));
  }, []);

  useEffect(() => {
    setCategories(tempCategories);
    setCollections(tempCollections);
  }, [tempCategories, tempCollections]);

  const onSort = (value) => {
    console.log("SOrt value", value);
    setCurType(value);
    if (value == 1) {
      setCollections(tempCollections);
    } else {
      setCollections(tempCollections.filter((item) => item.category == value));
    }
    // dispatch(fetchCollectionData(value));
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Homepage
        </Typography>
      </Stack>

      <Stack
        mb={5}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <BlogPostsSort options={categories} onSort={onSort} />
      </Stack>

      <Grid container spacing={3}>
        {collections?.map((post, index) => {
          console.log("oidssdfsd", homepageDatas);
          return (
            <BlogPostCard
              key={post.id}
              post={post}
              index={index}
              category={curType}
              collectionId={post.id}
              homepageDatas={homepageDatas}
            />
          );
        })}
      </Grid>
    </Container>
  );
}
