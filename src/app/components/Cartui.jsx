import inventory from "../store/inventory";
import CartItem from "./Cartitem";
import Link from "next/link";

const CartUi = (props) => {
  const id = props.id;
  const { addToInventory, removeFromInventory, getQuantity, inInventory } =
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
      <div className="my-2 flex items-center justify-center gap-4 mx-3">
        <p className="">You currently have {totalQuantity} items your cart.</p>
        <Link
          href={""}
          className="special hoverInvert bg-[var(--background)] py-1 px-2 text-[var(--foreground)] outline outline-[var(--foreground)]"
        >
          {"> "}Go to checkout
        </Link>
      </div>

      <div className="grid-auto-rows grid">
        {inInventory.map((item, index) => (
          //   <p key={index}>{item.id}</p>

          <CartItem
            key={index}
            id={item.id} //placeholder, need to fetch from API
          ></CartItem>
        ))}
      </div>
    </div>
  );
};

export default CartUi;
