import React, { useRef } from "react";

const UseRefHook = () => {
  const inputRef = useRef(null);

  const onClick = () => {
    inputRef.current.value = "";
  };

  return (
    <div>
      <h1>hii ansh</h1>
      <input type="text" placeholder="write something... " ref={inputRef} />
      <button type="button" onClick={onClick}>
        click here
      </button>
    </div>
  );
};

export default UseRefHook;
