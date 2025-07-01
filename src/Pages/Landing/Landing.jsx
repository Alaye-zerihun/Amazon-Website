import React from "react";
import CarouselEffect from "../../Components/Carousel/CarouselEffect";
import Category from "../../Components/Category/Category";
import Product from "../../Components/Product/Product";
import LayOut from "../../components/LayOut/LayOut";

function Landing() {
  return (
    <div>
      <LayOut>
        <CarouselEffect />
        <Category />
        <Product />
      </LayOut>
    </div>
  );
}

export default Landing;