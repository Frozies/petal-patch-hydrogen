import {HelmetProvider} from '@shopify/hydrogen/client';
// @ts-ignore
import CartProvider from './components/cart/CartProvider.client';
import React from "react";

/**
 *  Setup client context, though the children are most likely server components
 */
export default function ClientApp({helmetContext, children}: any) {
  return (
    <HelmetProvider context={helmetContext}>
      <CartProvider>{children}</CartProvider>
    </HelmetProvider>
  );
}
