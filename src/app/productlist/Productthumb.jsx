"use client;"; //So we may use useState, if needed

import { FaCartShopping } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
const ProductThumb = (props) => {
  const product = props.product;
  console.log(product);
  return (
    <Link
      href={`../product/${product.id}`}
      className="pointer-cursor aspect-square bg-[var(--background)] border border-[var(--foreground)] hoverInvert"
    >
      <div className="grid w-fit">
        <div className="grid-inherit z-10 col-start-1 col-end-1 row-start-1 row-end-1 flex w-full flex-col justify-self-center">
          <button className="ml-auto flex aspect-square w-15 items-center justify-center bg-[var(--background)] 
          outline-1 outline-[var(--foreground)] pointer-cursor">
            {/*IMPORTANT TODO: Stop link from cascading down to button*/}
            <FaCartShopping className="text-3xl text-[var(--foreground)]" />
          </button>
        </div>
        <div className="flex h-20 items-center px-2 outline-2 outline-[var(--foreground)]">
          <h3 className="special w-full text-center text-lg">{product.title}</h3>
        </div>
        <Image
          className="col-start-1 col-end-1 row-start-1 row-end-1 p-10"
          loading="eager"
          alt={product.brand ? product.brand : "Product Image"}
          src={product.thumbnail}
          width={1000}
          height={1000}
        />
      </div>
    </Link>
  );
};

export default ProductThumb;
