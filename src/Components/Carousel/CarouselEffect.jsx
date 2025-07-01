import React from 'react'
import classes from "./Carousel.module.css"
import { Carousel } from 'react-responsive-carousel'
import { img } from './Image/data'
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {
            img.map((imageItem,i)=>{
            return <img src={imageItem} alt="carousel" key={i}/>
            })
        }
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  )
}
