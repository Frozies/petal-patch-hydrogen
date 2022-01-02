import {useCallback} from 'react';
import {CartProvider as ShopifyCartProvider} from '@shopify/hydrogen/client';

import CartUIProvider, {useCartUI} from './CartUIProvider.client';

export default function CartProvider({children, numCartLines}: any) {
  return (
    <CartUIProvider>
      <Provider numCartLines={numCartLines}>{children}</Provider>
    </CartUIProvider>
  );
}

function Provider({children, numCartLines}: any) {
  const {openCart}: any = useCartUI();

  const open = useCallback(() => {
    openCart();
  }, [openCart]);

  return (
    <>
      <ShopifyCartProvider
        numCartLines={numCartLines}
        onLineAdd={open}
        onCreate={open}
      >
        {children}
      </ShopifyCartProvider>
    </>
  );
}
