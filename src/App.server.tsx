import {DefaultRoutes} from '@shopify/hydrogen';
import React, {Suspense} from 'react';

import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import AppClient from './App.client';
import LoadingFallback from './components/LoadingFallback';
import CartProvider from "./components/Cart/CartProvider.client";

export default function App({log, pages, ...serverState}: any) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AppClient helmetContext={serverState.helmetContext}>
        <CartProvider>
        <DefaultSeo />
          {/*@ts-ignore*/}
        <DefaultRoutes
          pages={pages}
          serverState={serverState}
          log={log}
          fallback={<NotFound />}
        />
        </CartProvider>
      </AppClient>
    </Suspense>
  );
}
