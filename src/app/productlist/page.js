import ProductList from "./Productlist";
import FilterMenu from "./Filtermenu";

export default function Home({ searchParams }) {
  return (
    <>
      <ProductListContainer searchParams={searchParams} />
    </>
  );
}

async function ProductListContainer({ searchParams }) {
  const { category } = await searchParams;
  console.log("Category: " + category);
  return (
    <>
      <h1 className="title w-full text-center text-6xl pb-[1rem] h-[var(--titleHeight)] flex items-center justify-center">Shop</h1>
      <FilterMenu className="z-50"
      currentCategory={category}
      ></FilterMenu>
      <ProductList category={category}></ProductList>
    </>
  );
}
