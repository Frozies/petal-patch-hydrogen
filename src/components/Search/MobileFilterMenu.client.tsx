export default function MobileFilterMenuClient() {
  return (
    <>
      {/*Off-canvas menu overlay, show/hide based on off-canvas menu state.

              Entering: "transition-opacity ease-linear duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "transition-opacity ease-linear duration-300"
                From: "opacity-100"
                To: "opacity-0"*/}
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        aria-hidden="true"
      ></div>{' '}

      {/*
       OVERLAY
       Off-canvas menu, show/hide based on off-canvas menu state.

              Entering: "transition ease-in-out duration-300 transform"
                From: "translate-x-full"
                To: "translate-x-0"
              Leaving: "transition ease-in-out duration-300 transform"
                From: "translate-x-0"
                To: "translate-x-full"*/}
      <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
        <div className="px-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          <button
            type="button"
            className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
          >
            <span className="sr-only">Close menu</span>
            Heroicon name: outline/x
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        Filters
        <form className="mt-4 border-t border-gray-200">
          <h3 className="sr-only">Categories</h3>
          <ul role="list" className="font-medium text-gray-900 px-2 py-3">
            <li>
              <a href="#" className="block px-2 py-3">
                {' '}
                Totes{' '}
              </a>
            </li>

            <li>
              <a href="#" className="block px-2 py-3">
                {' '}
                Backpacks{' '}
              </a>
            </li>

            <li>
              <a href="#" className="block px-2 py-3">
                {' '}
                Travel Bags{' '}
              </a>
            </li>

            <li>
              <a href="#" className="block px-2 py-3">
                {' '}
                Hip Bags{' '}
              </a>
            </li>

            <li>
              <a href="#" className="block px-2 py-3">
                {' '}
                Laptop Sleeves{' '}
              </a>
            </li>
          </ul>

          <div className="border-t border-gray-200 px-4 py-6">
            <h3 className="-mx-2 -my-3 flow-root">
              Expand/collapse section button
              <button
                type="button"
                className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
                aria-controls="filter-section-mobile-0"
                aria-expanded="false"
              >
                <span className="font-medium text-gray-900"> Color </span>
                <span className="ml-6 flex items-center">
                  {/* Expand icon, show/hide based on section open state.

                    Heroicon name: solid/plus-sm*/}

                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/* Collapse icon, show/hide based on section open state.

                          Heroicon name: solid/minus-sm*/}

                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            Filter section, show/hide based on section state.
            <div className="pt-6" id="filter-section-mobile-0">
              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    id="filter-mobile-color-0"
                    name="color[]"
                    value="white"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-color-0"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    White{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-color-1"
                    name="color[]"
                    value="beige"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-color-1"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    Beige{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-color-2"
                    name="color[]"
                    value="blue"
                    type="checkbox"
                    checked
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-color-2"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    Blue{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-color-3"
                    name="color[]"
                    value="brown"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-color-3"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    Brown{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-color-4"
                    name="color[]"
                    value="green"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-color-4"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    Green{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-color-5"
                    name="color[]"
                    value="purple"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-color-5"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    Purple{' '}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6">
            <h3 className="-mx-2 -my-3 flow-root">
              Expand/collapse section button
              <button
                type="button"
                className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
                aria-controls="filter-section-mobile-1"
                aria-expanded="false"
              >
                <span className="font-medium text-gray-900"> Category </span>
                <span className="ml-6 flex items-center">
                  {/*Expand icon, show/hide based on section open state.

                    Heroicon name: solid/plus-sm*/}

                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/*Collapse icon, show/hide based on section open state.

                          Heroicon name: solid/minus-sm
*/}
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            {/*  Filter section, show/hide based on section state.*/}
            <div className="pt-6" id="filter-section-mobile-1">
              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    id="filter-mobile-category-0"
                    name="category[]"
                    value="new-arrivals"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-category-0"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    New Arrivals{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-category-1"
                    name="category[]"
                    value="sale"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-category-1"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    Sale{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-category-2"
                    name="category[]"
                    value="travel"
                    type="checkbox"
                    checked
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-category-2"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    Travel{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-category-3"
                    name="category[]"
                    value="organization"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-category-3"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    Organization{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-category-4"
                    name="category[]"
                    value="accessories"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-category-4"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    Accessories{' '}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6">
            <h3 className="-mx-2 -my-3 flow-root">
              {/*Expand/collapse section button*/}
              <button
                type="button"
                className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
                aria-controls="filter-section-mobile-2"
                aria-expanded="false"
              >
                <span className="font-medium text-gray-900"> Size </span>
                <span className="ml-6 flex items-center">
                  {/*Expand icon, show/hide based on section open state.

                    Heroicon name: solid/plus-sm*/}

                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/*Collapse icon, show/hide based on section open state.

                          Heroicon name: solid/minus-sm*/}

                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            Filter section, show/hide based on section state.
            <div className="pt-6" id="filter-section-mobile-2">
              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    id="filter-mobile-size-0"
                    name="size[]"
                    value="2l"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-size-0"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    2L{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-size-1"
                    name="size[]"
                    value="6l"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-size-1"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    6L{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-size-2"
                    name="size[]"
                    value="12l"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-size-2"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    12L{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-size-3"
                    name="size[]"
                    value="18l"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-size-3"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    18L{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-size-4"
                    name="size[]"
                    value="20l"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-size-4"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    20L{' '}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-mobile-size-5"
                    name="size[]"
                    value="40l"
                    type="checkbox"
                    checked
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-mobile-size-5"
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {' '}
                    40L{' '}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}