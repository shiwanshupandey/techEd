const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { _id, product } = action.payload;

    let existingProduct = state.cart.find(
      (curItem) => curItem._id === _id
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem._id === _id ) {
          return {
            ...curElem,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct = {
        _id: _id ,
        name: product.name,
        image: product.image,
        price: product.price,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }


  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem._id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "CART_ITEM_PRICE_TOTAL") {
    if (!state.cart) {
      state.cart = []; 
    }
  
    let { total_item, total_price } = state.cart.reduce(
      (accum, curElem) => {
        let { price, amount } = curElem;
  
        accum.total_item += amount;
        accum.total_price += price;
  
        return accum;
      },
      {
        total_item: 0,
        total_price: 0,
      }
    );
  
    return {
      ...state,
      total_item,
      total_price,
    };
  }
  

  return state;
};

export default cartReducer;

