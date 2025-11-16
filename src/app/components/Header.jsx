"use client";

import Link from "next/link";
import CartUi from "./Cartui";
import { useState } from "react";
import { BsCart } from "react-icons/bs";
import { BsCartXFill } from "react-icons/bs";
import inventory from "../store/inventory";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  console.log("Pathname (From Header): " + pathname);

  return (
    <>
      <header className="fixed z-100 flex h-[var(--headerHeight)] w-full flex-col bg-[var(--background)]">
        <div className="flex w-full flex-grow items-center justify-between px-7">
          <Link className="title text-2xl font-bold" href={"/"}>
            Simple{/* <br></br> */} Webshop
          </Link>
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
        </div>
        <div className="flex">
          <Link
            href="/productlist"
            className={
              "title h-full w-1/2 flex-grow py-1 text-center font-bold border border-1" +
              (pathname === "/productlist"
                ? "hoverInvert border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                : "border-[var(--background)] bg-[var(--background)] text-[var(--foreground)]")
            }
          >
            Products
          </Link>

          <Link
            href="/checkout"
            className={
              "title hoverInvert h-full w-1/2 flex-grow py-1 text-center font-bold border border-1" +
              (pathname === "/checkout"
                ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                : "border-[var(--background)] bg-[var(--background)] text-[var(--foreground)]")
            }
          >
            Checkout
          </Link>
        </div>
      </header>
      {showCartUI ? <CartUi></CartUi> : ""}
    </>
  );
}
