const resolvers = {
  Query: {
    fetchExpenses: async () => {
      return [
        { _id: 1, description: "Hello", amount: 5, date: new Date() },
        { _id: 2, description: "Test", amount: 10, date: new Date() },
        { _id: 3, description: "Again", amount: 20, date: new Date() },
      ];
      //   try {
      //     // Fetch all expenses
      //   } catch (error) {
      //     //Handle Error
      //   }
    },
  },

  Mutation: {
    createExpense: async (req, { inputCreateExpense }) => {
      console.log(inputCreateExpense);
      return {
        _id: 1,
        description: inputCreateExpense.description,
        amount: inputCreateExpense.amount,
        date: new Date(),
      };
      // try {
      //   // Fetch all expenses
      // } catch (error) {
      //   //Handle Error
      // }
    },
  },
};

module.exports = resolvers;
