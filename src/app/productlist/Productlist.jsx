// import { Suspense } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import Loading from "../components/Loading";
// import ProductThumb from "./Productthumb";
// import { usePagesStore } from "../store/pages";

// const ProductList = ({ category }) => {
//   return (
//     // <Suspense fallback={{/* <div>Loading products...</div> */ /*Insert loading component*/}}>
//     //   <FetchProduct category={category} />
//     // </Suspense>
//     <Suspense
//       fallback={
//         <section className="flex h-[calc(100vh-var(--headerSpacer))] flex-col items-center justify-center px-7 pt-1">
//           <Loading size={40} />
//         </section>
//       }
//     >
//       <section className="grid grid-cols-2 border border-[var(--foreground)] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
//         <FetchProduct category={category} />
//       </section>
//     </Suspense>
//   );
// };

// const FetchProduct = async ({ category }) => {
//   "use server";
//   const url = category
//     ? `https://dummyjson.com/products/category/${category}`
//     : "https://dummyjson.com/products";

//   const response = await fetch(url);
//   const { products } = await response.json();
//   setProducts(products);
//   return products.map((product, index) => (
//     <ProductThumb product={product} key={index} />
//   ));
// };

// export default ProductList;

// "use client";

// import { useEffect, useState } from "react";
// import Loading from "../components/Loading";
// import ProductThumb from "./Productthumb";
// import usePagesStore from "../store/pages";

// const ProductList = ({ category }) => {
//   const [products, setProductsLocal] = useState([]); // local only, for rendering

//   const setFetchedCount = usePagesStore((state) => state.setFetchedCount);
//   const setTotalCount = usePagesStore((state) => state.setTotalCount);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const url = category
//         ? `https://dummyjson.com/products/category/${category}`
//         : "https://dummyjson.com/products";

//       const response = await fetch(url);
//       const data = await response.json();

//       console.log("url: " + url);

//       setProductsLocal(data.products); // local array only
//       setFetchedCount(data.products.length); // export length to Zustand
//       setTotalCount(data.total); // export total to Zustand
//     };

//     fetchProducts();
//   }, [category, skip, setFetchedCount, setTotalCount]);

//   return (
//     <section className="grid grid-cols-2 border border-[var(--foreground)] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
//       {products.map((product) => (
//         <ProductThumb product={product} key={product.id} />
//       ))}
//     </section>
//   );
// };

// export default ProductList;

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "../components/Loading";
import ProductThumb from "./Productthumb";
import usePagesStore from "../store/pages";

const ProductList = ({ category: propCategory }) => {
  const [products, setProductsLocal] = useState([]); // local array for rendering

  const setFetchedCount = usePagesStore((state) => state.setFetchedCount);
  const setTotalCount = usePagesStore((state) => state.setTotalCount);

  // read query params from URL
  const searchParams = useSearchParams();
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const category = searchParams.get("category") || propCategory;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `https://dummyjson.com/products/category/${category}?skip=${skip}`
          : `https://dummyjson.com/products?skip=${skip}`;

        const response = await fetch(url);
        const data = await response.json();

        console.log("Fetching URL:", url);

        setProductsLocal(data.products); // render locally
        setFetchedCount(data.products.length); // update Zustand
        setTotalCount(data.total); // update Zustand
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [category, skip, setFetchedCount, setTotalCount]);

  // optional: show loading if empty
  if (!products.length) {
    return (
      <section className="flex h-[calc(100vh-var(--headerSpacer))] items-center justify-center">
        <Loading size={40} />
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 border border-[var(--foreground)] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {products.map((product) => (
        <ProductThumb product={product} key={product.id} />
      ))}
    </section>
  );
};

export default ProductList;
