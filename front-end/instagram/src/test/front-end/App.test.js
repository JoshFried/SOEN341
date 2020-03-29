import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import PostForm from "../../components/Postform.js";
import LoginForm from "../../components/login/form.js"

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

/*Testing Login*/
/*
test("should give token", () => {
  const response = LoginForm();
  console.log(response);
})
*/
