import {useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './Cart/CartToggle.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';
import SearchServServer from "./SearchProvider.server";

export default function Header({collections, storeName, searchQuery}: any) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header role="banner">
      <div
        className={` h-14 w-full border-b border-gray-200 px-6 md:px-8 mx-auto bg-header-blue relative z-50
         ${
          isMobileNavOpen ? '' : 'bg-opacity-95'
        }`}
      >
        <div className="h-full flex flex-row lg:flex-col place-content-around z-50 relative">
          <div className="text-center w-full flex justify-between align-middle items-center header z-50 relative">
            <MobileNavigation
              collections={collections}
              isOpen={isMobileNavOpen}
              setIsOpen={setIsMobileNavOpen}
            />
            <Link
              className="font-sansSerif text-4xl font-semibold basis-1/2"
              to="/"
            >
              {storeName}
            </Link>
            <SearchServServer searchQuery={searchQuery}/>

            <h1 className={'font-semibold text-2xl font-sansSerif px-2'}>
              Account
            </h1>
            <CartToggle
              handleClick={() => {
                if (isMobileNavOpen) setIsMobileNavOpen(false);
              }}
            />
            <h1 className={'font-semibold text-2xl font-sansSerif'}> Cart</h1>
          </div>
        </div>
      </div>

      <div className="hidden lg:block z-50 relative">
        <div
          className={`relative z-50 h-10 w-full border-b border-gray-200 px-6 md:px-8 mx-auto bg-header-pink ${
            isMobileNavOpen ? 'hidden' : 'bg-opacity-95'
          }`}
        >
          <div className="lg:h-full lg:flex lg:flex-col place-content-between align-middle justify-center">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}
