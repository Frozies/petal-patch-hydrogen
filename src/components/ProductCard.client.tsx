import {Image, Link} from '@shopify/hydrogen/client';
import React, { useEffect, useState } from "react";
import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';
import { requestProducts, searchResults } from "../utils/searchUtils";

export function ProductCardClient({searchFilter}: any){
  const [products, setProducts] = useState<searchResults[]>();

  //auto update products as searchFilter gets updated.
  useEffect(()=>{
    if (searchFilter!=undefined) {
      const getProducts = async ()=>{
        // @ts-ignore
        setProducts(await requestProducts(searchFilter.searchQuery, searchFilter.tags));
      }
      getProducts();
    }
    else {
      const getProducts = async ()=>{
        // @ts-ignore
        setProducts(await requestProducts('', ''));
      }
      getProducts();
    }
  },[searchFilter])

  /*todo: write why this was commented out*/
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
    if( products.length != 0) return products.map((item: searchResults)=>{
      if(item!=undefined) return <ProductCard product={item}/>
    })
    else return (<div>Sorry, we couldn't find any products like that...</div>)
  }
  else return (<div> LOADING... </div>)
}


/*########################################################*/





/**
 * A shared component that displays a single product to allow buyers to quickly identify a particular item of interest
 */
export default function ProductCard({product}: any) {

  if (product == null) {
    return null;
  }

  return (
      <div className="text-md mb-4 relative">
        <Link to={`/products/${product.handle}`}>
          <div className="rounded-lg border-2 border-gray-200 mb-2 relative flex items-center justify-center overflow-hidden object-cover h-96">
            {product.image ? (
                <Image
                    className="bg-white absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-center object-contain hover:scale-110"
                    data={product.image}
                />
            ) : null}
            {!product?.availableForSale && (
                <div className="absolute top-3 left-3 rounded-3xl text-xs bg-black text-white py-3 px-4">
                  Out of stock
                </div>
            )}
          </div>

          <span className="text-black font-semibold mb-0.5">{product.title}</span>

          {product.vendor && (
              <p className="text-gray-900 font-medium text-sm mb-0.5">
                {product.vendor}
              </p>
          )}

          <div className="flex ">
            {product.compareAtPriceV2 && (
                <MoneyCompareAtPrice money={product.compareAtPriceV2} />
            )}
            <MoneyPrice money={product.priceV2} />
          </div>
        </Link>
      </div>
  );
}