"use client";

import Link from "next/link";
import CartUi from "./Cartui";
import { useState } from "react";
import { BsCart } from "react-icons/bs";
import { BsCartXFill } from "react-icons/bs";
import inventory from "../store/inventory";

export default function Header() {
  const [showCartUI, setShowCartUI] = useState(false);
  const inInventory = inventory((state) => state.inInventory);

  // Calculate total quantity
  const totalQuantity = inInventory.reduce(
    (total, item) => total + item.count,
    0,
  );
  console.log("Inventory contents:", inInventory);
  console.log("Total quantity: " + totalQuantity);

  return (
    <>
      <header className="fixed z-100 w-full flex h-[var(--headerHeight)] items-center justify-between border-b-2 border-[var(--foreground)] bg-[var(--background)] px-4 px-7">
        <h1>
          <Link className="title text-2xl font-bold" href={"/"}>
            Simple<br></br>Webshop
          </Link>
        </h1>
        <div className="flex items-center">
          {showCartUI ? (
            <BsCartXFill
              className="mx-3 cursor-pointer text-3xl text-[var(--foreground)]"
              onClick={() => setShowCartUI(false)}
            ></BsCartXFill>
          ) : (
            <BsCart
              className="mx-3 cursor-pointer text-3xl text-[var(--foreground)]"
              onClick={() => setShowCartUI(true)}
            ></BsCart>
          )}
          {totalQuantity > 0 ? <p>{totalQuantity}</p> : ""}
        </div>
      </header>
      {showCartUI ? <CartUi></CartUi> : ""}
    </>
  );
}

