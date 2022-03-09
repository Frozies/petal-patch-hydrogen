import gql from 'graphql-tag';
import React from 'react';
import { Money, Image, flattenConnection, graphqlRequestBody } from "@shopify/hydrogen";
import { compareSearchFilters } from "../../../utils/searchUtils";
import { inspect } from "util";
import { colors } from "../../../utils/colors";
import { flowers } from "../../../utils/flowers";
import { holidays } from "../../../utils/holidays";

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


      let searchFilters: { colorsList: string[]; titleList: string[]; holidayList: string[]; flowersList: string[] } =
        {colorsList: [], flowersList: [], holidayList: [], titleList: []};

      //Search text
      if(searchQuery.searchQuery != undefined || searchQuery.tags != undefined) {

        //todo: Do i really need to seperate each title word out? ill leave it for now...
        searchQuery.searchQuery.split(' ').map((word: string) => {
          word = word.toLowerCase();
          let filteredWords = compareSearchFilters(word);

          searchFilters.titleList.push(...filteredWords.titleList)
        })

        if(searchQuery.tags !== undefined && searchQuery.tags.colors !== undefined) {
          searchQuery.tags.colors.map((value: string, index: number)=>{
            searchFilters.colorsList[index] = value;
          })
        }

        if(searchQuery.tags !== undefined && searchQuery.tags.flowers !== undefined) {
          searchQuery.tags.flowers.map((value: string, index: number)=>{
            searchFilters.flowersList[index] = value;
          })
        }

        if(searchQuery.tags !== undefined && searchQuery.tags.holidays !== undefined) {
          searchQuery.tags.holidays.map((value: string, index: number)=>{
            searchFilters.holidayList[index] = value;
          })
        }
      }

      /* Setup search filter
              (title:Caramel Apple) OR (tag:*roses) OR (tag:*christmas)
               */

        //todo: Do i really need to seperate each title word out? ill leave it for now...
      for(let i in searchFilters.titleList) {
        if (searchFilters.titleList[i]) {
          searchFilter = searchFilter + "(title:*" + searchFilters.titleList[i] + "*) AND "
        }
      }

      for(let i in searchFilters.colorsList) {
        if (searchFilters.colorsList[i]) {
          searchFilter = searchFilter + "(tag:*" + colors[i].value + "*) AND "
        }
      }

      for(let i in searchFilters.flowersList) {
        if (searchFilters.flowersList[i]){
          searchFilter = searchFilter + "(tag:*" + flowers[i].plural + "*) AND "
        }
      }

      for(let i in searchFilters.holidayList) {
        if (searchFilters.holidayList[i]) {
          searchFilter = searchFilter + "(tag:*" + holidays[i].tagName + "*) AND "
        }
      }

      // Remove the last OR or AND from the string to clean it up a bit. Pop the last 2 elements.
      let splitSearchFilter = searchFilter.split(' ');

      if(splitSearchFilter[splitSearchFilter.length-4] == "AND" ) {
        splitSearchFilter.pop()
        splitSearchFilter.pop()

        searchFilter = splitSearchFilter.join(' ');
      }

      if(splitSearchFilter[splitSearchFilter.length-3] == "OR") {

        splitSearchFilter.pop()
        splitSearchFilter.pop()

        searchFilter = splitSearchFilter.join(' ');
      }

      console.log(searchFilter)

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
        featuredImage{
            url
        }
        availableForSale
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