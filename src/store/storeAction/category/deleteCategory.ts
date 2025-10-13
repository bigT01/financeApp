import axios from "axios";
import type { StateCreator } from "zustand";
import type { IState } from "../../../constants/interface";

type StoreSet = Parameters<StateCreator<IState>>[0];
type StoreGet = Parameters<StateCreator<IState>>[1];

export const deleteCategory = async (set: StoreSet,
    get: StoreGet,
    id: number) => {
  try {
    await axios.delete(`/api/categories/${id}`);
    set({ categories: get().categories.filter(c => c.id !== id) }, false);
  } catch (err) {
    console.error(err);
  }
};
