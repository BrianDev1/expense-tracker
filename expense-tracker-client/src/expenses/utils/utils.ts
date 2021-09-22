import moment from "moment";

/** Constants App wide */
export const TAX_RATE = 0.15;
export const LOCALE = "en-US";
export const dateTimeOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

/** Utility Functions App wide */

/**
 * Function calculates tax for an amount
 * @param {number} amount - amount
 * @returns Tax amount
 */
export const taxAmount = (amount: number) => {
  return `${Math.round(amount * TAX_RATE * 100) / 100}`;
};

/**
 * Formats Date
 * @param {Date} date - A Date
 * @returns {string} Formatted date as string
 */
export const formatDate = (date: Date) => {
  return `${moment(date).format("YYYY-MM-dd [at] HH:mm")}`;
};
