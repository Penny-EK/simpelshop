import { Suspense } from "react";
import Link from "next/link";
import Loading from "./Loading";

const TopCategories = () => {
  return (
    <Suspense
      fallback={
        <section className="flex h-[calc(100vh-var(--headerSpacer))] flex-col items-center justify-center px-7 pt-1">
          <Loading size={40} />
        </section>
      }
    >
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <FetchCategories />
      </section>
    </Suspense>
  );
};

const FetchCategories = async () => {
  "use server";
  const response = await fetch("https://dummyjson.com/products/categories");
  const categories = await response.json();

  return categories.slice(0, 4).map((category, index) => (
    <Link
      key={category.slug}
      href={`/productlist?category=${category.slug}`}
      className="special flex h-32 items-center justify-center bg-(--dark) p-4"
    >
      <h3 className="text-xl font-medium text-(--background) capitalize">
        {category.name || category.slug}
      </h3>
    </Link>
  ));
};

export default TopCategories;
