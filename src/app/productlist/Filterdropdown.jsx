"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FilterDropdown = ({ categories, ...props }) => {
  const [dropped, setDropped] = useState(false);
  const router = useRouter();

  const buttonWidth = "md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6";

  const currentCategory = props.currentCategory;

  console.log("Current category in FilterDropdown: " + currentCategory);

  return (
    <div className={`flex h-15 border border-[var(--foreground)]`}>
      <button
        className={`flex h-full cursor-pointer items-center justify-between px-3 font-bold capitalize outline ${buttonWidth} ${
          dropped
            ? "bg-[var(--foreground)] text-[var(--background)] outline-[var(--foreground)]"
            : "hoverInvert bg-[var(--background)] text-[var(--foreground)] outline-[var(--foreground)]"
        }`}
        onClick={() => setDropped(!dropped)}
      >
        FILTERS{" "}
        <span className={`ml-2 inline-block ${dropped ? "rotate-90" : ""}`}>
          {">"}
        </span>
      </button>
      {currentCategory && (
        <p className="mx-4 my-auto font-medium uppercase">
          Selected category:{" "}
          <span className="font-regular">{format(currentCategory)}</span>
        </p>
      )}
      {/* <div className="relative overflow-visible"> */}
      {dropped ? (
        <div
          className={`absolute z-50 mt-15 grid grid-cols-2 md:block ${buttonWidth}`}
        >
          {categories.map((category, index) => {
            return (
              <button
                key={index}
                className={`block special w-full cursor-pointer px-3 py-1.5 text-left outline lg:py-1 ${
                  category === currentCategory
                    ? // ? "bg-[var(--foreground)] text-[var(--background)] outline-[var(--background)]"
                      // : "hoverInvert bg-[var(--background)] text-[var(--foreground)] outline-[var(--foreground)]"
                      "bg-[var(--foreground)] text-[var(--background)] outline-[var(--foreground)]"
                    : "hoverInvert bg-[var(--background)] text-[var(--foreground)] outline-[var(--foreground)]"
                } `}
                onClick={() => {
                  router.push(
                    category === "all-categories"
                      ? "?"
                      : `?category=${category}`,
                  );
                }}
              >
                {format(category)}
              </button>
            );
          })}
        </div>
      ) : (
        ""
      )}
      {/* </div> */}
    </div>
  );
};

function format(input) {
  return input
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bMens\b/g, "Men's")
    .replace(/\bWomens\b/g, "Women's");
}

export default FilterDropdown;
