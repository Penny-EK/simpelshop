import React from "react";
import { Suspense } from "react";

const CategoriesBanner = () => {
  return (
    <article className="my-4 flex h-16 w-full items-center justify-center overflow-hidden bg-(--dark)">
      <Suspense fallback={<div className="text-(--light)">Loading...</div>}>
        <FetchCategories />
      </Suspense>
    </article>
  );
};

const FetchCategories = async () => {
  const response = await fetch("https://dummyjson.com/products/categories");
  const categories = await response.json();

  const duplicatedCategories = [...categories, ...categories];

  return (
    <div className="relative w-full overflow-hidden">
      <ul className="category-scroll flex text-(--light)">
        {duplicatedCategories.map((category, index) => (
          <li
            key={`${category.slug}-${index}`}
            className="shrink-0 px-8 font-(family-name:--font-dm-mono) text-xl whitespace-nowrap text-(--light) uppercase"
          >
            {category.name || category.slug}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesBanner;
