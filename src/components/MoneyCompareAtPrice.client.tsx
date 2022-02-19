import {Money} from '@shopify/hydrogen/client';

export default function MoneyCompareAtPrice({money}: any) {
  return (
    <Money money={money} className="text-black font-semibold mb-0.5 w-full text-center line-through">
      {({amount, currencyNarrowSymbol}: any) => (
        <>
          {currencyNarrowSymbol}
          {amount}
        </>
      )}
    </Money>
  );
}
