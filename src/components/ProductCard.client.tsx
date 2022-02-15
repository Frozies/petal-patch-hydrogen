import {Image, Link} from '@shopify/hydrogen/client';
import { useEffect, useState } from "react";
import AnimateHeight from 'react-animate-height';
import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';
import { deviceSizes, getDevice, useWindowSize } from "./Hooks/useWindowSize";

export default function ProductCardClient({product}: any) {
  const selectedVariant = product.variants.edges[0].node;
  const { width, height } = useWindowSize();
  //todo: test the get device features... P4
  const [device, setDevice] = useState(getDevice(width,height));
  //todo: i think i should set the device as a serverState. this way I can pass the variable back up the chain to adjust the
  // spacing of the banner.

  //Update the device on width and height change.
  useEffect(()=>  {
    setDevice(getDevice(width,height))
  },[width,height])

  const deviceHeights = {
    iPhoneX: {
      openHeight: 125,
      closeHeight: 100,
      cardWidth: 'w-52',
    },
    surfaceDuo: {
      openHeight: 272,
      closeHeight: 224,
      cardWidth: 'w-52',
    },
    iPad: {
      openHeight: 272,
      closeHeight: 224,
      cardWidth: 'w-52',
    },
    iPadPro: {
      openHeight: 272,
      closeHeight: 224,
      cardWidth: 'w-52',
    },
    default: {
      openHeight: 272,
      closeHeight: 224,
      cardWidth: "w-52",
    }
  }

  // if the device is defined, return the open,close, and device.
  const getCurrentDeviceElementHeights = (device: any) => {

    Object.entries(deviceHeights).forEach((key, val)=>{
      if (key[0] == device.device) {
        return {
          openHeight: key[1].openHeight,
          closeHeight: key[1].closeHeight,
          device: key[0],
          cardWidth: key[1].cardWidth
        }
      }
    });

    return {
      openHeight: deviceHeights["default"].openHeight,
      closeHeight: deviceHeights["default"].closeHeight,
      device: '720p',
      cardWidth: deviceHeights["default"].cardWidth
    }
  }

  const initialAnimHeight = (device: any) => {
    return getCurrentDeviceElementHeights(device)
  }

  const [elementAnimSize, setElementAnimSize] = useState(initialAnimHeight(device))


  //on window change,  get device height and set them to a state
  useEffect(() => {
    setElementAnimSize(getCurrentDeviceElementHeights(device))
  },[device])

  const [timeOut, setTimeOut] = useState(false);
  const [elementSize, setElementSize] = useState({productHeight: elementAnimSize.closeHeight});

  //This is the timeout for the animation that plays once the page has loaded
  useEffect(() => {
    //Timeout animation for homepage visit to nudge the user to hover over the product card to show them the pricing
    setTimeout(() => {
      if(!timeOut) {
        setElementSize({productHeight: elementAnimSize.openHeight});
      }
      setTimeOut(true)
      setTimeout(() => {
        if(!timeOut) {
          setElementSize({productHeight: elementAnimSize.closeHeight});
        }
      }, 1200);
    }, 350);
  }, [device])

  if (selectedVariant == null) {
    return null;
  }

  /*TODO:
   * New item icon:
   * selectedVariant.publishedAt
   *
   * Discounted item icon:
   * selectedVariant.compareAtPriceV2
   *
   * Top Seller Icon:
   *
   *
   * SHow then hide product card for initial load in.
   * */
  return (
    <>
      <div
        className={`text-md mb-4 absolute items-center justify-center ${elementAnimSize.cardWidth} pb-10`}
      >
        <Link
          to={`/products/${product.handle}`}
          onMouseEnter={() => {
            setElementSize({
              productHeight: elementAnimSize.openHeight,
            });
          }}
          onMouseLeave={() => {
            setElementSize({
              productHeight: elementAnimSize.closeHeight,
            });
          }}
        >
          <AnimateHeight
            height={elementSize.productHeight}
            className="rounded-lg border border-b bg-white mb-2 relative object-cover w-auto"
          >
            {/*IN STOCK*/}
            {selectedVariant.image ? (
              <Image
                className="
              bg-white
              absolute
              xs:h-32
              lg:h-56
              bg-center
              bg-cover
              object-center
              object-contain
              p-2"
                image={selectedVariant.image}
              />
            ) : null}

            {/*TITLE*/}
            <span className="text-black font-semibold mb-0.5 absolute w-full text-center translate-y-56">
            {product.title}
          </span>

            {/*PRICE*/}
            {selectedVariant?.availableForSale && (
              <div className="flex translate-y-61 text-center">
                {selectedVariant.compareAtPriceV2 && (
                  <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
                )}
                <MoneyPrice money={selectedVariant.priceV2} />
              </div>
            )}
            {/*OUT OF STOCK*/}
            {!selectedVariant?.availableForSale && (
              <div className="text-black font-semibold mb-0.5 w-full text-center translate-y-61">
                Out of stock
              </div>
            )}
          </AnimateHeight>
        </Link>
      </div>
    </>
  );
}
