import React from 'react'
import CategoryCard from "./CategoryCard"
import { categoryInfo } from './CategoryFullinfos';
import classes from "./Category.module.css"
export default function Category() {
  return (
    
     <section className={classes.category_container}>
      {categoryInfo.map((info, i) => {
        // console.log(info);
        
        return <CategoryCard key={i} data={info} />;
      })}
    </section>
  
  )
}
