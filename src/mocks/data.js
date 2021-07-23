export const accountsMock = {
  TEST1: { code: "TEST1", balance: 12, label: "TEST1", symbol: "test1" },
  TEST2: { code: "TEST2", balance: 5, label: "TEST2", symbol: "test2" },
  TEST3: { code: "TEST3", balance: 7, label: "TEST3", symbol: "test3" },
};

export const exchangeMock = {
  exchangeAction: "sell",
  exchangeLastUpdated: "firstAmount",
  exchangeRate: 1.1743,
  firstAccount: "TEST1",
  firstAmount: "10",
  firstAmountError: false,
  secondAccount: "TEST2",
  secondAmount: "11.80",
};

export const rateApiMock = {
  result: "success",
  documentation: "https://www.exchangerate-api.com/docs",
  terms_of_use: "https://www.exchangerate-api.com/terms",
  time_last_update_unix: 1626998401,
  time_last_update_utc: "Fri, 23 Jul 2021 00:00:01 +0000",
  time_next_update_unix: 1627084801,
  time_next_update_utc: "Sat, 24 Jul 2021 00:00:01 +0000",
  base_code: "TEST1",
  target_code: "TEST2",
  conversion_rate: 1.1796,
};
