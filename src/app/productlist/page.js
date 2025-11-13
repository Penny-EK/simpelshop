import ProductList from "./Productlist";

export default function Home({ searchParams }) {
  return (
    <>
      <p className="px-7 pb-2 special">All products:</p> {/* Placeholder text */}
      <ProductListContainer searchParams={searchParams} />
    </>
  );
}

async function ProductListContainer({ searchParams }) {
  const { category } = await searchParams;
  console.log("Category: " + category);
  return <ProductList category={category} />;
}
