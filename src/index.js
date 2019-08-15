import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import scrambledReducer from "./reducers/scrambled_reducer";
import { Provider } from "react-redux";
let initalState = {
  prevWord: [],
  word: 'family',
  currPointer: -1,
  scrambledWord: null
};


const store = createStore(scrambledReducer, initalState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,document.getElementById('root')
);
