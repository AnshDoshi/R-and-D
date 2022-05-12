import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "Increment":
      return { count: state.count + 1, showText: state.showText };
    case "toggle":
      return {
        count: state.count,
        showText: !state.showText,
      };
    default:
      return state;
  }
};

const UseReducerHook = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, showText: true });
  return (
    <div>
      <h1>{state.count}</h1>
      <button
        onClick={() => {
          dispatch({ type: "Increment" });
          dispatch({ type: "toggle" });
        }}
      >
        click here
      </button>
      {state.showText && <a>just bring it bro</a>}
    </div>
  );
};

export default UseReducerHook;
