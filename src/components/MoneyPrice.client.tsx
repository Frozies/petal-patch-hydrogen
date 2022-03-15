import {useMoney} from '@shopify/hydrogen/client';

/**
 * A client component that defines the currency code, currency symbol, and amount of a product
 */
export default function MoneyPrice({money}: any) {
  const {currencyNarrowSymbol, amount} = useMoney(money);
  return (
      <span className="text-black font-semibold mb-0.5 w-full text-center">
        {currencyNarrowSymbol}
        {amount}
    </span>
  );
}
