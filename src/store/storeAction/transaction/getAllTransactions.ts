import type { StateCreator } from "zustand";
import type { IState } from "../../../constants/interface";
import axiosInstance from "../../../axios";

type StoreSet = Parameters<StateCreator<IState>>[0];
// type StoreGet = Parameters<StateCreator<IState>>[1];
export const getAllTransactions = async (
set: StoreSet
) => {
  try {
    const res = await axiosInstance.get("/transactions");
    set({ transactions: res.data }, false);
  } catch (err) {
    console.error(err);
  }
};
