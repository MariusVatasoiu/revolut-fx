import { expect, test } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { Amount } from "../components/Amount";

const accounts = {
  TEST1: { code: "TEST1", balance: 12, label: "TEST1", symbol: "test1" },
  TEST2: { code: "TEST2", balance: 5, label: "TEST2", symbol: "test2" },
  TEST3: { code: "TEST3", balance: 7, label: "TEST3", symbol: "test3" },
};

const exchange = {
  exchangeAction: "sell",
  exchangeLastUpdated: "firstAmount",
  exchangeRate: 1.1796,
  firstAccount: "TEST1",
  firstAmount: "10",
  firstAmountError: false,
  secondAccount: "TEST2",
  secondAmount: "11.80",
};

test("should not accept letters", async () => {
  const mockDispatch = jest.fn();

  render(
    <Amount
      amountType="firstAmount"
      action="sell"
      dispatch={mockDispatch}
      exchange={exchange}
      account={accounts.TEST1}
    />
  );

  const input = screen.getByTestId("amount-input");
  fireEvent.change(input, { target: { value: "12ab3" } });

  expect(input.value).toBe("- 123");
});

test("should accept only two decimals", async () => {
  const mockDispatch = jest.fn();

  render(
    <Amount
      amountType="firstAmount"
      action="sell"
      dispatch={mockDispatch}
      exchange={exchange}
      account={accounts.TEST1}
    />
  );

  const input = screen.getByTestId("amount-input");
  fireEvent.change(input, { target: { value: "123.123" } });

  expect(input.value).toBe("- 123.12");
});

test("should display the correct sign", async () => {
  const mockDispatch = jest.fn();

  render(
    <Amount
      amountType="firstAmount"
      action="buy"
      dispatch={mockDispatch}
      exchange={exchange}
      account={accounts.TEST1}
    />
  );

  const input = screen.getByTestId("amount-input");
  fireEvent.change(input, { target: { value: "123" } });

  expect(input.value).toBe("+ 123");
});

test("should show error for insufficient balance", async () => {
  const mockDispatch = jest.fn();

  render(
    <Amount
      amountType="firstAmount"
      action="sell"
      dispatch={mockDispatch}
      exchange={exchange}
      account={accounts.TEST1}
    />
  );

  const input = screen.getByTestId("amount-input");
  fireEvent.change(input, { target: { value: "123" } });
  const error = screen.getByTestId("amount-error");

  expect(error).toBeInTheDocument();
});

test("should not show error for sufficient balance", async () => {
  const mockDispatch = jest.fn();

  render(
    <Amount
      amountType="firstAmount"
      action="sell"
      dispatch={mockDispatch}
      exchange={exchange}
      account={accounts.TEST1}
    />
  );

  const input = screen.getByTestId("amount-input");
  fireEvent.change(input, { target: { value: "1" } });
  const error = screen.queryByTestId("amount-error");

  expect(error).toBeNull();
});
