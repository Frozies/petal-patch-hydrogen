import gql from 'graphql-tag';
import React from 'react';
import { Money, Image, flattenConnection, graphqlRequestBody } from "@shopify/hydrogen";
import { GraphQLConnection } from "@shopify/hydrogen/dist/esnext/types";

//todo: Get this dynamically
const storeDomain = "petal-patch-hydrogen.myshopify.com/";
const graphqlApiVersion = "unstable";
const storefrontToken = "4e89e9ade6aeee978fa01f519523cdff";
const defaultLocale = "en-us"

const url = `https://${storeDomain}/api/${graphqlApiVersion}/graphql.json`;


export async function api(request: {method: any; json: () => any} ) {
  let searchFilter;


  switch (request.method) {
    case 'POST':
      const searchQuery = await request.json();
      searchFilter = 'title:*' + searchQuery.search + '*';

      const data = await fetchProducts(searchFilter)

      const products: any = data && flattenConnection(data.data.products);

      return new Response(JSON.stringify(products), {status: 200});

    case 'DEFAULT':
      return new Response('Error posting search.', {status: 404});
  }


}

const fetchProducts = async (searchQuery: string) => {
  const variables = {
    query: searchQuery
  }
  const body = graphqlRequestBody(QUERY, variables)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontToken,
      'content-type': 'application/json',
      'Accept-Language': defaultLocale,
    },
    body
  }).catch((e) => {
    console.log(e)
  })

  // @ts-ignore
  return await response.json();
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
        products(query: $query, first: 5) {
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