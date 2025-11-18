const size = "50";
import FilterDropdown from "./Filterdropdown";

const FilterMenu = async (props) => {
  const response = await fetch("https://dummyjson.com/products/category-list");
  const fetchedCategories = await response.json();
  const categories = ["all-categories", ...fetchedCategories];
  //console.log("Categories: " + categories);

  return (
    <div
    //className="scrollbar-hide grid auto-cols-max grid-flow-col gap-3 overflow-x-auto overflow-y-hidden py-0.75 pr-7 pl-7"
    >
      <FilterDropdown categories={categories} currentCategory={props.currentCategory}></FilterDropdown>
    </div>
  );
};

export default FilterMenu;
