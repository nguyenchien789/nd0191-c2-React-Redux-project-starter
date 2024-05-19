import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Login from "../components/Login/Login";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../state/store/store";
import { _getQuestions, _getUsers } from "../_DATA";
import { getQuestionsData, getUsersData } from "../state/action/action";

describe("Login Component", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    delete window.matchMedia;
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  });
  afterEach(cleanup);
  it("Return a snapshot", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
  it("DOM TEST", async () => {
    const [users, questions] = await Promise.all([
      _getUsers(),
      _getQuestions(),
    ]);
    store.dispatch(getUsersData(users));
    store.dispatch(getQuestionsData(questions));

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();

    const username = screen.getByTestId("username");
    fireEvent.change(username, { target: { value: "sarahedo" } });
    expect(username.value).toBe("sarahedo");
  });
});
