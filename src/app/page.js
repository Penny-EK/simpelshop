import Image from "next/image";
import Link from "next/link";
import CategoriesBanner from "./components/CategoriesBanner";
import TopCategories from "./components/TopCategories";
import TopProducts from "./components/TopProducts";

export default function Home() {
  return (
    <>
      <h1 className="my-8 ml-2.5 text-5xl">Welcome to Simple Shop</h1>
      <CategoriesBanner />
      <Link
        href="/productlist"
        className="special hoverInvert flex h-32 items-center justify-center border bg-(--foreground) p-4"
      >
        <h3 className="text-xl font-medium text-(--background) uppercase">
          see all products
        </h3>
      </Link>

      <section className="py-10">
        <h2 className="my-4 ml-2.5 text-4xl uppercase">Featured Products</h2>
        <TopProducts />
      </section>
      <section>
        <h2 className="my-4 ml-2.5 text-4xl uppercase">Popular categories</h2>
        <TopCategories />
      </section>
    </>
  );
}
