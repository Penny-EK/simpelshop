import { Suspense } from "react";
import Image from "next/image";
const details = async () => {
  const response = await fetch(`https://dummyjson.com/products/1`);
  const product = await response.json();

  return (
    <Suspense>
      <div className="grid grid-cols-2">
        <Image
          src={product.images[0]}
          alt={product.title}
          width={200}
          height={200}
          loading="eager"
          className="flex items-center justify-center"
        />
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>{product.price},-</p>
          <p>{product.rating}★</p>
          <p>{product.brand}</p>
          <p>{product.availabilityStatus}</p>
          <p>{product.shippingInformation}</p>
          <p>{product.returnPolicy}</p>

          <button
            className="px-8 py-2 text-white"
            style={{ background: "var(--accent)" }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div>
        <h2>Reviews</h2>
        <div className="flex flex-wrap justify-between gap-4">
          {product.reviews.map((review, index) => (
            <div key={index}>
              <p>{review.reviewerName}</p>
              <p>{review.reviewerEmail}</p>
              <p>{review.rating}</p>
              <p>{review.comment}</p>
              <p>{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default details;
