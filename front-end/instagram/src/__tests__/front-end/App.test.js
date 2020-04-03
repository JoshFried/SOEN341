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

/*Test variables*/
let text = { text: "test" };
let id = '18';
let token = '1522e5a99242b9b85f20f092d5b3c99ece6aa2f3';
let token1 = '\"1522e5a99242b9b85f20f092d5b3c99ece6aa2f3\"';
let username = 'kevin'

/* Follow/Unfollow test */
test('Follow/Unfollow test', async () => {
  const data = await followAccount(token,username);
  let stringData = JSON.stringify(data)
  expect(stringData).toMatch(/response/);
});

/* Comment test */
test('Post a comment test', async () => {
  const data = await createComment(token1,id,text);
  let stringData = JSON.stringify(data)
  expect(stringData).toMatch(/id/);
});