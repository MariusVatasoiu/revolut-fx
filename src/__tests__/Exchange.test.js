import { expect, test } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducer";
import middleware from "../middleware";
import { getAccountsAPI, getRateAPI } from "../utils/api";
import { Exchange } from "../components/Exchange";
import { accountsMock, exchangeMock, rateApiMock } from "../mocks/data";

jest.mock("../utils/api");

const store = createStore(reducer, middleware);

test("should enable button for valid data", async () => {
  const mockDispatch = jest.fn();
  getAccountsAPI.mockResolvedValue(accountsMock);
  getRateAPI.mockResolvedValue(rateApiMock.conversion_rate);

  render(
    <Provider store={store}>
      <Exchange
        first={accountsMock.TEST1}
        second={accountsMock.TEST2}
        accounts={accountsMock}
        dispatch={mockDispatch}
        exchange={exchangeMock}
      />
    </Provider>
  );

  const btn = screen.getByTestId("submit-btn");
  expect(btn).toBeInTheDocument();
  expect(btn).not.toHaveAttribute("disabled");
});

test("should disable button for invalid data", async () => {
  const mockDispatch = jest.fn();
  getAccountsAPI.mockResolvedValue(accountsMock);
  getRateAPI.mockResolvedValue(rateApiMock.conversion_rate);

  render(
    <Provider store={store}>
      <Exchange
        first={accountsMock.TEST1}
        second={accountsMock.TEST2}
        accounts={accountsMock}
        dispatch={mockDispatch}
        exchange={{ ...exchangeMock, firstAmount: "" }}
      />
    </Provider>
  );

  const btn = screen.getByTestId("submit-btn");
  expect(btn).toBeInTheDocument();
  expect(btn).toHaveAttribute("disabled");
});
