import React from "react";
import { connect } from "speedux";

export default connect(
  ({ state, globalState, dispatch }) => {
    let filteredProducts = state.products.sort((a, b) => a.price - b.price);

    if (state.filters.query) {
      filteredProducts = filteredProducts.filter(product => {
        return product.title
          .toLowerCase()
          .includes(state.filters.query.toLowerCase());
      });
    }

    if (state.filters.priceRange) {
      const [minPrice, maxPrice] = state.filters.priceRange;
      filteredProducts = filteredProducts.filter(product => {
        return product.price >= minPrice && product.price <= maxPrice;
      });
    }

    return (
      <ol className="products-grid">
        {filteredProducts.map(product => {
          const { itemsInCart } = globalState;
          const itemIsInCart = itemsInCart.includes(product.id);

          return (
            <li key={product.id} data-in-cart={itemIsInCart}>
              <button
                type="button"
                onClick={() => {
                  if (!itemIsInCart) {
                    dispatch("shoppingCart.addItemToCart", { item: product });
                  }
                }}
              >
                <img src={`/products/${product.image}`} alt={product.title} />

                <span>
                  <span
                    className={`fa fa-${
                      itemIsInCart ? "check" : "shopping-cart"
                    }`}
                  />
                  {itemIsInCart ? "In Cart" : "Add to Cart"}
                </span>
              </button>

              <h1>{product.title}</h1>

              <p>${product.price}</p>
            </li>
          );
        })}
      </ol>
    );
  },

  {
    name: "productsGrid",

    globalState: {
      itemsInCart: "shoppingCart.items.*.id"
    },

    state: {
      filters: {
        query: null,
        priceRange: null
      },
      products: [
        {
          id: 0,
          title: "Broom with Dust Pan",
          image: "1.jpg",
          price: 10
        },
        {
          id: 1,
          title: "Interesting Book",
          image: "2.jpg",
          price: 15
        },
        {
          id: 2,
          title: "Wood Puzzle",
          image: "3.jpg",
          price: 12
        },
        {
          id: 3,
          title: "Beanie",
          image: "4.jpg",
          price: 29
        },
        {
          id: 4,
          title: "Black T-Shirt",
          image: "5.jpg",
          price: 9.99
        },
        {
          id: 5,
          title: "Headset",
          image: "6.jpg",
          price: 65
        },
        {
          id: 6,
          title: "Alarm Clock",
          image: "7.jpg",
          price: 20
        },
        {
          id: 7,
          title: "Sunglasses",
          image: "8.jpg",
          price: 140
        },
        {
          id: 8,
          title: "Jeans",
          image: "9.jpg",
          price: 79.99
        },
        {
          id: 9,
          title: "Sneakers",
          image: "10.jpg",
          price: 150
        },
        {
          id: 10,
          title: "Honey Packaging",
          image: "11.jpg",
          price: 42
        },
        {
          id: 11,
          title: "Belt",
          image: "12.jpg",
          price: 8.99
        }
      ]
    },

    handlers: {
      filterProductsByQuery: action => ({
        "filters.query": action.payload.query
      }),

      filterProductsByPriceRange: action => ({
        "filters.priceRange": action.payload.priceRange
      })
    }
  }
);