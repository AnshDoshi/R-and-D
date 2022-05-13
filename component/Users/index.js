import React, { useState, useEffect } from "react";

const Users = () => {
  const [id, setid] = useState(0);
  const [data, setdata] = useState();
  const [filterarray, setfilterarray] = useState();
  const [radioData, setradioData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const responseData = await response.json();
    setdata(responseData);
    setfilterarray(responseData?.products);
    console.log("responese", response);
  };

  const categories = ["All", ...new Set(filterarray?.map((x) => x?.category))];

  const toggle = (i, category) => {
    console.log("catagory", category);
    setid(i);
    if (i === 0) {
      setradioData(data?.products);
    } else {
      setradioData(data?.products?.filter((x) => x.category === category));
    }
  };
  console.log(radioData);

  // console.log(categories,"catagory")

  return (
    <>
      <div className="flex items-center justify-center gap-5">
        {categories.map((x, i) => (
          <div key={i} className="flex justify-center items-center">
            <span className="text-xl m-2 underline">{x}</span>
            <input
              type="radio"
              onClick={() => toggle(i, x)}
              name="radiobutton"
            />
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-col items-center">
          {radioData?.map((x, i) => (
            <a key={i} className="hover:underline text-blue-500 text-2xl">
              {x?.title}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;
