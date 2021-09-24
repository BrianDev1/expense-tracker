import { gql } from "@apollo/client";
import { Expense } from "../utils/types";

// Fragment for code reusability
export const ExpenseFragment = gql`
  fragment ExpenseFields on Expense {
    id
    description
    amount
    date
  }
`;

/* QUERIES */
export const fetchExpenses = gql`
  query fetchExpenses {
    fetchExpenses {
      ...ExpenseFields
    }
  }
  ${ExpenseFragment}
`;
// Return Data interface
export interface IFetchExpensesData {
  readonly fetchExpenses: Expense[];
}

/* MUTATIONS */
export const createExpense = gql`
  mutation createExpense($inputCreateExpense: InputCreateExpense!) {
    createExpense(inputCreateExpense: $inputCreateExpense) {
      ...ExpenseFields
    }
  }
  ${ExpenseFragment}
`;

// Return Data interface
export interface ICreateExpense {
  readonly createExpense: Expense;
}

export const updateExpense = gql`
  mutation updateExpense($inputUpdateExpense: InputUpdateExpense!) {
    updateExpense(inputUpdateExpense: $inputUpdateExpense) {
      ...ExpenseFields
    }
  }
  ${ExpenseFragment}
`;

// Return Data interface
export interface IUpdateExpense {
  readonly updateExpense: Expense;
}

export const deleteExpense = gql`
  mutation deleteExpense($id: String!) {
    deleteExpense(id: $id)
  }
`;

// Return Data interface
export interface IDeleteExpense {
  readonly deleteExpense: string;
}
