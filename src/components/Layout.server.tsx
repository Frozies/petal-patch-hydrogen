import {
  Image,
  useShopQuery,
  flattenConnection,
  LocalizationProvider,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Header from './Header.client';
import Footer from './Footer.client';
import Cart from './Cart/Cart.client';
import {Suspense} from 'react';

export default function Layout({children, hero, search}: any) {
  const {data}: any = useShopQuery({
    query: QUERY,
    variables: {
      numCollections: 3,
    },
    cache: {
      maxAge: 60,
      staleWhileRevalidate: 60 * 10,
    },
  });
  const collections: any = data ? flattenConnection(data.collections) : null;
  const products: any = data ? flattenConnection(data.products) : null;
  const storeName = data ? data.shop.name : '';

  return (
    <LocalizationProvider>
      <div className="min-h-screen max-w-screen text-gray-700 font-sans relative">

        {/*Header*/}
        <Suspense fallback={null}>
          <Header collections={collections} storeName={storeName} />
          <Cart />
        </Suspense>

        {/*Hero*/}
        <main role="main" id="mainContent" className="relative bg-gray-50">
          {hero}
          <div className="mx-auto max-w-7xl px-4 pt-4 pb-36 ">
            {children}
          </div>
        </main>

        {/*About us*/}
        <div className={"relative w-full h-full bg-white flex justify-center"}>
          <div className={"w-2/3 pt-12"}>
            <h1 className={"font-sansSerif text-2xl"}> {/*TODO Fix this font, its weird*/}
              We here at The Petal Patch are more than just a florist we are family. We love what we do here everyday
              and this is our happy place. Our arrangements are made with smiles and love. With more then 25 years of
              floral design let us design the perfect bouquet for you! Whether it be an anniversary, birthday, get well,
              event, holiday, thinking of you, new baby, new home, wedding or sympathy arrangement we got you covered!
              Our staff is polite, super talented and we always deliver with a smile.
            </h1>
          </div>
        </div>

        {/*Footer*/}
        <Footer collection={collections[0]} product={products[0]} />
      </div>
    </LocalizationProvider>
  );
}

const QUERY = gql`
  query indexContent($numCollections: Int!) {
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
            ...ImageFragment
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
  ${Image.Fragment}
`;
