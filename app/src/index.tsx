import "./index.scss";

import * as React from "react";
import * as serviceWorker from "./serviceWorker";

import { RootActions, RootState, rootReducer } from "./store";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { ThemeProvider } from "emotion-theming";
import theme from "./theme";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<RootState, RootActions>),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
