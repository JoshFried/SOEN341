import React, { useState } from "react";
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
    setPreview(URL.createObjectURL(e.target.files[0]));
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
          <img src={preview} className={filter} style={{width:'300px', height:'200px'}}></img>
        </div>
        <form className="form-inline">
        <select className="form-control form-control-sm" onChange={event => setFilter(event.target.value)}>
          <option selected>Grayscale</option>
          <option value='filter_grayscale25'>25% </option>
          <option value='filter_grayscale50'>50%</option>
          <option value='filter_grayscale75'>75%</option>
          <option value='filter_grayscale100'>100%</option>
        </select>
        &nbsp;
        <select className="form-control form-control-sm"  onChange={event => setFilter(event.target.value)}>
          <option selected>Invert</option>
          <option value='filter_invert25 '>25% </option>
          <option value='filter_invert50 '>50%</option>
          <option value='filter_invert75 '>75%</option>
          <option value='filter_invert100 '>100%</option>
        </select>
        &nbsp;
        <select className="form-control form-control-sm"  onChange={event => setFilter(event.target.value)}>
          <option selected>Hue-rotate</option>
          <option value='filter_hue-rotate90'>90 degree </option>
          <option value='filter_hue-rotate180'>180 degree</option>
          <option value='filter_hue-rotate270'>270 degree</option>
          <option value='filter_hue-rotate360'>360 degree</option>
        </select>
        <select className="form-control form-control-sm"  onChange={event => setFilter(event.target.value)}>
          <option selected>brightness</option>
          <option value='filter_brightness25'>25% </option>
          <option value='filter_brightness50'>50%</option>
          <option value='filter_brightness75'>75%</option>
        </select>
        &nbsp;
        <select className="form-control form-control-sm"  onChange={event => setFilter(event.target.value)}>
          <option selected>Opacity</option>
          <option value='filter_opacity25'>25% </option>
          <option value='filter_opacity50'>50%</option>
          <option value='filter_opacity75'>75%</option>
        </select>
        </form>
        <br></br>
        <input type="submit" className="btn btn-lg btn-primary btn-block" />
      </form>
      <br></br>
    </div>
  );
};
export default PostForm;
