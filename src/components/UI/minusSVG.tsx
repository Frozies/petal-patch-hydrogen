import React from 'react';

export const minusSVG = () => {
  return (
    <>
      {/*
                            Collapse icon, show/hide based on section open state.

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
    </>
  );
};
