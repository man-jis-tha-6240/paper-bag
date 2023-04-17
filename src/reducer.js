export const initialState = {
	cart: [],
	user: null,
	address: [],
};
export const getCartTotal = (cart) => cart.reduce((amount, item) => amount + item.price, 0);
const reducer = (state, action) => {
	console.log(action)
	switch (action.type) {
		case "ADD_TO_CART":
			return {
				...state,
				cart: [...state.cart, action.item]
			};
		case "REMOVE_FROM_CART":
			const index = state.cart.findIndex(
				(cartItem) => cartItem.id === action.id
			);

			let newCart = [...state.cart];

			if (index >= 0) {
				newCart.splice(index, 1);
			} else {
				alert('No items in cart');
			}

			return {
				...state,
				cart: newCart,
			};
		case "SET_ADDRESS":
			return {
				...state,
				address: { ...action.item },
			}
		case "SET_USER":
			return {
				...state,
				user: action.user
			};
		case "EMPTY_CART":
			return {
				...state,
				cart: []
			}
		default:
			return state;
	}

};
export default reducer;