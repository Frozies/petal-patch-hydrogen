import {ShopifyServerProvider, DefaultRoutes} from '@shopify/hydrogen';
import {Switch} from 'react-router-dom';
import {Suspense} from 'react';

import shopifyConfig from '../shopify.config';

import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import CartProvider from './components/Cart/CartProvider.client';
import LoadingFallback from './components/LoadingFallback';

export default function App({log, pages, ...serverState}: any) {

  return (
    <Suspense fallback={<LoadingFallback />}>
      {/*@ts-ignore*/}
      <ShopifyServerProvider shopifyConfig={shopifyConfig} {...serverState}>

        <CartProvider>
          <DefaultSeo />
          <Switch>
            <DefaultRoutes
              pages={pages}
              serverState={serverState}
              fallback={<NotFound />}
              log={log}
            />
          </Switch>
        </CartProvider>
      </ShopifyServerProvider>
    </Suspense>
  );
}
