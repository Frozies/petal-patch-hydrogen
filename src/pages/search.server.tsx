import { useShopQuery, ProductProviderFragment, flattenConnection, Image, Money } from "@shopify/hydrogen";
import gql from 'graphql-tag';
import React from "react";
import Layout from "../components/Layout.server";
import BannerProductCardClient from "../components/BannerProductCard.client";
import ProductCardClient from "../components/ProductCardClient";
import MobileFilterMenuClient from "../components/Search/MobileFilterMenu.client";
import SearchPageHeaderClient from "../components/Search/SearchPageHeader.client";
import SearchFilterMenuClient from "../components/Search/SearchFilterMenu.client";


export default function Search({ country = {isoCode: 'US'}}: any) {

  const {data}: any = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      query: 'red',
    },
  });

  const products: any = data ? flattenConnection(data.products) : null;

  return (
    <Layout>
      <div>
        <div className="bg-white">
          <div>
            {/*
            Mobile filter dialog

            Off-canvas filters for mobile, show/hide based on off-canvas filters state.
          */}
            <div className="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
            <MobileFilterMenuClient/>
            </div>

            <main className=" mx-auto px-4 sm:px-6 lg:px-8">
              <SearchPageHeaderClient/>

              <section aria-labelledby="products-heading" className="pt-6 pb-24">
                <h2 id="products-heading" className="sr-only">Products</h2>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                  {/* Filters */}
                  <SearchFilterMenuClient/>

                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    {/* Replace with your content */}
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full">
                      <ProductCardClient featuredProducts={products}/>
                    </div>
                    {/* /End replace */}
                  </div>
                </div>

              </section>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
const QUERY = gql`
    fragment SearchProductDetails on Product {
        id
        title
        handle
        variants(first: 5) {
            edges {
                node {
                    availableForSale
                    image {
                        ...ImageFragment
                    }
                    priceV2 {
                        ...MoneyFragment
                    }
                    compareAtPriceV2 {
                        ...MoneyFragment
                    }
                }
            }
        }
    }
    query ProductSearch($query: String!) {
        products(query: $query, first: 20) {
            edges {
                node {
                    ...SearchProductDetails
                }
            }
        }
    }
    ${Image.Fragment}
    ${Money.Fragment}
`;