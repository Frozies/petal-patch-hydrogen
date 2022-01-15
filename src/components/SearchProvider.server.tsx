/*
import { useShopQuery } from "@shopify/hydrogen";

import gql from "graphql-tag";
import SearchClient from "./Search.client";

export default function SearchServServer({ searchQuery }: any) {
  let searchFilter = "title:*" + searchQuery + "*"

  const { data } = useShopQuery({
    query: QUERY,
    variables: {
      searchQuery: searchFilter
    }
  });

  const { products }: any = data;

  return (
    <div>
      <SearchClient/>
      <p>Your query was: {searchQuery}</p>

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
*/

import SearchClient from "./Search.client";

// @ts-ignore
export default function Index({ searchQuery }) {
  return (
    <>
      <SearchClient />
      <p>Your query was: {searchQuery}</p>
    </>
  );
}
