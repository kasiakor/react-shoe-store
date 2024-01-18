import React, { useEffect, useReducer } from "react";
import cartReducer from "./cartReducer";

export const CartContext = React.createContext(null);

// will be called only one time when the app loads
let initialState;
try {
  initialState = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("Your cart could not be parsed into JSON");
  initialState = [];
}

// this component will provide the context
// & manage state and functions
// & be responsible for calling useReducer
export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  const contextValue = {
    cart,
    dispatch,
  };
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}
