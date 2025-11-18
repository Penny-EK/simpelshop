
import Image from "next/image";
import Link from "next/link";
import CartModifier from "./Cartmodifier";
const ProductThumb = (props) => {
  const product = props.product;
  //console.log(product);
  return (
    <div
      // href={`../product/${product.id}`}
      className="pointer-cursor hoverInvert aspect-square border border-[var(--foreground)] bg-[var(--background)]"
    >
      <div className="grid w-fit">
        <div className="grid-inherit col-start-1 col-end-1 row-start-1 row-end-1 flex w-full flex-col justify-self-center">
          {/* <div className="ml-auto flex aspect-square w-15 items-center justify-center bg-[var(--background)] outline-1 outline-[var(--foreground)]">
            <FaCartShopping className="text-3xl text-[var(--foreground)]" />
          </div> */}
          <CartModifier
          id={product.id}
          />
        </div>
        <Link
          className="subgrid col-start-1 col-end-1 row-start-1 row-end-1 grid"
          href={`../product/${product.id}`}
        >
          <Image
            className="col-start-1 col-end-1 row-start-1 row-end-1 p-10"
            loading="eager"
            alt={product.brand ? product.brand : "Product Image"}
            src={product.thumbnail}
            width={1000}
            height={1000}
          />
          <div className="flex h-20 items-center px-2 outline-2 outline-[var(--foreground)]">
            <h3 className="special w-full text-center text-lg text-[var(--foreground)]">
              {product.title}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductThumb;
