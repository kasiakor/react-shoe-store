import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";

export default function Details() {
  const [sku, setSku] = useState("");
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`products/${id}`);
  const navigate = useNavigate();

  // early returns
  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What size?</option>
        {product.skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.size}
          </option>
        ))}
      </select>
      <p>
        <button
          disabled={!sku}
          className="btn btn-primary"
          onClick={() => navigate("/cart")}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
