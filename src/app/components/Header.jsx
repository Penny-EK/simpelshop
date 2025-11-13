import Image from "next/image";
import Link from "next/link";
import Shoppingcounter from "./Shoppingcounter";

export default function Header() {
  return (
    <header className="fixed z-100 flex h-[var(--headerHeight)] w-full items-center justify-between border-b-2 border-[var(--foreground)] bg-[var(--background)] px-4 px-7">
      <Link className="title text-2xl font-bold"
      href={"/"}
      >
        Simple<br></br>Shop
      </Link>
      <div className="flex items-center"></div>
      {/* <Shoppingcounter 
      count={12} 
      styling="text-3xl"
      /> */}
      {/*count={12} is a placeholder for the number of items in the cart*/}
      {/*Horrendously ugly shopping cart component. Uncomment when made prettier, I can't bear looking at it for now*/}
    </header>
  );
}
