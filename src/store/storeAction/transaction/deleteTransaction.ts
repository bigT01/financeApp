import axios from "axios";
import type { StateCreator } from "zustand";
import type { IState } from "../../../constants/interface";

type StoreSet = Parameters<StateCreator<IState>>[0];
type StoreGet = Parameters<StateCreator<IState>>[1];
export const deleteTransaction = async (set: StoreSet,
    get: StoreGet,
    id: number) => {
  try {
    await axios.delete(`/api/transactions/${id}`);
    set({ transactions: get().transactions.filter(t => t.id !== id) }, false);
  } catch (err) {
    console.error(err);
  }
};
