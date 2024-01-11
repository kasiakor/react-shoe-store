import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";

export default function Products() {
  const [size, setSize] = useState("");
  const { category } = useParams();

  const {
    data: products,
    error,
    loading,
  } = useFetch("products?category=" + category);

  // promise
  // useEffect(() => {
  //   getProducts("shoes")
  //     .then((response) => setProducts(response))
  //     .catch((e) => setError(e))
  //     .finally(() => setLoading(false));
  // }, []);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  // early returns
  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;
  if (error) throw error;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
      </section>
      {size && <h2>Found {filteredProducts.length} items</h2>}
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
}
