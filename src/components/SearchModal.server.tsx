import { useShopQuery } from "@shopify/hydrogen";
import gql from "graphql-tag";
import SearchClient from "./Search.client";
import { useEffect } from "react";
import { useServerState } from "@shopify/hydrogen/client";

export default function SearchModalServer({searchQuery}: any) {
  console.log(searchQuery)
  if(searchQuery !== undefined) {
    const {data} = useShopQuery({
      query: QUERY,
      variables: {
        searchQuery: "title:*" + searchQuery + "*"
      }
    });
    const {products}: any = data;

    const selectedProduct = () => {
      return(
        /*products.edges.map((prod: any) => {
          return(
            <h1>{prod.node.title}</h1>
          )
        })*/
        <h1>FAKE</h1>
      )
    }

    return (
      <>
        <SearchClient/>
        <div>Selected product is {
          selectedProduct()
        }</div>
      </>
    );
  }
  else {
    return (
      <>
        <SearchClient/>
      </>
    );
  }
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