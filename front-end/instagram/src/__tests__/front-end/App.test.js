import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import {PostForm} from "../../components/Postform.js";
import {LoginForm} from "../../components/login/form.js";
import {createComment} from "../../modules/actions/Comment.js";
import {followAccount} from "../../modules/actions/Follow.js";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

/*Testing post comment*/
let text = "test";
let id = '14';
let token = '1522e5a99242b9b85f20f092d5b3c99ece6aa2f3';
let username = 'kevin'

/* Follow/Unfollow test */
test('Follow/Unfollow API test', async () => {
  const data = await followAccount(token,username);
  let stringData = JSON.stringify(data)
  expect(stringData).toMatch(/response/);
});
