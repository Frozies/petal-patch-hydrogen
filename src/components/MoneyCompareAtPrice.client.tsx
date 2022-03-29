import {useMoney} from '@shopify/hydrogen/client';

/**
 * A client component that renders a product's compare at price
 */
export default function MoneyCompareAtPrice({money}: any) {
  const {amount, currencyNarrowSymbol} = useMoney(money);
  return (
      <span className="text-black font-semibold mb-0.5 w-full text-center line-through">
      {currencyNarrowSymbol}
        {amount}
    </span>
  );
}
