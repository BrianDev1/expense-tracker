/**
 * @param {{id: string, description: string, amount: number, createdAt: Date, updatedAt: Date}} expense
 */
const converToGqlExpense = (expense) => {
  return {
    id: expense.id,
    description: expense.description,
    amount: expense.amount,
    date: expense.createdAt,
  };
};

module.exports = converToGqlExpense;
