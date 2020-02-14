import React, { Component } from 'react'
import axios from 'axios';
import './myStyles.css'
import {Form} from "react-bootstrap";

export class Postform extends Component {
    state = {
        title: '',
        content: '',
        image: null
      };
    
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      };
    
      handleImageChange = (e) => {
        this.setState({
          image: e.target.files[0]
        })
      };
    
      handleSubmit = (e) => {
      //  e.preventDefault();   refresh off
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('image', this.state.image, this.state.image.name);
        form_data.append('title', this.state.title);
        form_data.append('content', this.state.content);
        let url = 'http://localhost:8000/api/posts/';
        axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
            .then(res => {
              console.log(res.data);
            })
            .catch(err => console.log(err))
      };
      render() {
        return (
          <Form className = 'Form'>
            <strong>Upload</strong>
            <div>
                <form onSubmit={this.handleSubmit}>
                <p className = 'title'>
                  <br></br>
                    <input type="text" placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required/>
                </p>
                <p className = 'content'>
                    <input type="text" placeholder='Content' id='content' value={this.state.content} onChange={this.handleChange} required/>
                </p>
                <p className = 'image'>
                    <input type="file"
                        id="image"
                        accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
                </p>
                <p className = 'submit'>
                   <input type="submit"/>
                </p>
                </form>
            </div>
          </Form>
        )
    }
}

export default Postform

