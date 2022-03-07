import {Image, Link} from '@shopify/hydrogen/client';
import React, { useEffect, useState } from "react";
import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';
import { requestProducts, searchResults } from "../utils/searchUtils";

export function ProductCardClient({searchFilter}: any){
  const [products, setProducts] = useState<searchResults[]>();

  useEffect(()=>{
    const getProducts = async ()=>{
      // @ts-ignore
      setProducts(await requestProducts("", searchFilter));
    }
    getProducts();
  },[searchFilter])

  /* const product = () => {
     let productsArray: searchResults[] = [];

     if (products != null) {
       return products.then((items: any)=>{
         console.log(items)
         return <div>YES</div>
       })
     }

     return products;

   };*/

  if (products!= undefined) {
    return products.map((item: searchResults)=>{
      return ProductCard(item)
    })
  }
}

export function ProductCard(product: searchResults) {

  /*const selectedVariant = product.variants.edges[0].node;

  if (selectedVariant == null) {
    return null;
  }*/

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
        className={`text-md relative items-center justify-center text-center w-44 pb-4 rounded-md border-2 border-black`}
      >
        <Link
          to={`/products/${product.handle}`}
        >
          {/*IN STOCK*/}
          {/*{selectedVariant.image ? (
            <Image
              className="
              bg-white
              xs:h-32
              lg:h-56
              bg-center
              bg-cover
              object-center
              object-contain
              p-2"
              image={selectedVariant.image}
            />
          ) : null}*/}

          {/*TITLE*/}
          <span className={`leading-4 text-black font-semibold mb-0.5 relative w-full text-center`}>
            {product.title}
          </span>

          {/*PRICE*/}
          {/*{selectedVariant?.availableForSale && (
            <div className={`flex text-center`}>
              {selectedVariant.compareAtPriceV2 && (
                <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
              )}
              <MoneyPrice money={selectedVariant.priceV2} />
            </div>
          )}*/}

          {/*OUT OF STOCK*/}
          {/*{!selectedVariant?.availableForSale && (
            <div className={`text-black font-semibold mb-0.5 w-full text-center `}>
              Out of stock
            </div>
          )}*/}
        </Link>
      </div>
    </>
  );
}
