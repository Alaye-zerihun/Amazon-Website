import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../../Pages/Landing/Landing";
import Auth from "../Auth/SignUp";
import Payment from "../../Pages/Payment/Payment";
import Cart from "../Cart/Cart";
import Orders from "../../Pages/Orders/Order";
import Results from "../../Pages/Results/Results";
import ProductDetail from "../../Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "../../Components/ProtectdRoute/ProtectedRouter";

const stripePromise = loadStripe("pk_test_51RUXZsRtgVUgs6HMCL7kBHFlthRxGx0Kf1kjBrwXyEoXAJfPQKxXsXjUbDbPb36fLvQKjE0mE2H6FijR7EbTH1Xs005dp81t84");

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute msg={"You must login to pay"} redirect={"/auth"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute msg={"You must login to access your orders"} redirect={"/auth"}>
              <Elements stripe={stripePromise}>
                <Orders />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
