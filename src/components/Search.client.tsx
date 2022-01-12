import gql from "graphql-tag";
import { flattenConnection, useShopQuery } from "@shopify/hydrogen";
import { ChangeEvent, useEffect, useState } from "react";
import { Simulate } from "react-dom/test-utils";
import submit = Simulate.submit;
import { useServerState } from "@shopify/hydrogen/client";

export default function SearchClient() {
  const [searchInput, setSearchInput] = useState<string>('');
  const {setServerState} = useServerState();

  /*const {data} = useShopQuery({
    query: QUERY,
    variables: {
      searchQuery: "title:" + searchInput
    }
  })*/

  useEffect(()=> {
    console.log(searchInput)
    setServerState('searchQuery', searchInput);
    console.log("pending " + useServerState().pending)
  }, )

  //todo: create a modal that pops up when a search is entered. need to search color, flower, product. use the welcome
  // query as a template. create a new component that pops up with search items below the search bar

  return (
    <div className="relative mx-auto text-gray-600 px-3 flex-grow">
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
        type="search"
        name="search"
        placeholder="SearchClient for product, flower, or color..."
        onChange={(event) => {
          setSearchInput(event.target.value)
        }}
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-6">
        <svg
          className="text-gray-600 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          xmlSpace="preserve"
          width="640px"
          height="640px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </div>
  );
}
