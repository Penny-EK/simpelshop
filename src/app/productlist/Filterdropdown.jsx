"use client";
import { useState } from "react";

const FilterDropdown = ({ categories }) => {
  const [dropped, setDropped] = useState(false);

  const buttonWidth = " w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6";
  return (
    <div className="h-10 border border-[var(--foreground)]">
      <button
        className={`flex h-full cursor-pointer items-center justify-between px-3 font-bold capitalize outline ${buttonWidth} ${
          dropped
            ? "bg-[var(--foreground)] text-[var(--background)] outline-[var(--foreground)]"
            : "hoverInvert bg-[var(--background)] text-[var(--foreground)] outline-[var(--foreground)]"
        }`}
        onClick={() => setDropped(!dropped)}
      >
        FILTERS{" "}
        <span
          className={`inline-block ${dropped ? "rotate-90" : ""}`}
        >
          {">"}
        </span>
      </button>
      {/* <div className="relative overflow-visible"> */}
      {dropped ? (
        <div className={`absolute z-50 bg-[var(--background)] ${buttonWidth}`}>
          {categories.map((category, index) => {
            const formattedCategory = category
              .replaceAll("-", " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())
              .replace(/\bMens\b/g, "Men's")
              .replace(/\bWomens\b/g, "Women's");

            return (
              <button
                key={index}
                className="hoverInvert block w-full cursor-pointer bg-[var(--background)] px-3 py-1 text-left outline outline-[var(--foreground)]"
              >
                <p className="special">{formattedCategory}</p>
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

export default FilterDropdown;
