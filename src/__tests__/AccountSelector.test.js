import { expect, test } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { AccountSelector } from "../components/AccountSelector";

const accounts = {
  TEST1: { code: "TEST1", balance: 12, label: "TEST1", symbol: "test1" },
  TEST2: { code: "TEST2", balance: 5, label: "TEST2", symbol: "test2" },
  TEST3: { code: "TEST3", balance: 7, label: "TEST3", symbol: "test3" },
};

const initialAccount = accounts.TEST1;

test("should render all accounts", async () => {
  const mockDispatch = jest.fn();

  render(
    <AccountSelector
      dispatch={mockDispatch}
      accounts={accounts}
      initialAccount={initialAccount}
    />
  );
  const option1 = screen.getByText(/TEST1/);
  const option2 = screen.getByText(/TEST2/);
  const option3 = screen.getByText(/TEST3/);

  expect(option1).toBeInTheDocument();
  expect(option2).toBeInTheDocument();
  expect(option3).toBeInTheDocument();
});

test("should update the store when mounted", async () => {
  const mockDispatch = jest.fn();
  render(
    <AccountSelector
      dispatch={mockDispatch}
      accounts={accounts}
      initialAccount={initialAccount}
    />
  );
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});

test("should update the store when account is changed", async () => {
  const mockDispatch = jest.fn();
  render(
    <AccountSelector
      dispatch={mockDispatch}
      accounts={accounts}
      initialAccount={initialAccount}
    />
  );

  const select = screen.getByTestId("account-selector");
  fireEvent.change(select, { target: { value: accounts.TEST2.code } });
  expect(mockDispatch).toHaveBeenCalledTimes(4);
});
