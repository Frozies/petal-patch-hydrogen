import {
  useShopQuery,
  flattenConnection,
  ProductProviderFragment,
  Image, LocalizationProvider,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import React, { Suspense, useEffect, useState } from "react";
import BannerProductCardClient from '../components/BannerProductCard.client';
import Welcome from '../components/Welcome.client';
import Header from "../components/Header.client";
import Cart from "../components/Cart/Cart.client";
import Footer from "../components/Footer.client";
import { getDevice, useWindowSize } from "../components/Hooks/useWindowSize";

export default function Index({ country = {isoCode: 'US'}}: any) {
  const {data}: any = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredProductsCollection: any = collections[0];
  const featuredProducts: any = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;
  const featuredCollection: any =
    collections && collections.length > 1 ? collections[1] : collections[0];
  const storeName = data ? data.shop.name : '';
  const products: any = data ? flattenConnection(data.products) : null;



  return (
        <LocalizationProvider>
          <div className="max-w-screen min-h-screen  text-gray-700 font-sans relative">

            {/*Header*/}
            <Suspense fallback={null}>
              <Header collections={collections} storeName={storeName} />
              <Cart />

            </Suspense>

            <main role="main" id="mainContent" className="relative bg-gray-50">
              <div className={"bg-hero-flowers w-full h-full bg-cover bg-center mx-auto absolute"}/>
              <div className="mx-auto max-w-7xl px-4 pt-4 pb-36 ">
                <div className={"relative mb-64 items-center justify-center align-middle"}>
                  <Welcome />
                  <Suspense fallback={<BoxFallback />}>

                    <BannerProductCardClient featuredProducts={featuredProducts}/>

                  </Suspense>
                </div>
              </div>
            </main>

            {/*About us*/}
            <div className={"relative w-full h-full bg-white flex justify-center"}>
              <div className={"w-2/3 pt-12"}>
                <h1 className={"font-roboto text-2xl"}> {/*TODO Fix this font, its weird*/}
                  We here at <p className={'inline font-bold'}>The Petal Patch</p> are more than just a
                  <p className={'inline font-bold'}> florist</p>, we are <p className={'inline font-bold'}>family</p>. We
                  <p className={'inline font-bold'}> love</p> what we do here everyday and this is our happy place. Our
                  arrangements are made with smiles and love. With more then <p className={'inline font-bold'}>25 years
                    of floral design </p> let us <p className={'inline font-bold'}>design</p> the perfect bouquet for
                  you! Whether it be an <p className={'inline font-bold'}>anniversary, birthday, get well, event,
                    holiday, thinking of you, new baby, new home, wedding or sympathy</p> arrangement we got you
                   covered! Our staff is polite, super talented and we always <p className={'inline font-bold'}>deliver
                    with a smile.</p>
                </h1>
              </div>
            </div>

            <div className={" w-full h-full bg-white flex justify-center"}>
              <div className={'w-2/3 h-full py-12'}>
                <Image
                    className="
                      h-[600px]
                      bg-white
                      bg-center
                      bg-cover
                      w-full
                      h-auto
                      object-center
                      object-contain
                      p-2"
                    width={864}
                    height={648}
                    src={'/bandit.jpg'}
                />
              </div>
            </div>


          </div>
            {/*Footer*/}
            <Footer collection={collections[0]} product={products[0]} />
        </LocalizationProvider>
  );
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}



const QUERY = gql`
  query indexContent(
    $country: CountryCode
    $numCollections: Int = 2
    $numProducts: Int = 10
    $includeReferenceMetafieldDetails: Boolean = false
    $numProductMetafields: Int = 0
    $numProductVariants: Int = 250
    $numProductMedia: Int = 1
    $numProductVariantMetafields: Int = 10
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $country) {
    collections(first: $numCollections) {
      edges {
        node {
          descriptionHtml
          description
          handle
          id
          title
          image {
            ...ImageFragment
          }
          products(first: $numProducts) {
            edges {
              node {
                ...ProductProviderFragment
              }
            }
          }
          
        }
      }
    }
    shop {
      name
    }
    products(first: 1) {
      edges {
        node {
          handle
        }
      }
    }
  }

  ${ProductProviderFragment}
  ${Image.Fragment}
`;
