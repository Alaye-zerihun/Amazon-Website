import axios from "axios";
import React, { useEffect, useState } from "react";
import { productUrl } from "../../Api/endPoints";
import { useParams } from "react-router-dom";
import LayOut from "../../components/LayOut/LayOut";
import classes from "./Results.module.css";
import ProductCard from "../../Components/Product/ProductCard";
function Results() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        <div className={classes.product_container}>
          {products?.map((product) => {
            // console.log(product);
            return (
              <ProductCard
                key={product.id}
                product={product}
                renderAdd={true}
              />
            );
          })}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;
