import React from "react";
import { Button } from "@mui/material";
const OnSale = () => {
  return (
    <div>
      <section className="button-bar"></section>
      <section className="content">
        <h1>No items found</h1>
        <p>
          Come back soon! Or try to browse something for you on our marketplace
        </p>
        <Button>Browse Template</Button>
      </section>
    </div>
  );
};

export default OnSale;
