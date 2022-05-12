import { data } from "autoprefixer";
import Head from "next/head";
import Image from "next/image";
import react, { createRef, useState, useEffect } from "react";

import UseStateHook from "../component/UseStateHook";

export default function Home() {
  const [dataList, setdataList] = useState([]);
  const [status, setstatus] = useState("all");

  useEffect(() => {}, []);

  const inputValue = createRef();

  const toggle = (x, index) => {
    console.log("toggle");
    setdataList([
      ...dataList.slice(0, index),
      { ...x, completed: true },
      ...dataList.slice(index + 1),
    ]);
  };

  const deletetodo = (x, index) => {
    console.log("delete");
    setdataList([...dataList.slice(0, index), ...dataList.slice(index + 1)]);
  };

  const addtodo = (event) => {
    event.preventDefault();

    if (inputValue.current.value.trim()) {
      setdataList(
        [...dataList, { text: inputValue.current.value, completed: false }],
        (inputValue.current.value = "")
      );
    }
  };
  console.log(dataList);

  // console.log("statuscall", event.nativeEvent.target.name);

  let filterArray = dataList.filter((x) => {
    switch (status) {
      case "all":
        return x;
      case "completed":
        return x.completed;

      case "pending":
        return !x.completed;

      default:
        return x;
    }
  });

  return (
    <div className="h-screen bg-gray-100">
      <h1 className="text-blue-700">Todo App</h1>
      <form onSubmit={addtodo}>
        <input type="text" ref={inputValue} placeholder="write something..." />
        <button type="button" onClick={addtodo}>
          Submit
        </button>
      </form>
      {filterArray.map((x, index) => {
        return (
          <div key={index} className="flex gap-7">
            <button
              type="button"
              onClick={() => {
                toggle(x, index);
              }}
            >
              done
            </button>
            <p className="m-7">{x.text}</p>
            <button
              type="button"
              onClick={() => {
                deletetodo(x, index);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
      <div>
        <button className="m-5" onClick={() => setstatus("all")} name="all">
          all
        </button>
        <button
          className="m-5"
          onClick={() => setstatus("completed")}
          name="completed"
        >
          completed
        </button>
        <button
          className="m-5"
          onClick={() => setstatus("pending")}
          name="pending"
        >
          pending
        </button>
      </div>
    </div>
  );
}
