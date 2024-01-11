import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";

export default function Cart({ cart }) {
  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);
  console.log("products", products);

  function renderItem(itemInCart) {
    console.log("item in the cart", itemInCart);
    const { id, sku } = itemInCart;
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
