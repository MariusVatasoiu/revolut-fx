import { expect, test } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { Amount } from "../components/Amount";
import { accountsMock, exchangeMock } from "../mocks/data";

test("should not accept letters", async () => {
  const mockDispatch = jest.fn();

  render(
    <Amount
      amountType="firstAmount"
      action="sell"
      dispatch={mockDispatch}
      exchange={exchangeMock}
      account={accountsMock.TEST1}
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
      exchange={exchangeMock}
      account={accountsMock.TEST1}
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
      exchange={exchangeMock}
      account={accountsMock.TEST1}
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
      exchange={exchangeMock}
      account={accountsMock.TEST1}
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
      exchange={exchangeMock}
      account={accountsMock.TEST1}
    />
  );

  const input = screen.getByTestId("amount-input");
  fireEvent.change(input, { target: { value: "1" } });
  const error = screen.queryByTestId("amount-error");

  expect(error).toBeNull();
});
