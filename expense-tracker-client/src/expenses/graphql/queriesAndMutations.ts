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

export interface IFetchExpensesData {
  readonly fetchExpenses: Expense[];
}

/* MUTATIONS */
// CREATE
export const createExpense = gql`
  mutation createExpense($inputCreateExpense: InputCreateExpense!) {
    createExpense(inputCreateExpense: $inputCreateExpense) {
      ...ExpenseFields
    }
  }
  ${ExpenseFragment}
`;

export interface ICreateExpense {
  readonly createExpense: Expense;
}

// UPDATE
export const updateExpense = gql`
  mutation updateExpense($inputUpdateExpense: InputUpdateExpense!) {
    updateExpense(inputUpdateExpense: $inputUpdateExpense) {
      ...ExpenseFields
    }
  }
  ${ExpenseFragment}
`;

export interface IUpdateExpense {
  readonly updateExpense: Expense;
}

// DELETE
export const deleteExpense = gql`
  mutation deleteExpense($id: String!) {
    deleteExpense(id: $id)
  }
`;

export interface IDeleteExpense {
  readonly deleteExpense: string;
}
