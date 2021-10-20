import React from "react";
import { connect } from 'speedux';
import Slider from "react-slider";

export default connect(
    ({ state, globalState, dispatch }) => {
        console.log('GLOBAL::', globalState);
      const lowestPrice = Math.floor(Math.min(...globalState.prices));
      const highestPrice = Math.ceil(Math.max(...globalState.prices));
      const { priceRange = [lowestPrice, highestPrice] } = state;
  
      return (
        globalState && (
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
              min={65}
              max={400}
              defaultValue={[65, 400]}
              pearling
              minDistance={3}
              onAfterChange={([minValue, maxValue]) => {
                  console.log('aftercjagme');
                dispatch("filterProductsByPriceRange", {
                  priceRange: [minValue, maxValue]
                });
  
                document.querySelector(".thumb.active") &&
                  document.querySelector(".thumb.active").blur();
              }}
            />
          </div>
        </div>
        )
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
        filterProductsByPriceRange: action => {
            console.log('action payload', action);
            return ({
                priceRange: action.payload.priceRange
              });
        }
      }
    }
  );