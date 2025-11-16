import { Suspense } from "react";
import Image from "next/image";
import CategoriesBanner from "@/app/components/CategoriesBanner";

const details = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await response.json();

  return (
    <Suspense>
      <>
        <div className="mx-auto my-0 grid max-w-[1000px] grid-cols-2 gap-8 py-10">
          <div className="m-2 w-full border-2 border-solid">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={500}
              height={500}
              loading="eager"
              className="flex h-auto w-full items-center justify-center"
            />
          </div>
          <div>
            <p className="my-1.5 font-(family-name:--font-dm-mono) text-3xl">
              {product.brand}
            </p>
            <h1 className="my-2.5 text-4xl">{product.title}</h1>
            <p className="my-1.5 font-(family-name:--font-dm-mono) text-2xl">
              {product.price},-
            </p>
            <p className="my-1.5">{product.description}</p>
            <p className="my-4.5">{product.availabilityStatus}</p>

            <button className="hoverInvert border-2 border-(--background) bg-(--foreground) px-8 py-2 font-(family-name:--font-dm-mono) text-(--background) uppercase">
              Add to Cart
            </button>
            <div className="my-4">
              <h3 className="text-2xl"> Practical information</h3>
              <p className="my-1.5">{product.shippingInformation}</p>
              <p className="my-1.5">{product.returnPolicy}</p>
              <p className="my-1.5">{product.warrantyInformation}</p>
            </div>
          </div>
        </div>

        <div className="h-fit bg-(--foreground) py-10">
          <div className="mx-auto h-fit max-w-[1000px]">
            <div className="my-8">
              <h2 className="my-4 text-4xl text-(--background)">Reviews</h2>
              <p className="my-1.5 text-3xl text-(--background) uppercase">
                {product.rating}★ overall rating
              </p>
            </div>
            {/* mono */}
            <div className="special flex flex-wrap justify-between gap-4 text-(--background)">
              {product.reviews.map((review, index) => (
                <div key={index}>
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
        <CategoriesBanner />
      </>
    </Suspense>
  );
};

export default details;
