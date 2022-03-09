import {Image, Link} from '@shopify/hydrogen/client';
import React, { useEffect, useState } from "react";
import AnimateHeight from 'react-animate-height';
import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';
import { deviceSizes, getDevice, useWindowSize } from "./Hooks/useWindowSize";

const deviceHeights = {
  iPhoneX: { // Most of these aren't exact. just set up the layout to be close
    vertical: {
      openHeight: 155,
      closeHeight: 125,
      cardWidth: 'w-24',
      gridSize: 'grid-cols-3 grid-rows-2 gap-y-44',
      productCount: 6,
      titlePos: 'translate-y-32',
      pricePos: 'translate-y-61',
    },
    horizontal: {
      openHeight: 155,
      closeHeight: 125,
      cardWidth: 'w-32',
      gridSize: 'grid-cols-5 grid-rows-1 gap-8',
      productCount: 5,
      titlePos: 'translate-y-56',
      pricePos: 'translate-y-61',
    }
  },
  surfaceDuo: {
    vertical: {
      openHeight: 155,
      closeHeight: 125,
      cardWidth: 'w-36',
      gridSize: 'grid-cols-3 grid-rows-2 gap-y-44',
      productCount: 6,
      titlePos: 'translate-y-56',
      pricePos: 'translate-y-61',
    },
    horizontal: {
      openHeight: 276,
      closeHeight: 224,
      cardWidth: 'w-28',
      gridSize: 'grid-cols-5 grid-rows-1 gap-8',
      productCount: 5,
      titlePos: 'translate-y-56',
      pricePos: 'translate-y-61',
    }
  },
  iPad: {
    vertical: { //done
      openHeight: 210,
      closeHeight: 145,
      cardWidth: 'w-36',
      gridSize: 'grid-cols-4 grid-rows-2 gap-y-60',
      productCount: 8,
      titlePos: 'translate-y-36',
      pricePos: 'translate-y-47',
    },
    horizontal: { //DONE
      openHeight: 280,
      closeHeight: 224,
      cardWidth: 'w-40',
      gridSize: 'grid-cols-5 grid-rows-1 gap-8',
      productCount: 5,
      titlePos: 'translate-y-56',
      pricePos: 'translate-y-64',
    }
  },
  iPadPro: {
    vertical: {
      openHeight: 125,
      closeHeight: 100,
      cardWidth: 'w-52',
      gridSize: 'grid-cols-3 grid-rows-2 gap-y-44',
      productCount: 6,
      titlePos: 'translate-y-56',
      pricePos: 'translate-y-61',
    },
    horizontal: {
      openHeight: 224,
      closeHeight: 224,
      cardWidth: 'w-52',
      gridSize: 'grid-cols-6 grid-rows-1 gap-8',
      productCount: 6,
      titlePos: 'translate-y-56',
      pricePos: 'translate-y-61',
    }
  },
  default: { //1280x720
    vertical: {
      openHeight: 125,
      closeHeight: 100,
      cardWidth: 'w-52',
      gridSize: 'grid-cols-3 grid-rows-2 gap-y-44',
      productCount: 6,
      titlePos: 'translate-y-56',
      pricePos: 'translate-y-61',
    },
    horizontal: {
      openHeight: 276,
      closeHeight: 224,
      cardWidth: 'w-52',
      gridSize: 'grid-cols-6 grid-rows-1 gap-8',
      productCount: 6,
      titlePos: 'translate-y-56',
      pricePos: 'translate-y-61',
    }
  }
}

// if the device is defined, return the open,close, and device.
const getCurrentDeviceElementSizes = (device: any) => {
  let returnDevice;

  Object.entries(deviceHeights).forEach((key, val)=>{
    if (key[0] == device.device) {
      if (device.isVertical){
        returnDevice = {
          device: key[0],
          openHeight: key[1].vertical.openHeight,
          closeHeight: key[1].vertical.closeHeight,
          cardWidth: key[1].vertical.cardWidth,
          gridSize: key[1].vertical.gridSize,
          productCount: key[1].vertical.productCount,
          titlePos: key[1].vertical.titlePos,
          pricePos: key[1].vertical.pricePos,
        }
      }
      else {
        returnDevice = {
          device: key[0],
          openHeight: key[1].horizontal.openHeight,
          closeHeight: key[1].horizontal.closeHeight,
          cardWidth: key[1].horizontal.cardWidth,
          gridSize: key[1].horizontal.gridSize,
          productCount: key[1].horizontal.productCount,
          titlePos: key[1].horizontal.titlePos,
          pricePos: key[1].horizontal.pricePos,
        }
      }
    }
  });

  return (returnDevice ? returnDevice : () =>{
    if (!device.isVertical) return {
      device: deviceHeights['default'],
      openHeight: deviceHeights['default'].horizontal.openHeight,
      closeHeight: deviceHeights['default'].horizontal.closeHeight,
      cardWidth: deviceHeights['default'].horizontal.cardWidth,
      gridSize: deviceHeights['default'].horizontal.gridSize,
      productCount: deviceHeights['default'].horizontal.productCount,
      titlePos: deviceHeights['default'].horizontal.titlePos,
      pricePos: deviceHeights['default'].horizontal.pricePos,
    }
    else
      return {
        device: deviceHeights['default'],
        openHeight: deviceHeights['default'].vertical.openHeight,
        closeHeight: deviceHeights['default'].vertical.closeHeight,
        cardWidth: deviceHeights['default'].vertical.cardWidth,
        gridSize: deviceHeights['default'].vertical.gridSize,
        productCount: deviceHeights['default'].vertical.productCount,
        titlePos: deviceHeights['default'].vertical.titlePos,
        pricePos: deviceHeights['default'].vertical.pricePos,
      }
  });
}

export default function BannerProductCardClient ({ featuredProducts } : any) {
  const { width, height } = useWindowSize();
  const [device, setDevice] = useState(getDevice(width,height));

  const [elementDevice, setElementDevice] = useState(getCurrentDeviceElementSizes(device))

//Update the device on width and height change.
  useEffect(()=>  {
    setDevice(getDevice(width,height))
  },[width,height]);

  useEffect(()=>{
    setElementDevice(getCurrentDeviceElementSizes(device))
  },[device])

  if(featuredProducts == undefined) {
    console.error('Error hydrating featured products.')
    return (undefined) //todo: return default products
  }

  if(featuredProducts!=undefined) return (
    <div className={`grid ${elementDevice.gridSize} mb-8`}>
      {featuredProducts.slice(0, elementDevice.productCount).map((product: any) => (
        <div key={product.id}>
          <ProductCard product={product} elementDevice={elementDevice} />
        </div>
      ))}
    </div>
  )
}

function ProductCard({product, elementDevice}: any) {
  const selectedVariant = product.variants.edges[0].node;
  const [timeOut, setTimeOut] = useState(false);
  const [elementSize, setElementSize] = useState({productHeight: elementDevice.closeHeight});

  //on window change,  get device height and set them to a state
  useEffect(()=> {

    //Timeout animation for homepage visit to nudge the user to hover over the product card to show them the pricing
    setTimeout(() => {
      if(!timeOut) {
        setElementSize({productHeight: elementDevice.openHeight});
      }
      setTimeOut(true)
      /*setTimeout(() => {
        if(!timeOut) {
          setElementSize({productHeight: elementDevice.closeHeight});
        }
      }, 2400);*/
    }, 500);

  }, [elementDevice])



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
   * Show then hide product card for initial load in.
   * */
  return (
    <>
      <div
        className={`text-md mb-4 absolute items-center justify-center ${elementDevice.cardWidth} pb-10`}
      >
        <Link
          to={`/products/${product.handle}`}
          onMouseEnter={() => {
            setElementSize({
              productHeight: elementDevice.openHeight,
            });
          }}
          /*onMouseLeave={() => {
            setElementSize({
              productHeight: elementDevice.closeHeight,
            });
          }}*/
        >
          <AnimateHeight
            height={elementSize.productHeight}
            className={`rounded-lg border border-b bg-white mb-2 relative object-cover w-auto`}
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
            <span className={`leading-4 text-black font-semibold mb-0.5 absolute w-full text-center ${elementDevice.titlePos}`}>
            {product.title}
          </span>

            {/*PRICE*/}
            {selectedVariant?.availableForSale && (
              <div className={`flex ${elementDevice.pricePos} text-center`}>
                {selectedVariant.compareAtPriceV2 && (
                  <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
                )}
                <MoneyPrice money={selectedVariant.priceV2} />
              </div>
            )}
            {/*OUT OF STOCK*/}
            {!selectedVariant?.availableForSale && (
              <div className={`text-black font-semibold mb-0.5 w-full text-center ${elementDevice.pricePos}`}>
                Out of stock
              </div>
            )}
          </AnimateHeight>
        </Link>
      </div>
    </>
  );
}
