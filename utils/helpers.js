module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  formatInstitution: (institution) => {
    // format institution name
    return institution?.toLowerCase()?.replace(/ /g, '_');
  },
  firstCategory: (categories) => {
    // return first category
    return categories[0]?.toLowerCase()?.replace(/ /g, '_');
  },
  format_date_sm: (date) => {
    // Format date as MM/DD
    return date.toLocaleDateString().slice(0, -5);
  },
  format_precentage: (precentage) => {
    return (precentage * 100).toFixed(2);
  },
};
