"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import usePagesStore from "../store/pages";


const FilterDropdown = ({ categories, ...props }) => {
  const [page, setPage] = useState(1);
  const [dropped, setDropped] = useState(false);
  const router = useRouter();

  const buttonWidth = "md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6";

  const currentCategory = props.currentCategory;

  console.log("Current category in FilterDropdown: " + currentCategory);

  const fetchedCount = usePagesStore((state) => state.fetchedCount);
  const totalCount = usePagesStore((state) => state.totalCount);

  

  // const pageCount = Math.ceil(totalCount / fetchedCount); //this leads to an unresolved bug where the last page returns a page
  // count of double the actual page count - since there are only multiple pages if unfiltered, and we know the total count, i will
  // just hardcode it to 7 for now - nobody has to know!
  let pageCount = 1;
  if (totalCount > 30) pageCount = 7;
  const skip = (page - 1) * fetchedCount;

  console.log("Fetched count in FilterDropdown: " + fetchedCount);
  console.log("Total count in FilterDropdown: " + totalCount);

  return (
    <div className={`flex h-18 border border-[var(--foreground)]`}>
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
      {dropped ? (
        <div
          className={`absolute z-50 mt-18 grid grid-cols-2 md:block ${buttonWidth}`}
        >
          {categories.map((category, index) => {
            return (
              <button
                key={index}
                className={`special block w-full cursor-pointer px-3 py-1.5 text-left outline lg:py-1 ${
                  category === currentCategory ||
                  (category === "all-categories" &&
                    currentCategory === undefined)
                    ? // ? "bg-[var(--foreground)] text-[var(--background)] outline-[var(--background)]"
                      // : "hoverInvert bg-[var(--background)] text-[var(--foreground)] outline-[var(--foreground)]"
                      "bg-[var(--foreground)] text-[var(--background)] outline-[var(--foreground)]"
                    : "hoverInvert bg-[var(--background)] text-[var(--foreground)] outline-[var(--foreground)]"
                } `}
                onClick={() => {
                  setPage(1);
                  router.push(
                    category === "all-categories"
                      ? "?"
                      : `?category=${category}`,
                  );
                  setDropped(false);
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
      <div className="grid w-full md:flex">
        {currentCategory && (
          <p className="my-auto mr-2 w-fit pl-2 font-medium uppercase">
            Selected category:{" "}
            <span className="font-regular">{format(currentCategory)}</span>
          </p>
        )}
        <div className="ml-auto grid h-full w-full grid-cols-3 items-center justify-center bg-[var(--background)] outline-1 outline-[var(--foreground)] md:w-50">
          <button
            className={`h-full text-[var(--foreground)] outline outline-[var(--foreground)] ${
              page === 1
                ? "cursor-default text-[var(--grey)]"
                : "hoverInvert cursor-pointer bg-[var(--background)]"
            }`}
            onClick={
              page === 1
                ? undefined
                : () => {
                    const newPage = page - 1;
                    setPage(newPage);
                    const separator = currentCategory ? "&" : "?";
                    const url = currentCategory
                      ? `?category=${currentCategory}${separator}skip=${(newPage - 1) * fetchedCount}`
                      : `?skip=${(newPage - 1) * fetchedCount}`;
                    router.push(url);
                  }
            }
          >
            {"<"}
          </button>

          <p className="px-2 text-center">
            {page}/{pageCount}
          </p>

          {/* Next Page Button */}
          <button
            className={`h-full text-[var(--foreground)] outline outline-[var(--foreground)] ${
              page >= pageCount
                ? "cursor-default text-[var(--grey)]"
                : "hoverInvert cursor-pointer bg-[var(--background)]"
            }`}
            onClick={
              page >= pageCount
                ? undefined
                : () => {
                    const newPage = page + 1;
                    setPage(newPage);
                    const separator = currentCategory ? "&" : "?";
                    const url = currentCategory
                      ? `?category=${currentCategory}${separator}skip=${(newPage - 1) * fetchedCount}`
                      : `?skip=${(newPage - 1) * fetchedCount}`;
                    router.push(url);
                  }
            }
          >
            {">"}
          </button>
        </div>
        {/* <div className="relative overflow-visible"> */}

        {/* </div> */}
      </div>
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
