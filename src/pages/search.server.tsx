import { useShopQuery, flattenConnection, Image, Money } from "@shopify/hydrogen";
import gql from 'graphql-tag';
import React, { Suspense} from "react";
import Layout from "../components/Layout.server";
import SearchPageHeaderClient from "../components/Search/SearchPageHeader.client";
import SearchFilterMenuClient from "../components/Search/SearchFilterMenu.client";
import { requestProducts, searchResults } from "../utils/searchUtils";
import { ProductCardClient } from "../components/ProductCard.client";

export default function Search({ country = { isoCode: 'US' }, searchFilter }: any) {

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
            </div>

            <main className=" mx-auto px-4 sm:px-6 lg:px-8">
              <SearchPageHeaderClient />

              <section aria-labelledby="products-heading" className="pt-6 pb-24">
                <h2 id="products-heading" className="sr-only">Products</h2>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                  {/* Filters */}
                  <SearchFilterMenuClient searchFilter={searchFilter} />

                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    {/* Replace with your content */}
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full">

                      <Suspense fallback={<div>loading</div>}>
                        <ProductCardClient searchFilter={searchFilter}/>
                      </Suspense>


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

/*export function ProductCardServer( productData: any) {

  /!*return featuredProducts.then((products: any)=>{
    console.log(products)
    return (
      <div className={`grid gr
      id-cols-5 mb-8 gap-x-56 gap-y-16`}>
        {/!*!// @ts-ignore*!/}
        {/!*{newProducts.map((item: any)=>{
        console.log(item)
        return(
          <>
            {item.title}
          </>
        )
      })}*!/}
      </div>
    )
  })*!/
  // let items: any[] = []
  /!*featuredProducts.then((product: any) => {
    items = product
  })*!/
  console.table(productData)
  return (
    <div>PRODUCTS</div>
  )
}*/

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