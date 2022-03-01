import gql from 'graphql-tag';
import React from 'react';
import { Money, Image, flattenConnection, graphqlRequestBody } from "@shopify/hydrogen";
import { GraphQLConnection } from "@shopify/hydrogen/dist/esnext/types";
import { inspect } from "util";
import { colors } from "../../../utils/colors";
import { flowers } from "../../../utils/flowers";
import { holidays } from "../../../utils/holidays";
import { word } from "@headlessui/react/dist/test-utils/interactions";

//todo: Get this dynamically
const storeDomain = "petal-patch-hydrogen.myshopify.com/";
const graphqlApiVersion = "unstable";
const storefrontToken = "4e89e9ade6aeee978fa01f519523cdff";
const defaultLocale = "en-us"

const url = `https://${storeDomain}/api/${graphqlApiVersion}/graphql.json`;


export async function api(request: {method: any; json: () => any} ) {
  let searchFilter = '';

  switch (request.method) {
    case 'POST':
      const searchQuery = await request.json();

      /*
      * if searchQuery includes the words color, holiday, or type, enter them as a tag.
      * iterate over each word seperated by spaces. if the word matches, add to an array.
      * string.split(' ').map(word => {})
      * */

      if(searchQuery.search != undefined) {
        let colorsList: string[] = []
        let flowersList: string[] = []
        let holidayList: string[] = []
        let titleList: string[] = []

        searchQuery.search.split(' ').map((word: string) => {

          word = word.toLowerCase();

          /*TODO: separation of concerns. take out the filters and make them their own functions*/
          //check if word is in colors
          colors.filter((item)=> {
            if(item.clientName.toLowerCase() == word){
              colorsList.push(word)
              return
            }
          })

          //check if word is in flowers
          flowers.filter((item)=> {
            if(item.singular.toLowerCase() == word){
              flowersList.push(word)
              return
            }
            else if(item.plural.toLowerCase() == word){
              flowersList.push(word)
              return
            }
          })

          //check if word is in holidays
          holidays.filter((item)=> {
            if(item.clientName.toLowerCase() == word){
              holidayList.push(word)
              return
            }
            else if(item.tagName.toLowerCase() == word){
              holidayList.push(word)
              return
            }
          })

          titleList.push(word)

        })

        /* Setup search filter
        (title:Caramel Apple) OR (tag:roses) OR (tag:christmas)
         */

        for(let i in colorsList) {
          searchFilter = searchFilter + "(tag:" + colorsList[i] + ") OR "
        }

        for(let i in flowersList) {
          searchFilter = searchFilter + "(tag:" + flowersList[i] + ") OR "
        }

        for(let i in holidayList) {
          searchFilter = searchFilter + "(tag:" + holidayList[i] + ") OR "
        }

        for(let i in titleList) {
          searchFilter = searchFilter + "(title:" + titleList[i] + ") OR "
        }

        // Remove the last OR from the string to clean it up a bit.
        let splitSearchFilter = searchFilter.split(' ');
        if(splitSearchFilter[splitSearchFilter.length-2] == "OR") {
          splitSearchFilter.pop()
          splitSearchFilter.pop()
          searchFilter = splitSearchFilter.join(' ');
        }
      }

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