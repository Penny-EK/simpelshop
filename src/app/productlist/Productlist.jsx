import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "../components/Loading";
import ProductThumb from "./Productthumb";

const ProductList = ({ category }) => {
  return (
    // <Suspense fallback={{/* <div>Loading products...</div> */ /*Insert loading component*/}}>
    //   <FetchProduct category={category} />
    // </Suspense>
    <Suspense
      fallback={
        <section className="flex h-[calc(100vh-var(--headerSpacer))] flex-col items-center justify-center px-7 pt-1">
          <Loading size={40} />
        </section>
      }
    >
      <section className="grid grid-cols-2 border border-[var(--foreground)] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
  return products.map((product, index) => (
    <ProductThumb product={product} key={index} />
  ));
};

export default ProductList;
