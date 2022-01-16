import {flattenConnection, useShopQuery} from "@shopify/hydrogen";

import gql from "graphql-tag";
import SearchClient from "./Search.client";

export default function Index({ searchQuery }: any) {
  let searchFilter = "title:*" + searchQuery + "*";

  const { data }: any = useShopQuery({
    query: QUERY,
    variables: {
      searchQuery: searchFilter
    }
  });

  const products: any = data && flattenConnection(data.products);
  const firstProduct = products && products.length ? products[0].title : '';

  const first = () => {
    return (
          console.table(firstProduct)
    )
  }

  return (
    <div>
      <SearchClient/>
      {first()}
    </div>
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