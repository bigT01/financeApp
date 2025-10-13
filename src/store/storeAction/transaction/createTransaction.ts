
import type { StateCreator } from "zustand";
import type { IState, ITransaction } from "../../../constants/interface";
import axiosInstance from "../../../axios";

type StoreSet = Parameters<StateCreator<IState>>[0];
type StoreGet = Parameters<StateCreator<IState>>[1];

export const createTransaction = async (set: StoreSet,
    get: StoreGet,
    data: Partial<ITransaction>) => {
  try {
    const res = await axiosInstance.post("/transactions", data);
    set({ transactions: [...get().transactions, res.data] }, false);
  } catch (err) {
    console.error(err);
  }
};
