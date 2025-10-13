import axios from "axios";
import type { StateCreator } from "zustand";
import type { IState } from "../../../constants/interface";

type StoreSet = Parameters<StateCreator<IState>>[0];
// type StoreGet = Parameters<StateCreator<IState>>[1];
export const getAllTransactions = async (
set: StoreSet
) => {
  try {
    const res = await axios.get("/transactions");
    set({ transactions: res.data }, false);
  } catch (err) {
    console.error(err);
  }
};
