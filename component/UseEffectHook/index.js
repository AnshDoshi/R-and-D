import React, { useEffect, useState } from "react";
import axios from "axios";

const UseEffectHook = () => {
  const [data, setdata] = useState("");
  const [value, setvalue] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3001/api/projects").then((response) => {
      setdata(response.data[0].title);
      console.log("api called");
    });
  }, []);
  return (
    <div>
      <h1>hello ANSH</h1>
      <h2>{data}</h2>
      <h3>{value}</h3>
      <button
        onClick={() => {
          setvalue(value + 1);
        }}
      >
        click here{" "}
      </button>
    </div>
  );
};

export default UseEffectHook;
