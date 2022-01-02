import {Money} from '@shopify/hydrogen/client';

export default function MoneyPrice({money}: any) {
  return (
    <Money className="text-black text-md" money={money}>
      {({amount, currencyNarrowSymbol, currencyCode}: any) => (
        <>
          {currencyCode}
          {currencyNarrowSymbol}
          {amount}
        </>
      )}
    </Money>
  );
}
