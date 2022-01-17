import {Image, Link} from '@shopify/hydrogen';
import {useState} from 'react';
import AnimateHeight from 'react-animate-height';
import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';

export default function ProductCardClient({product}: any) {
  const selectedVariant = product.variants.edges[0].node;

  const [height, setHeight] = useState({height: 272, isOpen: true} );


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
  * */

  return (
    <div className="text-md mb-4 absolute items-center justify-center w-56 pb-10">
      <Link
        to={`/products/${product.handle}`}
        onMouseEnter={() => {
          setHeight( {height: 272, isOpen: true});
        }}
        onMouseLeave={() => {
          setHeight( {height: 224, isOpen: false});
        }}
      >
        <AnimateHeight
            height={height.height}
            className="rounded-lg border border-b bg-white mb-2 relative object-cover w-auto">

          {/*IN STOCK*/}
            {selectedVariant.image ? (
                  <Image
                      className="
              bg-white
              absolute
              h-56
              bg-center
              bg-cover
              object-center
              object-contain
              pb-2"
                      image={selectedVariant.image}
                  />
            ) : null}

          {/*TITLE*/}
          <span className="text-black font-semibold mb-0.5 absolute w-full text-center translate-y-56">{product.title}</span>

          {/*PRICE*/}
          {selectedVariant?.availableForSale && (
            <div className="flex translate-y-61 text-center">
              {selectedVariant.compareAtPriceV2 && (
                <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
              )}
              <MoneyPrice money={selectedVariant.priceV2} />
            </div>
          )}
            {/*OUT OF STOCK*/}
            {!selectedVariant?.availableForSale && (
              <div className="text-black font-semibold mb-0.5 w-full text-center translate-y-61">
                Out of stock
              </div>
            )}
        </AnimateHeight>
      </Link>
    </div>
  );
}
