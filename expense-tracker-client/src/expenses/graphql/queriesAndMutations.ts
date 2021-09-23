import { gql } from "@apollo/client";

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
  mutation deleteExpense($deleteExpenseId: String!) {
    deleteExpense(id: $deleteExpenseId)
  }
`;
