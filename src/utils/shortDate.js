// Change date format

export const shortDate = (date) => {
   return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
};
