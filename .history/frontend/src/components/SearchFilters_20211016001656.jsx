import React from "react";
import { connect } from 'speedux';
import Slider from "react-slider";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/core";
import Container from '@mui/material/Container';

const useStyles = makeStyles((theme) => {
  console.log('THEMELL', theme);
  return ({
    filterText: {
      fontSize: theme
    }
  });
});

export default connect(
    ({ state, globalState, dispatch }) => {
      const lowestPrice = Math.floor(Math.min(...globalState.prices));
      const highestPrice = Math.ceil(Math.max(...globalState.prices));
      const { priceRange = [lowestPrice, highestPrice] } = state;
      const classess = useStyles();
  
      return (
        globalState && (
        <Container>
          <Box>
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
              <p className={classess.filterText}>
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
          </Box>
        </Container>
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