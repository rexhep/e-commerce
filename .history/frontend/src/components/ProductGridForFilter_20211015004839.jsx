import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { connect } from "speedux";
import TestProductComponents from "./TestProductComponents";
import { testUser } from './productUtils';

console.log('testUser', testUser);

export default connect(TestProductComponents, {
    name: 'testProductComponent',
  
    state: {},
  
    actions: {
      changeFoo() {
        return { testUser };
      }
    }
  });

// export default connect(
//   ({ state, globalState, dispatch }) => {
//     let filteredProducts = state.products.sort((a, b) => a.price - b.price);

//     if (state.filters.query) {
//       filteredProducts = filteredProducts.filter(product => {
//         return product.title
//           .toLowerCase()
//           .includes(state.filters.query.toLowerCase());
//       });
//     }

//     if (state.filters.priceRange) {
//       const [minPrice, maxPrice] = state.filters.priceRange;
//       filteredProducts = filteredProducts.filter(product => {
//         return product.price >= minPrice && product.price <= maxPrice;
//       });
//     }

//     return (
//       <ol className="products-grid">
//         {filteredProducts.map(product => {
//           const { itemsInCart } = globalState;
//           const itemIsInCart = itemsInCart.includes(product.id);

//           return (
//             <li key={product.id} data-in-cart={itemIsInCart}>
//               <button
//                 type="button"
//                 onClick={() => {
//                   if (!itemIsInCart) {
//                     dispatch("shoppingCart.addItemToCart", { item: product });
//                   }
//                 }}
//               >
//                 <img src={`/images/${product.image}`} alt={product.title} />

//                 <span>
//                   <span
//                     className={`fa fa-${
//                       itemIsInCart ? "check" : "shopping-cart"
//                     }`}
//                   />
//                   {itemIsInCart ? "In Cart" : "Add to Cart"}
//                 </span>
//               </button>

//               <h1>{product.title}</h1>

//               <p>${product.price}</p>
//             </li>
//           );
//         })}
//       </ol>
//     );
//   },

//   {
//     name: "productsGrid",

//     globalState: {
//       itemsInCart: "shoppingCart.items.*.id"
//     },

//     state: {
//       filters: {
//         query: null,
//         priceRange: null
//       },
//       products: [
//         {
//           id: 0,
//           title: "Broom with Dust Pan",
//           image: "p1.jpg",
//           price: 10
//         },
//         {
//           id: 1,
//           title: "Interesting Book",
//           image: "p2.jpg",
//           price: 15
//         },
//         {
//           id: 2,
//           title: "Wood Puzzle",
//           image: "p3.jpg",
//           price: 12
//         },
//         {
//           id: 3,
//           title: "Beanie",
//           image: "p4.jpg",
//           price: 29
//         },
//         {
//           id: 4,
//           title: "Black T-Shirt",
//           image: "p5.jpg",
//           price: 9.99
//         },
//         {
//           id: 5,
//           title: "Headset",
//           image: "p6.jpg",
//           price: 65
//         },
//         {
//           id: 6,
//           title: "Alarm Clock",
//           image: "p67.jpg",
//           price: 20
//         }
//       ]
//     },

//     handlers: {
//       filterProductsByQuery: action => ({
//         "filters.query": action.payload.query
//       }),

//       filterProductsByPriceRange: action => ({
//         "filters.priceRange": action.payload.priceRange
//       })
//     }
//   }
// );