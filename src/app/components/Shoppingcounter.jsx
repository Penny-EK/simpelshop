//WARNING: VERY UGLY COMPONENT. PLS FIX

import { FaCartShopping } from "react-icons/fa6";

export default function Shoppingcounter(props) {
  let appliedStyling = {
    bgcol: "var(--background)",
    text: "var(--foreground)",
  };
  if (props.count > 0) {
    appliedStyling = { bgcol: "var(--accent)", text: "var(--background)" };
  }

  return (
    <div
      className="flex items-center py-1 px-2 outline-[var(--foreground)]"
      style={{ backgroundColor: appliedStyling.bgcol }}
    >
      <FaCartShopping className={props.styling} color={appliedStyling.text} />
      {props.count > 0 && (
        <p className="special my-auto ml-1 h-fit pl-1.5 font-black text-[var(--background)] text-lg">
          {props.count}
        </p>
      )}
    </div>
  );
}
