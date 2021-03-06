import React, { useEffect, useState } from "react";
import { productType } from "../../utils/productType";
import { colors } from '../../utils/colors'
import { holidays } from "../../utils/holidays";
import { MinusSVG } from "../UI/minusSVG";
import { PlusSVG } from "../UI/plusSVG";
import { flowers } from "../../utils/flowers";
import { useServerState } from "@shopify/hydrogen/client";

export default function SearchFilterMenuClient({searchFilter}: any) {
  const {serverState, setServerState } = useServerState();

  //client side plus minus
  const [displayFilter, setDisplayFilter] = useState({
    displayColors: false,
    displayFlowers: false,
    displayHolidays: false,
  })

  const [filterState, setFilterState] = useState({
    productType: '',
    colors: new Array(colors.length).fill(false),
    flowers: new Array(flowers.length).fill(false),
    holidays: new Array(holidays.length).fill(false),
  })

  /*Search Filter state:
  *
  * productType: bouquets,
  * color:{
  *   true, (blue)
  *   false (orange)
  * },
  * holidays: {
  *   true, (christmas)
  *   false (thanksgiving)
  * }
  *
  * */

  const handleOnColorChange = (position: number) => {
    const updatedCheckedState = filterState.colors.map((item, index) =>
      index === position ? !item : item
    );

    setFilterState({...filterState, colors: updatedCheckedState});
    setServerState('searchFilter.tags', {...filterState, colors: updatedCheckedState});
  };

  const handleOnFlowerChange = (position: number) => {
    const updatedCheckedState = filterState.flowers.map((item, index) =>
      index === position ? !item : item
    );

    setFilterState({...filterState, flowers: updatedCheckedState});
    setServerState('searchFilter.tags', {...filterState, flowers: updatedCheckedState});
  };

  const handleOnHolidaysChange = (position: number) => {
    const updatedCheckedState = filterState.holidays.map((item, index) =>
      index === position ? !item : item
    );

    setFilterState({...filterState, holidays: updatedCheckedState});
    setServerState('searchFilter.tags', {...filterState, holidays: updatedCheckedState});
  };


  return (
    <>
      <form className="hidden lg:block">
        <h3 className="sr-only">Categories</h3>

        {/*TODO fix producttype*/}
        {/*<ul
          role="list"
          className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200"
        >
          {productType.map((prodType, index)=>{
            return (
              <li key={'product-type-' + index}>
                <button onClick={()=>{
                  setDisplayFilter({...displayFilter, productType: prodType.tagName})
                }} >
                  {prodType.clientName}
                </button>
              </li>
            )
          })}
        </ul>*/}

        <div className="border-b border-gray-200 py-6">
          <h3 className="-my-3 flow-root">
            {/*TODO: Expand/collapse section button */}
            <button
              type="button"
              className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-0"
              aria-expanded="false"
            >
              <span className="font-medium text-gray-900"> Color </span>
              <span className="ml-6 flex items-center">
               <button onClick={(event)=>{
                 setDisplayFilter({...displayFilter, displayColors: !displayFilter.displayColors })
                 event.preventDefault()
               }}
               >
                  { displayFilter.displayColors ? MinusSVG() : PlusSVG() }
                </button>
              </span>
            </button>
          </h3>

          <div className="pt-6" id="filter-section-0" hidden={!displayFilter.displayColors}>
            <div className="space-y-4">
              {colors.map((color: { value: string; clientName: string }, index: number)=>{
                return(
                  <div className="flex items-center" key={'color-' + index}>
                    <input
                      id={"filter-color-" + index}
                      name="color[]"
                      value={color.value}
                      type="checkbox"
                      onChange={(event)=> {
                        handleOnColorChange(index)
                      }}
                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={"filter-color-" + index}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {" "}
                      {color.clientName}{" "}
                    </label>
                  </div>
                )})}
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 py-6">
          <h3 className="-my-3 flow-root">
            {/*TODO: Expand/collapse section button */}
            <button
              type="button"
              className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-0"
              aria-expanded="false"
            >
              <span className="font-medium text-gray-900"> Flowers </span>
              <span className="ml-6 flex items-center">
               <button onClick={(event)=>{
                 setDisplayFilter({...displayFilter, displayFlowers: !displayFilter.displayFlowers })
                 event.preventDefault()
               }}
               >
                  { displayFilter.displayFlowers ? MinusSVG() : PlusSVG() }
                </button>
              </span>
            </button>
          </h3>

          <div className="pt-6" id="filter-section-0" hidden={!displayFilter.displayFlowers}>
            <div className="space-y-4">
              {flowers.map((flower: { plural: string; clientName: string }, index: number)=>{
                return(
                  <div className="flex items-center" key={'flower-' + index}>
                    <input
                      id={"filter-flower-" + index}
                      name="flower[]"
                      value={flower.plural}
                      type="checkbox"
                      onChange={()=> {
                        handleOnFlowerChange(index)
                      }}
                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={"filter-flower-" + index}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {" "}
                      {flower.clientName}{" "}
                    </label>
                  </div>
                )})}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 py-6">
          <h3 className="-my-3 flow-root">
            {/* Expand/collapse section button */}
            <button
              type="button"
              className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-1"
              aria-expanded="false"
            >
              <span className="font-medium text-gray-900"> Holidays </span>
              <span className="ml-6 flex items-center">
                <button onClick={(event)=>{
                  setDisplayFilter({...displayFilter, displayHolidays: !displayFilter.displayHolidays })
                  event.preventDefault()
                }}
                >
                  { displayFilter.displayHolidays ? MinusSVG() : PlusSVG() }
                </button>
              </span>
            </button>
          </h3>
          {/* Filter section, show/hide based on section state. */}
          <div className="pt-6" id="filter-section-1" hidden={!displayFilter.displayHolidays}>
            <div className="space-y-4">
              {holidays.map((holiday, index) => {
                return(
                  <div className="flex items-center" key={'holiday-' + index}>
                    <input
                      id={"filter-category-" + index}
                      name="holiday[]"
                      value={holiday.tagName}
                      type="checkbox"
                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      onChange={()=> {
                        handleOnHolidaysChange(index)
                      }}
                    />
                    <label
                      htmlFor={"filter-category-" + index}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {" "}
                      {holiday.clientName}{" "}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </form>
    </>
  );
};
