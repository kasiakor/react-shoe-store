import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import Details from "./Details";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (id, sku) => {
    setCart((items) => {
      const sameItem = items.find((i) => i.sku === sku);
      if (sameItem) {
        // return new array with matching item replaced
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // return new array with appended new item
        return [...items, { id: id, sku: sku, quantity: 1 }];
      }
    });
  };

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      return items.map((i) =>
        i.sku === sku ? { ...i, quantity: quantity } : i
      );
    });
  }

  function removeCartItem() {
    setCart((items) => {
      return items.filter((i) => i.quantity !== 0);
    });
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Spike Heels</h1>}></Route>
            <Route path="/:category" element={<Products />}></Route>
            <Route
              path="/:category/:id"
              element={<Details addToCart={addToCart} />}
            ></Route>
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  updateQuantity={updateQuantity}
                  removeCartItem={removeCartItem}
                />
              }
            ></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
