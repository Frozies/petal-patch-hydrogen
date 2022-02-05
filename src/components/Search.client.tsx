import React, { useEffect, useRef, useState } from "react";
import { Link } from "@shopify/hydrogen/client";

type searchResults = { title: any; handle: any; }

export default function SearchClient({ className }: any) {
  const [search, setSearch] = useState<string>(); //TODO: IMPORTANT ESCAPE THIS VALUE ON SENDING TO SERVER!!!!!
  // @ts-ignore
  const [searchResults, setSearchResults] = useState<[searchResults]>([]);
  const [overlay, toggleOverlay] = useState<boolean>(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await requestProducts();
  }

  const requestProducts = async () => {
    const response = await fetch('/api/views/SearchProducts', {
      method: "POST",
      headers: {
        accept: 'application/hydrogen, application/json',
      },
      body: JSON.stringify({ search: search })
    }).catch((e) => {
      console.log("Client side error: ")
      console.log(e)
    })

    // @ts-ignore
    setSearchResults([]) //Clear out searchResults

    // @ts-ignore
    const products = (await response.json());
    for(let i in await products) {
      const newItem = {
        title: await products[i].title,
        handle: await products[i].handle
      }
      // @ts-ignore
      setSearchResults(currentItems => [...currentItems, newItem])
    }
  }

  const onChange = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value)
    onSubmit(e);
  }

  
  /*Focus on searchbar on click into.*/
  let ref:any = useRef();
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e: { target: any; }) => {
    if (ref.current.contains(e.target)) {
      // inside click
      toggleOverlay(true)
      return;
    }

    // outside click
    toggleOverlay(false)
  };

  const searchResultsBox = (results: any) => {

    const itemList = (results: any) => {
      if (results != undefined) return results.map((item: any)=> (
        <li key={item.handle}
            className={"hover:bg-header-pink w-full text h-full"}
        >
          <Link
            to={`/products/${item.handle}`}
            className={"px-5"}
            onClick={()=> {
              toggleOverlay(false)
            }}
          >
            {item.title}
          </Link>
        </li>
      ))
    }

    if (overlay) return (
      <ul className={`absolute bg-white h-auto text-sm text-left w-full`}>
        {itemList(results)}
      </ul>
    )
  }

  return (
      <div className={className}>
        <div
            id={"searchOverlay"}
            className={`z-[-1] ease-in-out transition-all duration-300 fixed w-full h-full top-0 left-0 flex items-center justify-center w-screen h-screen bg-black ${
                overlay ? 'opacity-60' : 'opacity-0 pointer-events-none'
            }`}
        />
        <form ref={ref} className="relative mx-auto text-gray-600 px-3 flex-grow"
        >
          <div className={"relative w-full top-10 z-50"}>
            {searchResultsBox(searchResults)}
          </div>
          <input
            className={`relative z-50  bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full ${
              overlay ? 'border-header-pink border-2' : 'border-gray-300 border-2'
            }`}
            name={"search"}
            type="text"
            placeholder="Search for product, flower, or color..."
            onChange={onChange}
            value={search}
            onKeyPress={(e) => {
              e.key === 'Enter' && onSubmit(e);
            }}
            onSubmit={(e: any) => {
              e.preventDefault();
              setSearch(e.target.value)
              onSubmit(e)
            }}
            autoComplete={"off"}
          />
          <button type="button"
                  className="absolute right-0 top-0 mt-3 mr-6 "
                  onClick={(e: any) => {
                    onSubmit(e)
                  }}>
            <svg
              className="text-gray-600 h-4 w-4 fill-current relative z-50 "
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

        </form>
      </div>
  );
}