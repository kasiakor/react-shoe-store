import Spinner from "./Spinner";
import useFetchAll from "./services/useFetchAll";

export default function Cart({ cart, updateQuantity, removeCartItem }) {
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
              onChange={(e) => {
                updateQuantity(sku, parseInt(e.target.value));
                removeCartItem();
              }}
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

  // early returns
  if (loading) return <Spinner />;
  if (error) throw error;
  return (
    <section id="cart">
      <h1>Cart</h1>
      <ul>{cart.map(renderItem)}</ul>
    </section>
  );
}
