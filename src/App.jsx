import { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";

const products = [
  {
    id: 1,
    category: "shoes",
    image: "shoe1.jpg",
    name: "Black Widow",
    price: 94.95,
    skus: [
      { sku: "17", size: 7 },
      { sku: "18", size: 8 },
    ],
    description: "Classic black dress high heels.",
  },
  {
    id: 2,
    category: "shoes",
    image: "shoe2.jpg",
    name: "Bloody Red",
    price: 78.99,
    skus: [
      { sku: "28", size: 8 },
      { sku: "29", size: 9 },
    ],
    description: "Party red hot chilly heels.",
  },
  {
    id: 3,
    category: "shoes",
    image: "shoe3.jpg",
    name: "Vintage Doll",
    price: 145.95,
    skus: [
      { sku: "37", size: 7 },
      { sku: "38", size: 8 },
      { sku: "39", size: 9 },
    ],
    description: "Walk into the past.",
  },
];

export default function App() {
  const [size, setSize] = useState("");

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          <section id="products">{filteredProducts.map(renderProduct)}</section>
        </main>
      </div>
      <Footer />
    </>
  );
}
