import {Money} from '@shopify/hydrogen/client';

export default function MoneyPrice({money}: any) {
  return (
    <Money className="text-black font-semibold mb-0.5 w-full text-center" data={money}>
      {({amount, currencyNarrowSymbol, currencyCode}: any) => (
        <>
          {currencyNarrowSymbol}
          {amount}
        </>
      )}
    </Money>
  );
}
