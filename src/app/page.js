import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    /*Placeholder page containing links - Could be used as a sandbox for testing components and styling as well*/
    <div>
      <div className="px-7">
        <h1 className="title">Placeholder Page</h1>
        <Link href="/product" className="block text-blue-500 underline">
          {">"} Product Singleview
        </Link>
        <Link href="/productlist" className="block text-blue-500 underline">
          {">"} Product List
        </Link>
        <Link href="/checkout" className="block text-blue-500 underline">
          {">"} Checkout
        </Link>
        <p className="special"> Special Text. Lorem or something.</p>
      </div>
      <div className="h-[120vh]">
        {/*Tall div to test scrollability of header*/}
      </div>
    </div>

    /*------------------------------------------------------------------------------------------------------*/
  );
}
