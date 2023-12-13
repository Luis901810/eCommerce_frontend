// ImageCarousel.js

import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box, Typography } from "@mui/material";

function ImageCarousel() {
  const carouselImageStyle = {
    height: "300px",
    objectFit: "scale-down",
  };

  const carouselItemStyle = {
    backgroundColor: "#414141",
    border: "2px solid #42e268",
    borderRadius: 10,
    boxShadow: "none",
    textAlign: "center",
  };

  const carouselContentStyle = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Box
      sx={{
        height: "60vh",
        width: "80vw",
        marginTop: 10,
      }}
    >
      <Carousel>
        <Paper style={carouselItemStyle}>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <img
              src={
                "https://cdn.shopify.com/s/files/1/2358/2817/products/dunk-low-green-glow-866561.png?v=1638813882"
              }
              alt={"zapatilla nike"}
              style={carouselImageStyle}
            />
          </Box>
          <Typography variant="h2" sx={{color: '#42e268'}} >25% OFF en zapatillas Nike</Typography>
        </Paper>
        <Paper style={carouselItemStyle}>
          <div style={carouselContentStyle}>
            <img
              src={
                "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/33217/father-son-daughter-clipart-md.png"
              }
              alt={"dia del padre"}
              style={carouselImageStyle}
            />
          </div>
          <Typography variant="h2" sx={{color: '#42e268'}} >Ofertas día del padre</Typography>
        </Paper>
      </Carousel>
    </Box>
  );
}

export default ImageCarousel;
