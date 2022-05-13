import react, { createRef, useState, useEffect } from "react";
import Button from "../Button";

export default function Todo() {
  const [dataList, setdataList] = useState([]);
  const [status, setstatus] = useState("all");
  const [searchItem, setsearchItem] = useState("");

  useEffect(() => {}, []);

  const inputValue = createRef();

  const toggle = (x, index) => {
    console.log("toggle");
    setdataList([
      ...dataList.slice(0, index),
      { ...x, completed: !x?.completed },
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
  // console.log(dataList);

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

  // const search=(event)=>{
  //   setsearchItem(event.target.value)
  // }

  return (
    <div>
      <h1 className="text-blue-700 text-center m-5 underline  text-4xl">
        Todo App
      </h1>
      <form onSubmit={addtodo}>
        <div className="flex justify-center">
          <input
            type="text"
            ref={inputValue}
            placeholder="write something..."
          />
          <Button title="Submit" onClick={addtodo} />
        </div>
      </form>
      <div className="flex m-5 justify-center">
        <input
          type="text"
          placeholder="Search here..."
          onChange={(event) => {
            setsearchItem(event.target.value);
          }}
        />
      </div>
      {filterArray
        ?.filter((x) => {
          if (searchItem == "") {
            return x;
          } else if (x.text.toLowerCase().includes(searchItem.toLowerCase())) {
            return x;
          }
        })
        ?.map((x, index) => {
          return (
            <div key={index} className="flex gap-7 justify-center ">
              <Button
                title={x.completed ? "undo" : "done"}
                onClick={() => {
                  toggle(x, index);
                }}
              />

              <p className="m-7">{x.text}</p>

              <Button
                title="DELETE"
                onClick={() => {
                  deletetodo(x, index);
                }}
              />
            </div>
          );
        })}
      <div className="flex justify-center">
        <Button title="ALL" onClick={() => setstatus("all")} name="all" />
        <Button
          title="completed"
          onClick={() => setstatus("completed")}
          name="completed"
        />

        <Button
          title="pending"
          onClick={() => setstatus("pending")}
          name="pending"
        />
      </div>
    </div>
  );
}
