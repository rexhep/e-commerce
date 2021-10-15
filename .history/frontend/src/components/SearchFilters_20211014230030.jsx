import React from "react";
import connect from "speedux";
import Slider from "react-slider";

export default connect(
    ({ state, globalState, dispatch }) => {
      const lowestPrice = Math.floor(Math.min(...globalState.prices));
      const highestPrice = Math.ceil(Math.max(...globalState.prices));
  
      const { priceRange = [lowestPrice, highestPrice] } = state;
  
      return (
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search by product title..."
            onChange={e => {
              dispatch("filterProductsByQuery", {
                query: e.target.value
              });
            }}
          />
  
          <div>
            <p>
              Filter by price range
              <span>
                ${priceRange[0].toFixed(2)} : ${priceRange[1].toFixed(2)}
              </span>
            </p>
  
            <Slider
              min={lowestPrice}
              max={highestPrice}
              defaultValue={[lowestPrice, highestPrice]}
              pearling
              minDistance={3}
              onAfterChange={([minValue, maxValue]) => {
                dispatch("filterProductsByPriceRange", {
                  priceRange: [minValue, maxValue]
                });
  
                document.querySelector(".thumb.active") &&
                  document.querySelector(".thumb.active").blur();
              }}
            />
          </div>
        </div>
      );
    },
  
    {
      name: "searchFilters",
  
      globalState: {
        prices: "productsGrid.products.*.price"
      },
  
      state: {
        priceRange: undefined
      },
  
      handlers: {
        filterProductsByPriceRange: action => ({
          priceRange: action.payload.priceRange
        })
      }
    }
  );