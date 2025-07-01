import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/Layout/Layout";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormatter/CurrencyFormatter";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/Action.type"; 


function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const totalItem = basket?.reduce((sum, item) => sum + item.amount, 0);
  const totalPrice = basket?.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  const handleChange = (e) => {
    if (e.error) {
      setCardError(e.error.message);
    } else {
      setCardError("");
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !user) {
      setCardError("Stripe has not loaded yet.");
      setProcessing(false);
      return;
    }

    if (!basket || basket.length === 0) {
      setCardError("Your basket is empty.");
      setProcessing(false);
      return;
    }

    if (!totalPrice || isNaN(totalPrice) || totalPrice <= 0) {
      setCardError("Invalid total amount.");
      setProcessing(false);
      return;
    }

    try {
      setProcessing(true);

      const amountInCents = Math.round(totalPrice * 100);
      const response = await axiosInstance.post(`/payments/create?total=${amountInCents}`);
      const { clientSecret, error: backendError } = response.data;

      if (!clientSecret) {
        throw new Error(backendError || "No client secret returned from server.");
      }

      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setCardError(stripeError.message);
        return;
      }

      const orderRef = doc(collection(db, "users", user.uid, "orders"), paymentIntent.id);
      await setDoc(orderRef, {
        basket,
        amount: paymentIntent.amount / 100,
        created: new Date(paymentIntent.created * 1000),
        paymentId: paymentIntent.id,
        status: paymentIntent.status,
      });

      dispatch({ type: Type.EMPTY_BASKET });
      navigate("/orders");
    } catch (error) {
      setCardError(error.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>
        Checkout ({totalItem} item{totalItem !== 1 && "s"})
      </div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email || "Guest"}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        <div>
          <h3>Review Items and Delivery</h3>
          {basket?.length > 0 ? (
            basket.map((item) => (
              <ProductCard key={item.id || item.title} product={item} flex={true} />
            ))
          ) : (
            <p>Your basket is empty.</p>
          )}
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && <small className={classes.error}>{cardError}</small>}
                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total |</p>
                      <CurrencyFormat amount={totalPrice} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing || !stripe || !elements}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Processing...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;