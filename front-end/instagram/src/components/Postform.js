import React, { Component } from "react";
import axios from "axios";

export class Postform extends Component {
  state = {
    caption: "",
    picture: null,
  };

  componentDidMount() {
    document.querySelector('.custom-file-input').addEventListener('change',function(e){
      const fileName = document.getElementById("myInput").files[0].name;
      const nextSibling = e.target.nextElementSibling
      if (fileName == null){
        nextSibling.innerText = " "
      }
      nextSibling.innerText = fileName
  })
  }

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
    const token = localStorage.getItem("token").replace(/\"/g, "");
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
         "Authorization": `Token ${token}`
        }
      })
      .then(res => {
        console.log(res.data);
        this.props.history.push('/feed')
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <form 
        onSubmit={this.handleSubmit}
        style={{
          width: "100%",
          maxWidth: "330px",
          padding: "15px",
          margin: "auto",
          border: "1px solid grey",
          borderRadius: "10px",
          marginTop: "100px",
          boxShadow: " 5px 5px 5px 0px #888888"
        }}
        >
          <h1
          className="h3 mb-3 font-weight-normal"
          style={{ textAlign: "center" }}
        >
          {" "}
          Upload a photo
        </h1>
        <br></br>
            <input
              className="form-control"
              type="text"
              placeholder="Caption"
              id="content"
              value={this.state.content}
              onChange={this.handleChange}
              required
            />
        <br></br>
        <div className="input-group">
            <div className="custom-file">
                <input 
                  type="file" 
                  className="custom-file-input" 
                  id="myInput" 
                  aria-describedby="myInput"
                  accept="image/png, image/jpeg"
                  onChange={this.handleImageChange}
                  required
                  />
                <label className="custom-file-label" htmlFor="myInput">Choose file</label>
            </div>
            <div className="input-group-append"> 
            </div>
        </div>
        <br></br>
          <input type="submit" className="btn btn-lg btn-primary btn-block"/>
        </form>
        <br></br>
      </div>
      
    );
  }
}

export default Postform;


