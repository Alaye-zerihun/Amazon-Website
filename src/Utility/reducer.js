import { Type } from "./action.type"; // ✅ correct import

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return {
          ...state,
          basket: updatedBasket,
        };
      }

    case Type.REMOVE_FROM_BASKET:
      const itemToUpdate = state.basket.find((item) => item.id === action.id);

      if (itemToUpdate) {
        if (itemToUpdate.amount > 1) {
          const updatedBasket = state.basket.map((item) =>
            item.id === action.id ? { ...item, amount: item.amount - 1 } : item
          );
          return {
            ...state,
            basket: updatedBasket,
          };
        } else {
          return {
            ...state,
            basket: state.basket.filter((item) => item.id !== action.id),
          };
        }
      }
      return state;

    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    case Type.SET_USER: // ✅ FIXED typo here
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
