"use client";
//Loads using client - This is suboptimal, but going insane from rewriting half the project for a school project
// would be even more suboptimal. At least the product browser is using server, and it'd probably be rare for you
// to have more than 30 unqiue items in your cart. AHHHHHHHHH

// import { useState, useEffect } from "react";
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

  return (
    <section>
      <h1 className="title w-full pb-[1rem] text-center text-6xl">Checkout</h1>
      <div className="">
        {inInventory.map((item, index) => (
          //   <p key={index}>{item.id}</p>

          <CheckoutItem key={index} id={item.id}></CheckoutItem>
        ))}
      </div>
    </section>
  );
}
