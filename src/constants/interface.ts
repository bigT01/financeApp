export interface IState {
    categories: ICategory[];
    transactions: ITransaction[];
    loading: {name: "CREATE_TRANSACTION" | null, status: boolean}

    // --- CATEGORY ---
    getAllCategories: () => Promise<void>;
    createCategory: (data: Partial<ICategory>) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;

    // --- TRANSACTION ---
    getAllTransactions: () => Promise<void>;
    createTransaction: (data: Partial<ITransaction>) => Promise<void>;
    deleteTransaction: (id: number) => Promise<void>;
}

export interface ITransaction {
    id: number;
    amount: number;
    description: string;
    category: ICategory;
    createdAt: string;
}

export interface ICategory{
    id: number;
    name: string;
    type: 'expense' | 'income';
}