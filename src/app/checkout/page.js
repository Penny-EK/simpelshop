"use client";
//Loads using client - This is suboptimal, but going insane from rewriting half the project for a school project
// would be even more suboptimal. At least the product browser is using server, and it'd probably be rare for you
// to have more than 30 unqiue items in your cart. AHHHHHHHHH

import { useState, useEffect } from "react";
// import Image from "next/image";
import inventory from "../store/inventory";
import CheckoutItem from "./CheckoutItem";

export default function Checkout() {
  //   const id = props.id;
  const {
    // addToInventory,
    // removeFromInventory,
    getQuantity,
    inInventory,
    clearInventory,
  } = inventory();

  console.log("Inventory contents in Checkout:", inInventory);

  const totalQuantity = inInventory.reduce(
    (total, item) => total + item.count,
    0,
  );

  const [totals, setTotals] = useState({});

  const updateTotal = (id, total) => {
    setTotals((prev) => ({ ...prev, [id]: total }));
  }; //Passed down as a prop to each CheckoutItem, so I may "fish" it up and update
  // the total sum of all the items in the cart

  const fullTotal = Object.values(totals)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
  console.log("Full total: " + fullTotal);

  return (
    <section className="h-[calc(100vh-var(--headerSpacer)-var(--titleHeight))]">
      <h1 className="title w-full text-center text-6xl pb-[1rem] h-[var(--titleHeight)] flex items-center justify-center">Checkout</h1>
      <div className="flex h-full border border-0 border-t-1 border-[var(--foreground)]">
        <div className="border border-[var(--foreground)] border-0 border-l-1 w-3/5 md:w-1/2 overflow-y-auto">
          {inInventory.map((item, index) => (
            //   <p key={index}>{item.id}</p>

            <CheckoutItem
              key={index}
              id={item.id}
              onTotal={updateTotal}
            ></CheckoutItem>
          ))}
        </div>
        <div className="border border-[var(--foreground)] border-t-0 flex-grow">
            <p>Total: {fullTotal}$</p>
        </div>
      </div>
    </section>
  );
}
