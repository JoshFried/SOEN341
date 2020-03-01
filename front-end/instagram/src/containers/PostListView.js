import React, { Component, Fragment } from "react";
import axios from "axios";
import Posts from "../components/Post";

// Will display all of the posts. //imported Posts.js
export class PostList extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    let url = "http://127.0.0.1:8000/api/post/1";
    const token = "	0ce320482e5569b0bb44a831aa72c64d38995ae0";

    axios
      .get(url, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Token " + token
        }
      })
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  }

  render() {
    // will link state to the data property on the posts
    return (
      <Fragment>
        <div style={{ width: "100%", height: "150px" }}></div>
        <div>
          <Posts data={this.state.posts} />
        </div>
      </Fragment>
    );
  }
}

export default PostList;
