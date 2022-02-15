import React, { useEffect, useState } from "react";

//These are default device sizes to setup elements to match to.
export const deviceSizes = {
  //Vertically holding phone
  'default': { width: 1280, height: 720 },
  'iPhoneX': { width: 375, height: 812 },
  'surfaceDuo': { width: 540, height: 720 },
  'iPad': { width: 768, height: 1024 },
  'iPadPro': { width: 1024, height: 1366 },
}

//todo: Test this entire file

// getDevice takes an input width and height. First it compares what one is
// bigger to check if the device is vertical or horizontal. Then iterates over
// the deviceSizes to check if the inputs are a match or bigger than listed.
export const getDevice = (inputWidth: number, inputHeight: number) => {
  let isVertical = false;

  if(inputWidth < inputHeight) {
    isVertical = true;
  }
  else isVertical = false

  //the first device goes here
  let prevDevice: { device: string, width: number; height: number, isVertical: boolean } = {
    device: 'iPhoneX',
    width: deviceSizes['iPhoneX'].width,
    height: deviceSizes['iPhoneX'].height,
    isVertical: isVertical
  };

  Object.entries(deviceSizes).forEach((key, val)=>{

    if(isVertical) {
      if(inputWidth >= key[1].width) {
        console.log('set new device vertical: ' + key[0])
        prevDevice = {
          device: key[0],
          width: key[1].width,
          height: key[1].height,
          isVertical: isVertical
        }
      }
      else return prevDevice;
    }
    else {
      if(inputHeight >= key[1].width) {
        console.log('set new device horizontal: ' + key[0])
        prevDevice = {
          device: key[0],
          width: key[1].width,
          height: key[1].height,
          isVertical: isVertical
        }
      }
      else return prevDevice;
    }
  })
  return prevDevice;
}

/**
 * useWindowSize will return the size of a window to use in sizing other elements. This
* */
export function useWindowSize() {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    //run to get initial size
    handleWindowSizeChange()

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, );

  return {
    width: width,
    height: height
  };
}