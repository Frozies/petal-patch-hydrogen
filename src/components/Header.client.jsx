import {useEffect, useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './CartToggle.client';
import {useCartUI} from './CartUIProvider.client';
import CountrySelector from './CountrySelector.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';
import SearchBarClient from './Search/SearchBar.client';

/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({storeName}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const {isCartOpen} = useCartUI();

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
        setScrollbarWidth(scrollbarWidth);
  }, [isCartOpen]);

  return (
    <header className="h-20 lg:h-32" role="banner">
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
            <Navigation/>
          </div>
        </div>
    </header>
  );
}
