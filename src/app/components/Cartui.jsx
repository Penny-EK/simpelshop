import inventory from "../store/inventory";
import CartItem from "./Cartitem";
import Link from "next/link";
// import { BsCartXFill } from "react-icons/bs";

const CartUi = (props) => {
  const id = props.id;
  const { addToInventory, removeFromInventory, getQuantity, inInventory, clearInventory} =
    inventory();

  console.log("Inventory contents:", inInventory);

  const totalQuantity = inInventory.reduce(
    (total, item) => total + item.count,
    0,
  );

  return (
    <div className="fixed right-0 z-100 mt-[var(--headerHeight)] h-[calc(100vh-var(--headerHeight))] w-2/3 overflow-y-auto border border-t-0 border-[var(--foreground)] bg-[var(--background)] sm:w-1/2 lg:w-1/3">
      <h2 className="title my-4 w-full text-center text-3xl text-[var(--foreground)]">
        Your cart
      </h2>
      <div className="flex flex-col items-center justify-center gap-2">
        {totalQuantity === 0 ? (
          <p className="mx-3">You currently have no items in your cart.</p>
        ) : (
          <>
            <p className="mx-3">
              You currently have {totalQuantity}{" "}
              {totalQuantity === 1 ? "item" : "items"} in your cart.
            </p>
            <div className="grid grid-cols-2 w-full min-h-10">
              <Link
                href={""}
                className="special hoverInvert bg-[var(--background)] px-2 py-1 text-[var(--foreground)] outline outline-[var(--foreground)] flex items-center justify-center cursor-pointer"
              >
                <span className="block pr-2">{"> "}</span>Go to checkout
              </Link>
              <button className="special hoverInvert bg-[var(--background)] px-2 py-1 text-[var(--foreground)] outline outline-[var(--foreground)] flex items-center justify-center cursor-pointer"
              onClick={ () => {
                inInventory.forEach((item) => {
                  clearInventory();
                });
              }}
              >
                <span className="block pr-2">X </span>Clear cart
              </button>
            </div>
          </>
        )}
      </div>

      <div className="grid-auto-rows grid">
        {inInventory.map((item, index) => (
          //   <p key={index}>{item.id}</p>

          <CartItem key={index} id={item.id}></CartItem>
        ))}
      </div>
    </div>
  );
};

export default CartUi;
