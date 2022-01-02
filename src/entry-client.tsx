import renderHydrogen from '@shopify/hydrogen/entry-client';
import {ShopifyProvider} from '@shopify/hydrogen/client';

import shopifyConfig from '../shopify.config';

function ClientApp({children}: any) {
  return (
    <ShopifyProvider shopifyConfig={shopifyConfig}>{children}</ShopifyProvider>
  );
}

export default renderHydrogen(ClientApp);
