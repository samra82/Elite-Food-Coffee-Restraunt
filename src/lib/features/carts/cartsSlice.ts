'use client';

import { compareArrays } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Discount = {
  amount: number;
  percentage: number;
};

const calcAdjustedPrice = (price: number, discount: Discount): number => {
  if (discount.percentage > 0) {
    return Math.round(price - (price * discount.percentage) / 100);
  } else if (discount.amount > 0) {
    return Math.round(price - discount.amount);
  }
  return price;
};

export type RemoveCartItem = {
  id: number;
  attributes: string[];
};

export type CartItem = {
  id: number;
  name: string;
  srcUrl: string;
  price: number;
  attributes: string[];
  discount: Discount;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

interface CartsState {
  cart: Cart | null;
  totalPrice: number;
  adjustedTotalPrice: number;
  action: "update" | "add" | "delete" | null;
}

const initialState: CartsState = {
  cart: null,
  totalPrice: 0,
  adjustedTotalPrice: 0,
  action: null,
};

export const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, attributes, quantity, price, discount } = action.payload;

      if (state.cart === null) {
        state.cart = {
          items: [action.payload],
          totalQuantities: quantity,
        };
        state.totalPrice = price * quantity;
        state.adjustedTotalPrice = calcAdjustedPrice(price, discount) * quantity;
        return;
      }

      const isItemInCart = state.cart.items.find(
        (item) =>
          id === item.id && compareArrays(attributes, item.attributes)
      );

      if (isItemInCart) {
        state.cart.items = state.cart.items.map((item) =>
          item.id === id && compareArrays(item.attributes, attributes)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        state.cart.items.push(action.payload);
      }

      state.cart.totalQuantities += quantity;
      state.totalPrice += price * quantity;
      state.adjustedTotalPrice += calcAdjustedPrice(price, discount) * quantity;
    },

    removeCartItem: (state, action: PayloadAction<RemoveCartItem>) => {
      if (!state.cart) return;

      const { id, attributes } = action.payload;
      const isItemInCart = state.cart.items.find(
        (item) =>
          id === item.id && compareArrays(attributes, item.attributes)
      );

      if (isItemInCart) {
        state.cart.items = state.cart.items
          .map((item) =>
            item.id === id && compareArrays(item.attributes, attributes)
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);

        state.cart.totalQuantities -= 1;
        state.totalPrice -= isItemInCart.price;
        state.adjustedTotalPrice -= calcAdjustedPrice(
          isItemInCart.price,
          isItemInCart.discount
        );
      }
    },

    remove: (
      state,
      action: PayloadAction<RemoveCartItem & { quantity: number }>
    ) => {
      if (!state.cart) return;

      const { id, attributes } = action.payload;
      const isItemInCart = state.cart.items.find(
        (item) =>
          id === item.id && compareArrays(attributes, item.attributes)
      );

      if (!isItemInCart) return;

      state.cart.items = state.cart.items.filter(
        (item) =>
          !(item.id === id && compareArrays(item.attributes, attributes))
      );

      state.cart.totalQuantities -= isItemInCart.quantity;
      state.totalPrice -= isItemInCart.price * isItemInCart.quantity;
      state.adjustedTotalPrice -=
        calcAdjustedPrice(isItemInCart.price, isItemInCart.discount) *
        isItemInCart.quantity;
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; attributes: string[]; quantity: number }>
    ) => {
      if (!state.cart) return;

      const { id, attributes, quantity } = action.payload;
      const isItemInCart = state.cart.items.find(
        (item) =>
          id === item.id && compareArrays(attributes, item.attributes)
      );

      if (!isItemInCart) return;

      const oldQuantity = isItemInCart.quantity;
      const newQuantity = quantity;

      state.cart.items = state.cart.items.map((item) =>
        item.id === id && compareArrays(item.attributes, attributes)
          ? { ...item, quantity }
          : item
      );

      state.cart.totalQuantities += newQuantity - oldQuantity;
      state.totalPrice += isItemInCart.price * (newQuantity - oldQuantity);
      state.adjustedTotalPrice +=
        calcAdjustedPrice(isItemInCart.price, isItemInCart.discount) *
        (newQuantity - oldQuantity);
    },
  },
});

export const { addToCart, removeCartItem, remove, updateCartItemQuantity } =
  cartsSlice.actions;

export default cartsSlice.reducer;