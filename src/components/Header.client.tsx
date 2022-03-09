import React, {useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './Cart/CartToggle.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';
import SearchBarClient from "./Search/SearchBar.client";
import { useWindowSize } from "./Hooks/useWindowSize";

export default function Header({collections, storeName, search}: any) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const {width, height} = useWindowSize();

  const pageHead = () => {
    if(width <= 1024)
      return (
      <>
        <div
          className={`h-14 w-full border-b border-gray-200 px-6 md:px-8 mx-auto bg-header-blue`}
        >
          <div className="h-full w-full flex flex-row lg:flex-col place-content-around">
            <div className="text-center w-full flex justify-between align-middle items-center header flex-row">
              <MobileNavigation
                collections={collections}
                isOpen={isMobileNavOpen}
                setIsOpen={setIsMobileNavOpen}
              />
              <Link
                className="relative z-50 font-sansSerif text-3xl w-full font-semibold whitespace-nowrap basis-50 border-2 border-black/0
              hover:border-black/100"
                to="/"
              >
                {storeName}
              </Link>


              <CartToggle
                handleClick={() => {
                  if (isMobileNavOpen) setIsMobileNavOpen(false);
                }}
                className={"border-2 border-black/0 hover:border-black/100 flex flex-row items-center justify-around"}
              />
            </div>
          </div>
        </div>

        <div
          className={"relative z-35 h-12 w-full px-6 mx-auto border-b border-gray-200 bg-header-pink flex " +
            "place-content-between align-middle justify-center items-center"}
        >
          <div className="h-5/6 w-full flex place-content-between align-middle justify-center items-center">
            <SearchBarClient/>
          </div>
        </div>
      </>
    )
    if(width > 1024)
    return (
      <>
        <div
          className={`h-12 w-full border-b border-gray-200 px-6 md:px-8 mx-auto bg-header-blue`}
        >
          <div className="h-full w-full flex flex-row lg:flex-col place-content-around">
            <div className="text-center w-full flex justify-between align-middle items-center header flex-row">
              <Link
                className="relative z-50 font-sansSerif text-3xl whitespace-nowrap font-semibold basis-50 border-2 border-black/0
              hover:border-black/100"
                to="/"
              >
                {storeName}
              </Link>
              <SearchBarClient/>

              <h1
                className={
                  'font-semibold text-2xl font-sansSerif px-2 relative z-50 border-2 border-black/0 ' +
                  'hover:border-black/100'
                }
              >
                Account
              </h1>

              <CartToggle
                handleClick={() => {
                  if (isMobileNavOpen) setIsMobileNavOpen(false);
                }}
                className={"border-2 border-black/0 hover:border-black/100 flex flex-row items-center justify-around"}
              />
            </div>
          </div>
        </div>

        <div
          className={"relative z-35 h-10 w-full px-6 mx-auto border-b border-gray-200  bg-header-pink xs:hidden md:block"}
        >
          <div className="h-full flex flex-col place-content-between align-middle justify-center">
            <Navigation />
          </div>
        </div>
      </>
    )
  }

  return (
    <header role="banner" style={{
        /*This zIndex fixed the search overlay*/
        position: 'relative',
        zIndex: 50
    }}>
      {pageHead()}
    </header>
  );
}
