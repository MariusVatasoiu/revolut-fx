import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { ActionSelector } from "../components/ActionSelector";

test("shows arrow down icon for sell action", async () => {
  const mockDispatch = jest.fn();

  render(<ActionSelector dispatch={mockDispatch} exchangeAction="sell" />);
  const icon = screen.getByTestId("arrow-down");

  expect(icon).toBeInTheDocument();
});

test("shows arrow up icon for buy action", async () => {
  const mockDispatch = jest.fn();

  render(<ActionSelector dispatch={mockDispatch} exchangeAction="buy" />);
  const icon = screen.getByTestId("arrow-up");

  expect(icon).toBeInTheDocument();
});

test("click on button dispatches two actions", async () => {
  const mockDispatch = jest.fn();

  render(<ActionSelector dispatch={mockDispatch} exchangeAction="sell" />);

  const btn = screen.getByTestId("action-btn");
  btn.click();

  expect(mockDispatch).toHaveBeenCalledTimes(2);
});
