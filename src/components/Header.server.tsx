import {useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './Cart/CartToggle.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';
import SearchServServer from './SearchProvider.server';

export default function Header({collections, storeName, searchQuery}: any) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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
          <div className="text-center w-full flex justify-between align-middle items-center header">
            <MobileNavigation
              collections={collections}
              isOpen={isMobileNavOpen}
              setIsOpen={setIsMobileNavOpen}
            />
            <Link
              className="relative z-50 font-sansSerif text-4xl font-semibold basis-1/2"
              to="/"
            >
              {storeName}
            </Link>
            <SearchServServer searchQuery={searchQuery} />

            <h1
              className={
                'font-semibold text-2xl font-sansSerif px-2 relative z-50 '
              }
            >
              Account
            </h1>
            <CartToggle
              handleClick={() => {
                if (isMobileNavOpen) setIsMobileNavOpen(false);
              }}
            />
            <h1
              className={'font-semibold text-2xl font-sansSerif relative z-50 '}
            >
              {' '}
              Cart
            </h1>
          </div>
        </div>
      </div>

      <div
          className={'relative z-50 h-10 w-full border-b border-gray-200 px-6 md:px-8 mx-auto bg-header-pink'}
      >
        <div className="lg:h-full lg:flex lg:flex-col place-content-between align-middle justify-center">
          <Navigation />
        </div>

      </div>
    </header>
  );
}
