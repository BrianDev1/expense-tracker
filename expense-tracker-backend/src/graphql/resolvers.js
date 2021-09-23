const Expense = require("../model/expenses");
const converToGqlExpense = require("./service");
const resolvers = {
  Query: {
    fetchExpenses: async () => {
      try {
        const expenses = await Expense.find();
        return expenses.map(converToGqlExpense);
      } catch (error) {
        throw new Error("Unable to find expenses!");
      }
    },
  },

  Mutation: {
    createExpense: async (req, { inputCreateExpense }) => {
      const expense = new Expense({
        description: inputCreateExpense.description,
        amount: inputCreateExpense.amount,
      });

      try {
        const createdExpense = await expense.save();
        return converToGqlExpense(createdExpense);
      } catch (error) {
        throw new Error("Unable to create expense!");
      }
    },

    updateExpense: async (req, { inputUpdateExpense }) => {
      try {
        const expenseToUpdate = await Expense.findById(inputUpdateExpense.id);

        if (!expenseToUpdate) {
          throw new Error("Unable to find expense to update");
        }
        expenseToUpdate.description = inputUpdateExpense.description;
        expenseToUpdate.amount = inputUpdateExpense.amount;

        const updatedExpense = await expenseToUpdate.save();
        return converToGqlExpense(updatedExpense);
      } catch (error) {
        throw new Error("Unable to update expense!");
      }
    },

    deleteExpense: async (req, { id }) => {
      try {
        const expenseToDelete = await Expense.findById(id);

        if (!expenseToDelete) {
          throw new Error("Unable to find expense to delete");
        }
        const deletedExpense = await expenseToDelete.remove();
        return deletedExpense.id;
      } catch (error) {
        throw new Error("Unable to delete expense!");
      }
    },
  },
};

module.exports = resolvers;
