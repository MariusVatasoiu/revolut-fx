export function getAccountsAPI() {
  const accounts = {
    EUR: { code: "EUR", balance: 10.0, label: "EURO", symbol: "€" },
    USD: { code: "USD", balance: 34.21, label: "US Dollar", symbol: "$" },
    GBP: { code: "GBP", balance: 443.22, label: "Pound Sterling", symbol: "£" },
  };

  return Promise.resolve(accounts);
}
