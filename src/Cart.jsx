import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import useFetchAll from "./services/useFetchAll";

export default function Cart({ cart, dispatch }) {
  const navigate = useNavigate();
  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);
  console.log("products", products);

  function renderItem(itemInCart) {
    console.log("item in the cart", itemInCart);
    const { id, sku, quantity } = itemInCart;
    const { price, name, image, skus } = products.find(
      (p) => p.id === parseInt(id)
    );
    const { size } = skus.find((s) => s.sku === sku);

    return (
      <li key={sku} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            <select
              value={quantity}
              onChange={(e) =>
                dispatch({
                  type: "update",
                  sku,
                  quantity: parseInt(e.target.value),
                })
              }
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  // claculate number of items in cart

  const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  // early returns
  if (loading) return <Spinner />;
  if (error) throw error;
  return (
    <section id="cart">
      <h1>
        {itemsInCart === 0
          ? "My cart is empty"
          : `${itemsInCart} product${itemsInCart > 1 ? "s" : ""} in My Cart`}
      </h1>
      <ul>{cart.map(renderItem)}</ul>
      {cart.length > 0 && (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/checkout")}
        >
          Go to checkout
        </button>
      )}
    </section>
  );
}
