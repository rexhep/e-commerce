import React from "react";
import { connect } from "speedux";
import FilterProductsComponent from "./FilterProductsComponent";

export default connect(FilterProductsComponent, {
    name: 'productsGrid',
  
    state: {
        filters: {
        query: null,
        priceRange: null
      },
      products: {}
    },
  
    actions: {
      changeFoo(value) {
        return { products: value };
      }
    },
    handlers: {
      filterProductsByQuery: action => ({
        "filters.query": action.payload.query
      }),

      filterProductsByPriceRange: action => {
          console.log('ACTION:::', action);
          return ({
            "filters.priceRange": action.payload.priceRange
          });
      }
    }
  });