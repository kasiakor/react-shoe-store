import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";
// add enum pattern as form state
const STATUS = {
  IDLE: "IDLE",
  SUBMITTING: "SUBMITTING",
  SUBMITTED: "SUBMITTED",
  COMPLETED: "COMPLETED",
};

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

export default function Checkout({ cart, emptyCart }) {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [address, setAddress] = useState(emptyAddress);
  const [saveError, setSaveError] = useState(null);

  function handleChange(e) {
    setAddress((current) => {
      return { ...current, [e.target.id]: e.target.value };
    });
    console.log(e.target.value);
  }

  function handleBlur(event) {
    // TODO
  }

  async function handleSubmit(event) {
    // handle client validation
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);

    try {
      await saveShippingAddress(address);
      emptyCart();
      console.log("my cart", cart);
      setStatus(STATUS.COMPLETED);
    } catch (e) {
      setSaveError(e);
    }
    console.log("status", status);
    console.log("address", address);
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) {
    return <h1>Thank you for shopping!</h1>;
  }

  return (
    <>
      <h1>Shipping Info</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
