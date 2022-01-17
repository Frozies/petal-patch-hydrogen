import {flattenConnection, useShopQuery} from "@shopify/hydrogen";

import gql from "graphql-tag";
import SearchClient from "./Search.client";

export default function Index({ searchQuery }: any) {
  let searchFilter = "title:*" + searchQuery + "*";

  const { data }: any = useShopQuery({
    query: QUERY,
    variables: {
      searchQuery: searchFilter
    }/*, todo: fill in cache
    cache: {
      maxAge: 60,
      staleWhileRevalidate: 60 * 10,
    },*/
  });

  const products: any = data && flattenConnection(data.products);
  const firstProduct = products && products.length ? products[0].title : '';

  const first = () => {
    return (
          console.table(firstProduct)
    )
  }

  return (
    <>
      <SearchClient/>
      {first()}
    </>
  );

}

const QUERY = gql`
    query searchContent($searchQuery: String!) {
        products(first: 5, query: $searchQuery) {
            edges {
                node {
                    handle
                    title
                }
            }
        }
    }
`;