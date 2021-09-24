import { gql } from "@apollo/client";
import { Expense } from "../utils/types";

// Graphql Fragment for code reusability
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

/* MUTATIONS */
export const createExpense = gql`
  mutation createExpense($inputCreateExpense: InputCreateExpense!) {
    createExpense(inputCreateExpense: $inputCreateExpense) {
      ...ExpenseFields
    }
  }
  ${ExpenseFragment}
`;

export const updateExpense = gql`
  mutation updateExpense($inputUpdateExpense: InputUpdateExpense!) {
    updateExpense(inputUpdateExpense: $inputUpdateExpense) {
      ...ExpenseFields
    }
  }
  ${ExpenseFragment}
`;

export const deleteExpense = gql`
  mutation deleteExpense($id: String!) {
    deleteExpense(id: $id)
  }
`;

/* Query / Mutation return interfaces */

export interface IFetchExpensesData {
  readonly fetchExpenses: Expense[];
}

export interface ICreateExpense {
  readonly createExpense: Expense;
}

export interface IUpdateExpense {
  readonly updateExpense: Expense;
}

export interface IDeleteExpense {
  readonly deleteExpense: string;
}
