import { useSelector } from "react-redux";

export const useExpenses = () => {
  console.log(useSelector((s) => s));
  return "Hello";
};
