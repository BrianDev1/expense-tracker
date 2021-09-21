import React from "react";
import { Expense } from "../utils/types";
import ExpenseTracker from "../views/ExpenseTracker";

const ExpenseContainer = () => {
  return <ExpenseTracker expenses={[]} />;
};

export default ExpenseContainer;
