const initialData = {
  cartCount: 0,
};
const cartReducer = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { cartCount: (state.cartCount += 2) };
    case "REMOVE_FROM_CART":
      return { cartCount: (state.cartCount -= 1) };
    default:
      return state;
  }
};
export default cartReducer;
