import React, { useState, useEffect } from "react";
// import { create } from "yup/lib/Reference";
import axios from "../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import EditForm from "../EditForm";

import Button from "../Button";

const About = () => {
  const [data, setdata] = useState([]);
  const [id, setid] = useState(0);

  // const editName = createRef();
  // const editMail = createRef();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/form")
      .then((response) => {
        setdata(response?.data);
      })
      .catch((err) => console.log("error useeffect about", err));
  }, []);
  console.log("data", data);

  const toggleTodo = (x, index) => {
    // console.log(index);
    // navigate("/editform:id" + x.id);
    navigate(`/editform/${x.id}`, { state: x });

    // axios
    //   .put(`${"/form/" + x.id}`, { ...x, edit: true })
    //   .then((response) =>
    //     setdata([
    //       ...data.slice(0, index),
    //       { ...x, edit: true },
    //       ...data.slice(index + 1),
    //     ])
    //   );
  };

  const deleteTodo = (x, index) => {
    console.log("delete todo called");
    axios
      .delete(`${"/form/" + x.id}`)
      .then((response) =>
        setdata([...data.slice(0, index), ...data.slice(index + 1)])
      );
  };

  // deleteConfirmButton(x, index

  // const editNameInput = (index, x) => {
  //   axios
  //     .put(`${"/form/" + x.id}`, {
  //       name: editName.current.value,

  //       ...x,
  //     })
  //     .then((response) =>
  //       setdata([
  //         ...data.slice(0, index),
  //         { name: editName.current.value, ...x },
  //         ...data.slice(index + 1),
  //       ])
  //     );
  // };

  // const editMailInput = (index, x) => {
  //   axios
  //     .put(`${"/form/" + x.id}`, { ...x, name: editMail.current.value })
  //     .then((response) =>
  //       setdata([
  //         ...data.slice(0, index),
  //         { name: editMail.current.value, ...x },
  //         ...data.slice(index + 1),
  //       ])
  //     );
  // };

  const deleteConfirmButton = (x, index) => {
    axios
      .put(`${"/form/" + x.id}`, { ...x, edit: true })
      .then((response) =>
        setdata([
          ...data.slice(0, index),
          { ...x, edit: true },
          ...data.slice(index + 1),
        ])
      );
  };

  console.log(data);
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Login Form Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details and application.
        </p>
      </div>
      {/* {data.map((x) => {
        return x.edit ? <h1>hiii</h1> : <h3>byyyy</h3>;
      })} */}

      {data.map((x, index) => {
        return (
          <div key={index} className="m-5 p-5">
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500"> Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <p> {x.values.name}</p>
              </dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <p> {x.values.email}</p>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">password</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {x.values.password}
              </dd>
            </div>
            <Button
              title="EDIT"
              onClick={() => {
                toggleTodo(x, index);
              }}
            />

            <Button
              title="DELETE"
              onClick={() => {
                deleteTodo(x, index);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default About;
