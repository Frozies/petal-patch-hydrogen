import {Money} from '@shopify/hydrogen/client';

export default function MoneyCompareAtPrice({money}: any) {
  return (
    <Money money={money}>
      {({amount, currencyNarrowSymbol}: any) => (
        <span className="text-black font-semibold mb-0.5 absolute w-full text-center">
          {currencyNarrowSymbol}
          {amount}
        </span>
      )}
    </Money>
  );
}
