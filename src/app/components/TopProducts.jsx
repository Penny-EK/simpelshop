import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "./Loading";
import ProductThumb from "../productlist/Productthumb";

const TopProducts = ({ category }) => {
  return (
    <Suspense
      fallback={
        <section className="flex h-[calc(100vh-var(--headerSpacer))] flex-col items-center justify-center px-7 pt-1">
          <Loading size={40} />
        </section>
      }
    >
      <section className="border-(--foreground)] bg-(--foreground)] grid grid-cols-2 border md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <FetchProduct category={category} />
      </section>
    </Suspense>
  );
};

const FetchProduct = async ({ category }) => {
  "use server";
  const url = category
    ? `https://dummyjson.com/products/category/${category}`
    : "https://dummyjson.com/products";

  const response = await fetch(url);
  const { products } = await response.json();
  return products
    .slice(0, 6)
    .map((product, index) => <ProductThumb product={product} key={index} />);
};

export default TopProducts;
