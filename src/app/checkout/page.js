"use client";
//Loads using client - This is suboptimal, but going insane from rewriting half the project for a school project
// would be even more suboptimal. AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHSHAO)SHIOASUHIASUHIASHIASHIDWHIULFEHIULFCEWUHIURLTFEWH

import { useState, useEffect } from "react";
// import Image from "next/image";
import inventory from "../store/inventory";
import CheckoutItem from "./CheckoutItem";
import Link from "next/link";

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

  return totalQuantity === 0 ? (
    <section className="flex h-[calc(100vh-var(--headerSpacer))] flex-col items-center">
      <div className="my-auto px-7 pb-[var(--headerSpacer)]">
        <h1 className="title mb-10 text-4xl">
          You currently have no items in your cart.
        </h1>
        <Link href="/productlist" className="text-2xl underline">
          {">"} Proceed to product list
        </Link>
      </div>
    </section>
  ) : (
    <section className="h-[calc(100vh-var(--headerSpacer)-var(--titleHeight))]">
      <h1 className="title flex h-[var(--titleHeight)] w-full items-center justify-center pb-[1rem] text-center text-6xl">
        Checkout
      </h1>
      <div className="flex h-full flex-col-reverse border border-0 border-t-1 border-[var(--foreground)] md:flex-row">
        <div className="order-2 flex basis-2/6 flex-col items-center border border-t-0 border-[var(--foreground)] md:order-2 md:basis-2/5">
          <p className="title w-full border-b-1 border-[var(--foreground)] py-5 text-center text-3xl">
            Total: {fullTotal}$
          </p>

          <button className="my-auto">
            {">  "}
            <span className="underline">Add payment method</span>
          </button>
          <div className="grid min-h-10 w-full grid-cols-2">
            <Link
              href={""}
              className="special hoverInvert flex cursor-pointer items-center justify-center bg-[var(--background)] px-2 py-1 text-[var(--foreground)] outline outline-[var(--foreground)]"
            >
              <span className="block pr-2">{"> "}</span>Proceed to payment
            </Link>
            <button
              className="special hoverInvert flex cursor-pointer items-center justify-center bg-[var(--background)] px-2 py-1 text-[var(--foreground)] outline outline-[var(--foreground)]"
              onClick={() => {
                inInventory.forEach((item) => {
                  clearInventory();
                });
              }}
            >
              <span className="block pr-2">X </span>Clear cart
            </button>
          </div>
        </div>
        <div className="order-1 flex basis-4/6 flex-col-reverse overflow-y-auto border border-t-0 border-[var(--foreground)] md:order-1 md:basis-3/5">
          {inInventory.map((item, index) => (
            //   <p key={index}>{item.id}</p>

            <CheckoutItem
              key={index}
              id={item.id}
              onTotal={updateTotal}
            ></CheckoutItem>
          ))}
        </div>
      </div>
    </section>
  );
}
