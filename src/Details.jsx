import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";

export default function Details() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`products/${id}`);

  if (loading) return <Spinner />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
