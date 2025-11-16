
import { useState, useEffect } from "react";
import inventory from "../store/inventory";
import Image from "next/image";

// import { BsFillCartPlusFill } from "react-icons/bs";
// import { BsFillCartDashFill } from "react-icons/bs";
// import { BsCartXFill } from "react-icons/bs";

const CheckoutItem = (props) => {
  
  const [product, setProduct] = useState(null);
  

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/${props.id}`,
      );
      const productData = await response.json();
      setProduct(productData);
    };
    fetchProduct();
  }, [props.id]);

  

  const {
    addToInventory,
    removeFromInventory,
    getQuantity,
    inInventory,
    removeAllFromInventory,
  } = inventory();
  const quantity = getQuantity(props.id);

  if (!product) return <div>Loading...</div>;

  return <div>
    <p>{product.title}</p>
  </div>;
};

export default CheckoutItem;
