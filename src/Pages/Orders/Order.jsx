import React, { useContext, useEffect, useState } from "react";
import classes from "./Order.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";

import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const usersCollectionRef = collection(db, "users");
      const userDocRef = doc(usersCollectionRef, user.uid);
      const ordersSubcollectionRef = collection(userDocRef, "orders");

      const q = query(ordersSubcollectionRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((document) => ({
              id: document.id,
              data: document.data(),
            }))
          );
        },
        (error) => {
          console.error("Error fetching orders:", error);
        }
      );

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>you don't have orders yet.</div>
          )}
          <div>
            {orders?.map((eachOrder, i) => {
              const keyForOrder = eachOrder?.id || i;
              return (
                <div key={keyForOrder}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.created && (
                    <p className={classes.order_date}>
                      Order Date:{" "}
                      {typeof eachOrder.data.created.toDate === "function"
                        ? new Date(
                            eachOrder.data.created.toDate()
                          ).toLocaleString()
                        : new Date(eachOrder.data.created).toLocaleString()}
                    </p>
                  )}
                  {eachOrder?.data?.basket?.map((orderItem) => (
                    <ProductCard
                      flex={true}
                      product={orderItem}
                      key={orderItem.id}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;