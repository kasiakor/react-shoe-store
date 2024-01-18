import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Details from "./Details";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";

export default function App() {
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
              element={<Details dispatch={dispatch} />}
            ></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatch={dispatch} />}
            ></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
