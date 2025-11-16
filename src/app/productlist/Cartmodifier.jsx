"use client";
// import { FaCartShopping } from "react-icons/fa6";

import { BsFillCartPlusFill } from "react-icons/bs";
import { BsFillCartDashFill } from "react-icons/bs";

//Deviating slightly from plan, font awesome 6 does not include a cart with a minus so I am using Bootstrap Icons

import inventory from "../store/inventory";
import { useEffect, useState } from "react";

// const CartModifier = (props) => {
//   const id = props.id;

//   const { toggleInInventory, inInventory } = inventory();

//   const handleClick = () => {
//     console.log("ID for cart modifier: " + id);
//     toggleInInventory(id);
//     console.log("Current inventory:", inInventory);
//   };

//   const exists = inInventory.includes(id);

//   //   const quantityButtonStyling =
//   //     "text-4xl text-[var(--foreground)] bg-[var(--background)] outline-1 outline-[var(--foreground)] h-2/3 aspect-square box-border mx-3";

//   const shoppingCartStyling = "text-3xl text-[var(--foreground)] mx-3";
//   return (
//     <>
//       <div
//         className="isolate ml-auto flex h-15 min-w-15 items-center justify-center bg-[var(--background)] outline-1 outline-[var(--foreground)]"
//         // onClick={handleClick}
//       >
//         <button onClick={handleClick}>
//           <BsFillCartPlusFill className={shoppingCartStyling} />
//         </button>
//         {exists && (
//           <>
//             <p className="text-2xl w-10 text-center text-[var(--foreground)]">1</p> {/*1 is placeholder for quantity*/}
//             <button onClick={handleClick}>
//               <BsFillCartDashFill className={shoppingCartStyling} />
//             </button>
//           </>
//         )}
//       </div>
//       {/* <p>{[inInventory]}</p> */} {/* Debug number */}
//     </>
//   );
// };

const CartModifier = (props) => {
  const id = props.id;
  const { addToInventory, removeFromInventory, getQuantity } = inventory();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const quantity = getQuantity(id);
  const exists = quantity > 0;

  const shoppingCartStyling = "text-3xl text-[var(--foreground)] mx-3 cursor-pointer";
  
  return (
    <div className="isolate ml-auto flex h-15 min-w-15 items-center justify-center bg-[var(--background)] outline-1 outline-[var(--foreground)]">
      <button onClick={() => addToInventory(id)}>
        <BsFillCartPlusFill className={shoppingCartStyling} />
      </button>
      
      {isClient && exists && (
        <>
          <p className="text-2xl w-10 text-center text-[var(--foreground)]">
            {quantity}
          </p>
          <button onClick={() => removeFromInventory(id)}>
            <BsFillCartDashFill className={shoppingCartStyling} />
          </button>
        </>
      )}
    </div>
  );
};

export default CartModifier;
