import { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Details from "./Details";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { CartContext } from "./cartContext";
import cartReducer from "./cartReducer";

let initialState;
try {
  initialState = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("Your cart could not be parsed into JSON");
  initialState = [];
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  return (
    <CartContext value={{ cart, dispatch }}>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Spike Heels</h1>}></Route>
            <Route path="/:category" element={<Products />}></Route>
            <Route
              path="/:category/:id"
              element={<Details dispatch={dispatch} />}
            ></Route>
            <Route
              path="/cart"
              element={<Cart cart={cart} dispatch={dispatch} />}
            ></Route>
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatch={dispatch} />}
            ></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </CartContext>
  );
}
