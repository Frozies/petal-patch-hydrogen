import {Link} from '@shopify/hydrogen/client';
import { Image } from "@shopify/hydrogen";
import React from "react";

export default function Footer({collection, product}: any) {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo">
      {/*TODO: fill in all categories down here for easy access like amazon.*/}

      {/*Awards*/}
      <div className={" w-full h-full bg-white flex justify-center"}>
        {/*<div className={'w-1/3 flex flex-row '}>
          <Image
            className="
              bg-white
              h-[200px]
              bg-center
              bg-cover
              object-center
              object-contain
              p-2"
            width={635}
            height={822}
            src={'/fortmyers_2018.jpg'}
          />

          <Image
            className="
              bg-white
              h-[200px]
              bg-center
              bg-cover
              object-center
              object-contain
              p-2"
            width={635}
            height={822}
            src={'/gulfshore_2019.jpg'}
          />

          <Image
            className="
              bg-white
              h-[200px]
              bg-center
              bg-cover
              object-center
              object-contain
              p-2"
            width={635}
            height={822}
            src={'/gulfshore_2020.jpeg'}
          />
        </div>*/}
      </div>
      <div className="py-6 px-4 md:px-8 bg-gray-50 flex justify-center align-middle items-center">
        <p className="text-gray-600 hover:underline hover:text-header-pink"><Link to={'http://davinyoung.com/'}
        target="_blank">©2017-{year} DAVINYOUNG.COM</Link></p>
      </div>
    </footer>
  );
}
