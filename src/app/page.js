import Image from "next/image";
import Link from "next/link";
import CategoriesBanner from "./components/CategoriesBanner";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-5xl">Welcome to Simple Shop</h1>
      <CategoriesBanner />
      <Link href="/productlist" className="uppercase">
        See our catelog
      </Link>
    </div>
  );
}
