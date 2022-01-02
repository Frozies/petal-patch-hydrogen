import {useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './Cart/CartToggle.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';

export default function Header({collections, storeName}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header role="banner">
      <div
        className={`relative z-20 h-10 w-full border-b border-gray-200 px-6 md:px-8 mx-auto bg-white ${
          isMobileNavOpen ? '' : 'bg-opacity-95'
        }`}
      >
        <div className="h-full flex lg:flex-col place-content-between">
          <div className="text-center w-full flex justify-between items-center">
            <MobileNavigation
              collections={collections}
              isOpen={isMobileNavOpen}
              setIsOpen={setIsMobileNavOpen}
            />
            <Link
              className="font-black uppercase text-2xl tracking-widest"
              to="/"
            >
              {storeName}
            </Link>
            <>SearchBar</>
            <CartToggle
              handleClick={() => {
                if (isMobileNavOpen) setIsMobileNavOpen(false);
              }}
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <div
          className={`relative z-20 h-10 w-full border-b border-gray-200 px-6 md:px-8 mx-auto bg-white ${
            isMobileNavOpen ? 'hidden' : 'bg-opacity-95'
          }`}
        >
          <div className="lg:h-full lg:flex lg:flex-col place-content-between">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}
