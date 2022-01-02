import {ShopifyServerProvider, DefaultRoutes} from '@shopify/hydrogen';
import {Switch} from 'react-router-dom';
import {Suspense} from 'react';

import shopifyConfig from '../shopify.config';

import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import CartProvider from './components/Cart/CartProvider.client';
import LoadingFallback from './components/LoadingFallback';

export default function App({...serverState}) {
  // @ts-ignore
  const pages = import.meta.globEager('./pages/**/*.server.[jt]sx');


  return (
    <Suspense fallback={<LoadingFallback />}>
      {/*@ts-ignore*/}
      <ShopifyServerProvider shopifyConfig={shopifyConfig} {...serverState}>
        {/*@ts-ignore*/}
        <CartProvider>
          <DefaultSeo />
          <Switch>
            <DefaultRoutes
              pages={pages}
              serverState={serverState}
              fallback={<NotFound />}
            />
          </Switch>
        </CartProvider>
      </ShopifyServerProvider>
    </Suspense>
  );
}
