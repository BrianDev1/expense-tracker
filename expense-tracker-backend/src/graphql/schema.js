const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Expense {
    id: String!
    description: String!
    amount: Int!
    date: Date!
  }

  input InputCreateExpense {
    description: String!
    amount: Int!
  }

  input InputUpdateExpense {
    id: String!
    description: String!
    amount: Int!
  }

  # Queries
  type Query {
    # Gets all expenses
    fetchExpenses: [Expense!]!
  }

  # Mutations
  type Mutation {
    # Create expense returns the created expense
    createExpense(inputCreateExpense: InputCreateExpense!): Expense!
    # Update an expense returns the updated expense
    updateExpense(inputUpdateExpense: InputUpdateExpense!): Expense!
    # Delete expense returns Id of deleted expense
    deleteExpense(id: String!): String!
  }
`;

module.exports = typeDefs;
