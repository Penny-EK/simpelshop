import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    /*Placeholder page containing links - Could be used as a sandbox for testing components and styling as well*/
    <>
      <h1 className="title">Placeholder Page</h1>
      <Link href="/product" className="block underline">
        {">"} Product Singleview
      </Link>
      <Link href="/productlist" className="block underline">
        Product List
      </Link>
      <p className="special">{">"} Special Text. Lorem or something.</p>
    </>
    /*------------------------------------------------------------------------------------------------------*/
  );
}
