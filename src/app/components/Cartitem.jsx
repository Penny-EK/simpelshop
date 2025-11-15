import { useState, useEffect } from "react";
import Image from "next/image";
import inventory from "../store/inventory";
import Link from "next/link";

const CartItem = (props) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/${props.id}`,
      );
      const productData = await response.json();
      setProduct(productData);
    };
    fetchProduct();
  }, [props.id]);

  const { addToInventory, removeFromInventory, getQuantity, inInventory } =
    inventory();
  const quantity = getQuantity(props.id);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="grid h-[40vh] grid-cols-2 grid-rows-2 border border-0 border-t-1 border-[var(--foreground)] bg-[var(--background)]">
      <div className="col-span-2 col-start-1 row-span-0 row-start-1 flex flex-col justify-center px-4 py-4 pr-20">
        <Link href={`../product/${product.id}`}>
          {quantity > 1 ? <span className="text-3xl">{quantity}X </span> : ""}
          <h3 className="title z-10 text-2xl text-white underline mix-blend-difference">
            {product.title}
          </h3>
        </Link>
        <p className="special z-10 text-white mix-blend-difference">
          {quantity} in cart
        </p>
      </div>
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={2000}
        height={2000}
        loading="eager"
        className="col-start-2 row-span-2 row-start-1 h-full w-full object-contain py-4"
      ></Image>
      <div className="col-span-2 col-start-1 row-span-0 row-start-2"></div>
    </div>
  );
};

export default CartItem;
