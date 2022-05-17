import React, { useState, useEffect } from "react";
import { Formik, Form, useField, ErrorMessage } from "formik";
import { object, string, ref } from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import TextField from "@mui/material/TextField";

// import About from "../About";
import axios from "../../axios/axios";

const RegisterValidation = object().shape({
  name: string().required("Required"),
  email: string()
    .required("Valid email required")
    .email("Valid email required"),
  password: string().min(8, "Required").required("Required"),
  confirmPassword: string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords do not match"),
});

const Input = ({ defaultValue, name, label, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold">{label}</label>
      <input
        defaultValue={defaultValue}
        className={`${
          meta.error && meta.touched ? "border-red-500" : ""
        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        {...field}
        {...props}
      />
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
};

const EditForm = (values) => {
  const [editData, seteditData] = useState();
  const location = useLocation();

  const navigate = useNavigate();
  //   console.log(location, "location");

  useEffect(() => {
    // axios
    //   .get(`/form/${location?.state}`)
    //   .then((response) => {
    //     seteditData(response?.data);
    //   })
    //   .catch((err) => console.log("error useeffect about", err));
  }, []);
  console.log("data", location.state);

  const handleSubmit = (values, helper) => {
    axios
      .put(`/form/${location?.state?.id}`, { ...values, values })
      .then((response) => {
        seteditData([
          //   ...editData.slice(0, helper),
          { ...values, values },
          //   ...editData.slice(helper + 1),
        ]);
        navigate("/about");
      })
      .catch((err) => console.log("handle submit editform error", err));
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col bg-gray-100">
      <Formik
        initialValues={{
          name: location?.state?.name ?? "name",
          email: location?.state?.email ?? "email",
          password: location?.state?.password ?? "password",
          confirmPassword:
            location?.state?.confirmPassword ?? "confirmPassword",
        }}
        onSubmit={(values, helper) => {
          handleSubmit(values);
          helper.resetForm();
        }}
        validationSchema={RegisterValidation}
      >
        {() => {
          return (
            <Form className="bg-white w-6/12 shadow-md rounded px-8 pt-6 pb-8">
              <Input
                name="name"
                label="Name"
                defaultValue={editData?.name ?? "name"}
              />
              <Input
                name="email"
                label="Email"
                defaultValue={editData?.email ?? "email"}
              />
              <Input
                name="password"
                label="Password"
                type="password"
                defaultValue={editData?.password ?? "password"}
              />
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                defaultValue={editData?.confirmPassword ?? "confirmPassword"}
              />
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onSubmit={(values, helper) => {
                    handleSubmit(values);
                    helper.resetForm();
                  }}
                >
                  submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditForm;
