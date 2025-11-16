import { Suspense } from "react";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa6";

const details = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await response.json();

  return (
    <Suspense>
      <div className="max-w-[1000px]">
        <div className="grid grid-cols-2">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={200}
            height={200}
            loading="eager"
            className="flex h-auto w-full items-center justify-center"
          />
          <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.price},-</p>
            <p>{product.rating}★</p>
            <p>{product.brand}</p>
            <p>{product.availabilityStatus}</p>
            <p>{product.shippingInformation}</p>

            <button
              className="px-8 py-2 text-(--light)"
              style={{ background: "var(--accent)" }}
            >
              Add to Cart
            </button>
            {/* mono font */}
            <p className="">{product.returnPolicy}</p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl">Reviews</h2>
          {/* mono */}
          <div className="flex flex-wrap justify-between gap-4">
            {product.reviews.map((review, index) => (
              <div key={index}>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaRegStar key={i} color="var(--dark)" size={24} />
                  ))}
                </div>

                <p className="text-[24px]">{review.comment}</p>
                <p className="text-[20px]">{review.reviewerName}</p>
                <p className="text-[20px]">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default details;
