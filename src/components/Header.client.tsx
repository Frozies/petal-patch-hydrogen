import {useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './Cart/CartToggle.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';
import Search from './Search.client';

export default function Header({collections, storeName}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header role="banner">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Laila:wght@500;700&display=swap"
        rel="stylesheet"
      />

      <div
        className={`z-20 h-14 w-full border-b border-gray-200 px-6 md:px-8 mx-auto bg-header-blue ${
          isMobileNavOpen ? '' : 'bg-opacity-95'
        }`}
      >
        <div className="h-full flex flex-row lg:flex-col place-content-around">
          <div className="text-center w-full flex justify-between align-middle items-center header">
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
            <Search />

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

      <div className="hidden lg:block">
        <div
          className={`relative z-20 h-10 w-full border-b border-gray-200 px-6 md:px-8 mx-auto bg-header-pink ${
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
