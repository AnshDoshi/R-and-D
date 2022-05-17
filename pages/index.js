// import React from "react";
// // import Todo from "../component/Todo";
// // import Users from "../component/Users";

// const App = () => {
//   return (
//     <div>
//       {/* <Todo /> */}
//       {/* <Users /> */}
//     </div>
//   );
// };

// export default App;

// import "./App.css";
import React, { Suspense } from "react";
import LoginForm from "../component/LoginForm";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "../component/About";
import EditForm from "../component/EditForm";

// const Todo = React.lazy(() => import("./component/Todo"));
// const Users = React.lazy(() => import("./component/Users"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/editform/:id" element={<EditForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
