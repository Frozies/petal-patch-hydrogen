import React, { useEffect, useState } from "react";
import { productType } from "../../utils/productType";
import { colors } from '../../utils/colors'
import { holidays } from "../../utils/holidays";
import { MinusSVG } from "../UI/minusSVG";
import { PlusSVG } from "../UI/plusSVG";
import { flowers } from "../../utils/flowers";
import { requestProducts } from "../../utils/searchUtils";

export default function SearchFilterMenuClient(handleOnHolidayChange: any, handleOnFlowerChange: any, handleOnColorChange: any ) {
  //client side plus minus
  const [displayFilter, setDisplayFilter] = useState({
    displayColors: false,
    displayFlowers: false,
    displayHolidays: false,
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
                      onChange={()=> {
                        //onClick set bool of parent index
                        handleOnColorChange(index);
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
                        handleOnHolidayChange(index)
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
