/**
 * Converts database schema type to GQL type
 * @param {{id: string, description: string, amount: number, createdAt: Date, updatedAt: Date}} expense
 * @returns Formatted expense GQL type for frontend
 */
const converToGqlExpense = (expense) => {
  return {
    id: expense.id,
    description: expense.description,
    amount: expense.amount,
    date: expense.updatedAt,
  };
};

module.exports = converToGqlExpense;
