export default function cartReducer(cart, action) {
  switch (action.type) {
    case "empty":
      return [];
    case "add":
      const { id, sku } = action;
      const sameItem = cart.find((i) => i.sku === sku);
      if (sameItem) {
        // return new array with matching item replaced
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // return new array with appended new item
        return [...cart, { id: id, sku: sku, quantity: 1 }];
      }
    case "update": {
      const { quantity, sku } = action;
      if (quantity === 0) {
        return cart.filter((i) => i.sku !== sku);
      }
      return cart.map((i) =>
        i.sku === sku ? { ...i, quantity: quantity } : i
      );
    }

    default:
      throw new Error("Unhandled action type", action.type);
  }
}
