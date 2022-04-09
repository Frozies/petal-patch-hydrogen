import {
  useShop,
  useShopQuery,
  LocalizationProvider,
  CacheHours,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Header from './Header.client';
import Footer from './Footer.server';
import Cart from './Cart.client';
import {Suspense} from 'react';

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export default function Layout({children}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      language: languageCode,
      numCollections: 3,
    },
    cache: CacheHours(),
    preload: '*',
  });
  /*const collections = data ? flattenConnection(data.collections) : null;
  const products = data ? flattenConnection(data.products) : null;*/

  const storeName = data ? data.shop.name : '';

  return (
    <LocalizationProvider preload="*">
      <div className="min-h-screen max-w-screen text-gray-700 font-sans">
        <Suspense fallback={null}>
          <Header storeName={storeName} />
          <Cart />
        </Suspense>

        <main role="main" id="mainContent" className="relative bg-gray-50">
          <div className="mx-auto max-w-7xl p-4 md:py-5 md:px-8">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </LocalizationProvider>
  );
}

const QUERY = gql`
  query layoutContent($language: LanguageCode, $numCollections: Int!)
  @inContext(language: $language) {
    shop {
      name
    }
    collections(first: $numCollections) {
      edges {
        node {
          description
          handle
          id
          title
          image {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
    products(first: 1) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
