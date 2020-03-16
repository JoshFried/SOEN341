import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const PostForm = () => {
  const [preview, setPreview] = useState(null);
  const [content, setContent] = useState("");
  const [filter, setFilter] = useState("");
  const [picture, setPicture] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setContent(e.target.value);
  };

  const handleImageChange = e => {
    setPicture(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]))
  };

  const handleSubmit = e => {
    e.preventDefault();
    let form_data = new FormData();  
    form_data.append("picture", picture, picture.name);
    form_data.append("caption", content);
    form_data.append("img_filter", filter);
    let url = "http://127.0.0.1:8000/api/post/create";
    const token = localStorage.getItem("token").replace(/\"/g, "");
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        console.log(res.data);
        setSubmitted(true);
      })
      .catch(err => console.log(err));
  };

  if (submitted) {
    return <Redirect to="/feed"></Redirect>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
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
          value={content}
          onChange={handleChange}
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
              onChange={handleImageChange}
              required
            />
            <label className="custom-file-label" htmlFor="myInput">
              Choose file
            </label>
          </div>
          <div className="input-group-append"></div>
        </div>
        <br></br>
        <div>
          <img src={preview} class = {filter} style={{width:'300px', height:'200px'}}></img>
        </div>
        <button type="button" onClick={() => {
          setFilter('filter_original');
        }}>original</button>
        <button type="button" onClick={() => {
          setFilter('filter_grayscale');
        }}>grayscale</button>
        <button type="button" onClick={() => {
          setFilter('filter_invert');
        }}>invert</button>
        <br></br><br></br>

        <button type="button" onClick={() => {
          setFilter('filter_brightness');
        }}>brightness</button>
        <button type="button" onClick={() => {
          setFilter('filter_opacity');
        }}>opacity</button>
        <button type="button" onClick={() => {
          setFilter('filter_blur');
        }}>blur</button>

        <br></br><br></br>
        <input type="submit" className="btn btn-lg btn-primary btn-block" />
      </form>
      <br></br>
    </div>
  );
};
export default PostForm;
