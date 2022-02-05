import React, {useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './Cart/CartToggle.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';
import SearchClient from "./Search.client";
import { useMobile } from "./Hooks/useMobile";

export default function Header({collections, storeName, search}: any) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isMobile = useMobile();

  const pageHead = () => {
    if(isMobile)
      return (
      <>
      </>
    )
    if(!isMobile)
    return (
      <>
        <div className="text-center w-full flex justify-between align-middle items-center header flex-row">
          <MobileNavigation
            collections={collections}
            isOpen={isMobileNavOpen}
            setIsOpen={setIsMobileNavOpen}
          />
          <Link
            className="relative z-50 font-sansSerif text-4xl font-semibold lg:basis-50 border-2 border-black/0
              hover:border-black/100"
            to="/"
          >
            {storeName}
          </Link>
          <SearchClient/>

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
      </>
    )
  }

  return (
    <header role="banner" style={{
        /*This zIndex fixed the search overlay*/
        position: 'relative',
        zIndex: 50
    }}>
      <div
        className={`h-14 w-full border-b border-gray-200 px-6 md:px-8 mx-auto bg-header-blue`}
      >
        <div className="h-full flex flex-row lg:flex-col place-content-around">
          <div className="text-center w-full flex-col">
            {pageHead()}
          </div>
        </div>
      </div>

      <div
          className={'relative z-35 h-10 w-full border-b border-gray-200 px-6 md:px-8 mx-auto bg-header-pink xs:hidden lg:visible'}
      >
        <div className="lg:h-full lg:flex lg:flex-col place-content-between align-middle justify-center">
          <Navigation />
        </div>
      </div>
    </header>
  );
}
