import {Image, Link} from '@shopify/hydrogen';

import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';

export default function ProductCard({product}: any) {
  const selectedVariant = product.variants.edges[0].node;

  if (selectedVariant == null) {
    return null;
  }

  return (
    <div className="text-md mb-4 relative">
      <Link to={`/products/${product.handle}`}>
        <div className="rounded-lg border-2 border-gray-200 mb-2 relative flex items-center justify-center overflow-hidden object-cover h-56 w-56">
          {/*IN STOCK*/}
          {selectedVariant.image ? (
            <Image
              className="
              bg-white
              absolute
              w-full
              h-full
              transition-all
              duration-500
              ease-in-out
              transform
              bg-center
              bg-cover
              object-center
              object-contain
              hover:scale-110"
              image={selectedVariant.image}
            />
          ) : null}

          {/*OUT OF STOCK*/}
          {!selectedVariant?.availableForSale && (
            <div className="absolute top-3 left-3 rounded-3xl text-xs bg-black text-white py-3 px-4">
              Out of stock
            </div>
          )}

        </div>

        {/*TITLE*/}
        <span className="text-black font-semibold mb-0.5">{product.title}</span>

        {/*PRICE*/}
        <div className="flex ">
          {selectedVariant.compareAtPriceV2 && (
            <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
          )}
          <MoneyPrice money={selectedVariant.priceV2} />
        </div>
      </Link>
    </div>
  );
}
