import React, { useEffect, useRef, useState } from "react";
import { FilterSVG } from "../UI/filterSVG";
import { GridSVG } from "../UI/gridSVG";
import { DownArrowSVG } from "../UI/downArrowSVG";

export default function SearchPageHeaderClient() {
  const [sortState, setSortState] = useState({
    hidden: true,
  })

 /* /!*Focus on sort box on click into.*!/
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
      console.log('click')

      setSortState({hidden: false})
      console.log('false')
      return;
    }

    // outside click
    setSortState({hidden: true})
    console.log('true')

  };

  //todo: click out of sort menu to hide it.*/

  return (
    <>
      <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          New Arrivals
        </h1>

        <div className="flex items-center">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                id="menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={()=>{
                  setSortState({hidden: !sortState.hidden})
                }}
              >
                Sort
              <DownArrowSVG/>
              </button>
            </div>

            {/*
                    todo: Dropdown menu, show/hide based on menu state.

                    Entering: "transition ease-out duration-100"
                      From: "transform opacity-0 scale-95"
                      To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                      From: "transform opacity-100 scale-100"
                      To: "transform opacity-0 scale-95"
                  */}
            <div
              className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
              hidden={sortState.hidden}
            >
              <div className="py-1" role="none">
                {/*
                        Active: "bg-gray-100", Not Active: ""

                        Selected: "font-medium text-gray-900", Not Selected: "text-gray-500"
                      */}
                <a
                  href="#"
                  className="font-medium text-gray-900 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                >
                  {' '}
                  Most Popular{' '}
                </a>

                <a
                  href="#"
                  className="text-gray-500 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-1"
                >
                  {' '}
                  Best Rating{' '}
                </a>

                <a
                  href="#"
                  className="text-gray-500 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-2"
                >
                  {' '}
                  Newest{' '}
                </a>

                <a
                  href="#"
                  className="text-gray-500 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-3"
                >
                  {' '}
                  Price: Low to High{' '}
                </a>

                <a
                  href="#"
                  className="text-gray-500 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-4"
                >
                  {' '}
                  Price: High to Low{' '}
                </a>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
          >
            <GridSVG/>
          </button>
          <button
            type="button"
            className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
          >
          <FilterSVG/>
          </button>
        </div>
      </div>
    </>
  );
}
