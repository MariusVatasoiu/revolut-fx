export function getAccountsAPI() {
  const accounts = {
    EUR: { code: "EUR", balance: 10.0, label: "EURO", symbol: "€" },
    USD: { code: "USD", balance: 34.21, label: "US Dollar", symbol: "$" },
    GBP: { code: "GBP", balance: 443.22, label: "Pound Sterling", symbol: "£" },
  };

  return Promise.resolve(accounts);
}

export function getRateAPI(from: string, to: string) {
  if (!from || !to) return Promise.reject();

  const API_KEY = "f09c043971970998988b752b";
  return fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.conversion_rate;
    });
}
