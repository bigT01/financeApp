import axios from "axios";
import type { StateCreator } from "zustand";
import type { ICategory, IState } from "../../../constants/interface";

type StoreSet = Parameters<StateCreator<IState>>[0];
type StoreGet = Parameters<StateCreator<IState>>[1];


export const createCategory = async (
    set: StoreSet,
    get: StoreGet,
    data: Partial<ICategory>
) => {
  try {
    const res = await axios.post("/api/categories", data);
    set({ categories: [...get().categories, res.data] }, false);
  } catch (err) {
    console.error(err);
  }
};
