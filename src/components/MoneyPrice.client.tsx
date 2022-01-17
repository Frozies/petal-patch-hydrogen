import {Money} from '@shopify/hydrogen/client';

export default function MoneyPrice({money}: any) {
  return (
    <Money className="text-black font-semibold mb-0.5 absolute w-full text-center" money={money}>
      {({amount, currencyNarrowSymbol, currencyCode}: any) => (
        <>
          {currencyCode}&nbsp;
          {currencyNarrowSymbol}
          {amount}
        </>
      )}
    </Money>
  );
}
