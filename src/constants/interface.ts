export interface IInputFinance {
    category?: string, 
    amount?: string, 
    date?: string
}

export interface IFinanceData{
    category?: string, 
    amount?: string, 
    date?: string,
    type: 'outcome' | 'income'
}