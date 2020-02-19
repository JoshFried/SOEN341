import React, { Component } from "react";
import axios from "axios";

export class Postform extends Component {
  state = {
    caption: "",
    picture: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleImageChange = e => {
    this.setState({
      picture: e.target.files[0]
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append("picture", this.state.picture, this.state.picture.name);
    form_data.append("caption", this.state.content);
    let url = "http://127.0.0.1:8000/api/post/create";
    const token = "9e4cece012fedb742f3297082768e65c5723a8f0";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Token " + token
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="text"
              placeholder="Content"
              id="content"
              value={this.state.content}
              onChange={this.handleChange}
              required
            />
          </p>
          <p>
            <input
              type="file"
              id="picture"
              accept="image/png, image/jpeg"
              onChange={this.handleImageChange}
              required
            />
          </p>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Postform;
