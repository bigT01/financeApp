import { create } from "zustand/react";
import { devtools, persist } from "zustand/middleware";
import type { ICategory, IState, ITransaction } from "../constants/interface";
import { getAllCategories } from "./storeAction/category/getAllCategories";
import { createCategory } from "./storeAction/category/createCategory";
import { deleteCategory } from "./storeAction/category/deleteCategory";
import { getAllTransactions } from "./storeAction/transaction/getAllTransactions";
import { createTransaction } from "./storeAction/transaction/createTransaction";
import { deleteTransaction } from "./storeAction/transaction/deleteTransaction";

export const useStore = create<IState>()(
  devtools(
    persist(
      (set, get) => ({
        categories: [],
        transactions: [],
        // --- category actions ---
        getAllCategories: () => getAllCategories(set),
        createCategory: (data: Partial<ICategory>) => createCategory(set, get, data),
        deleteCategory: (id: number) => deleteCategory(set, get, id),

        // --- transaction actions ---
        getAllTransactions: () => getAllTransactions(set),
        createTransaction: (data: Partial<ITransaction>) => createTransaction(set, get, data),
        deleteTransaction: (id: number) => deleteTransaction(set, get, id),
      }),
      { name: "budget-storage" }
    )
  )
);
