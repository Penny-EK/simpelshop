"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import inventory from "@/app/store/inventory";

const Details = ({ params }) => {
  const [product, setProduct] = useState(null);

  const [id, setId] = useState(null);

  const [amount, setAmount] = useState(1);

  const { addToInventory } = inventory();

  useEffect(() => {
    const fetchProduct = async () => {
      const resolvedParams = await params;
      const productId = resolvedParams.id;
      setId(productId);

      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
      );
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [params]);

  const incrementAmount = () => {
    setAmount(amount + 1);
  };

  const decrementAmount = () => {
    setAmount(amount > 1 ? amount - 1 : 1);
  };


  const handleAddToCart = () => {
    if (id) {
      for (let i = 0; i < amount; i++) {
        addToInventory(id); 
      }
    }
  };

  
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mx-auto my-0 grid max-w-[1000px] grid-cols-1 gap-8 p-4 py-10 md:grid-cols-2">
        <div className="hoverInvert order-2 m-2 w-fit border bg-(--background) md:order-1">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={500}
            height={500}
            loading="eager"
            className="flex h-auto w-full items-center justify-center"
          />
        </div>
        <div className="order-1 md:order-2">
          <p className="my-1.5 font-(family-name:--font-dm-mono) text-3xl">
            {product.brand}
          </p>
          <h1 className="my-2.5 text-4xl">{product.title}</h1>
          <p className="my-1.5 font-(family-name:--font-dm-mono) text-2xl">
            {product.price},-
          </p>
          <p className="my-1.5">{product.description}</p>
          <p className="my-4.5">{product.availabilityStatus}</p>

          <div className="my-4 flex items-center gap-4">
            <div className="flex items-center">
              <button
                onClick={decrementAmount}
                className="special hoverInvert flex cursor-pointer items-center justify-center bg-(--background) p-2 text-(--foreground) outline outline-(--foreground)"
              >
                -1
              </button>
              <div className="border border-(--foreground) bg-(--background) px-8 py-2 font-(family-name:--font-dm-mono) text-(--foreground) uppercase">
                {amount}
              </div>
              <button
                onClick={incrementAmount}
                className="special hoverInvert flex cursor-pointer items-center justify-center bg-(--background) p-2 text-(--foreground) outline outline-(--foreground)"
              >
                +1
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="hoverInvert border border-(--background) bg-(--foreground) px-8 py-2 font-(family-name:--font-dm-mono) text-(--background) uppercase"
            >
              Add to Cart
            </button>
          </div>

          <div className="my-4">
            <h3 className="text-2xl"> Practical information</h3>
            <p className="my-1.5">{product.shippingInformation}</p>
            <p className="my-1.5">{product.returnPolicy}</p>
            <p className="my-1.5">{product.warrantyInformation}</p>
          </div>
        </div>
      </div>

      {/* reviews */}
      <div className="bg-(--foreground) py-10">
        <div className="mx-auto h-fit max-w-[1000px] p-4">
          <div className="my-8">
            <h2 className="my-4 text-4xl text-(--background)">Reviews</h2>
            <p className="my-1.5 text-3xl text-(--background) uppercase">
              {product.rating}★ overall rating
            </p>
          </div>
          <div className="special flex flex-wrap justify-between gap-4 text-(--background)">
            {product.reviews.map((review, index) => (
              <div key={index}>
                {/* stars */}
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <p key={i} className="text-3xl text-(--background)">
                      ★
                    </p>
                  ))}
                </div>
                <p className="text-[24px] text-(--background)">
                  {review.comment}
                </p>
                <p className="text-[20px] text-(--background)">
                  {review.reviewerName}
                </p>
                <p className="text-[20px] text-(--background)">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
