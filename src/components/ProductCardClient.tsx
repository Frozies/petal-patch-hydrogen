import {Image, Link} from '@shopify/hydrogen/client';
import React, { useEffect, useState } from "react";
import AnimateHeight from 'react-animate-height';
import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';
import { deviceSizes, getDevice, useWindowSize } from "./Hooks/useWindowSize";

export default function ProductCardClient ({ featuredProducts } : any) {
  if(featuredProducts!=undefined) return (
    <div className={`grid grid-cols-5 mb-8 gap-56`}>
      {featuredProducts.map((product: any) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

function ProductCard({product}: any) {
  const selectedVariant = product.variants.edges[0].node;

  if (selectedVariant == null) {
    return null;
  }

  /*TODO:
   * New item icon:
   * selectedVariant.publishedAt
   *
   * Discounted item icon:
   * selectedVariant.compareAtPriceV2
   *
   * Top Seller Icon:
   *
   * Show then hide product card for initial load in.
   * */
  return (
    <>
      <div
        className={`text-md mb-4 absolute items-center justify-center w-44 pb-10 rounded-md border-2 border-black`}
      >
        <Link
          to={`/products/${product.handle}`}
        >
          {/*IN STOCK*/}
          {selectedVariant.image ? (
            <Image
              className="
              bg-white
              absolute
              xs:h-32
              lg:h-56
              bg-center
              bg-cover
              object-center
              object-contain
              p-2"
              image={selectedVariant.image}
            />
          ) : null}

          {/*TITLE*/}
          <span className={`leading-4 text-black font-semibold mb-0.5 absolute w-full text-center`}>
            {product.title}
          </span>

          {/*PRICE*/}
          {selectedVariant?.availableForSale && (
            <div className={`flex  text-center`}>
              {selectedVariant.compareAtPriceV2 && (
                <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
              )}
              <MoneyPrice money={selectedVariant.priceV2} />
            </div>
          )}
          {/*OUT OF STOCK*/}
          {!selectedVariant?.availableForSale && (
            <div className={`text-black font-semibold mb-0.5 w-full text-center `}>
              Out of stock
            </div>
          )}
        </Link>
      </div>
    </>
  );
}
