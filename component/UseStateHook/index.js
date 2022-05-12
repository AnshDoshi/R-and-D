import React, { useState } from "react";

const UseStateHook = () => {
  const [counter, setcounter] = useState(0);
  const [intialvalue, setintialvalue] = useState("ansh");

  const increment = () => {
    setcounter(counter + 1);
  };

  const decrement = () => {
    setcounter(counter - 1);
  };

  const changedvalue = (event) => {
    const newValue = event.target.value;
    setintialvalue(newValue);
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button type="button" onClick={increment}>
        increment
      </button>
      <button type="button" onClick={decrement}>
        decrement
      </button>

      <input type="text" onChange={changedvalue} />
      {intialvalue}
    </div>
  );
};

export default UseStateHook;
