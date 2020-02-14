import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Posts from '../components/Post';


// Will display all of the posts. //imported Posts.js
export class PostList extends Component {
      state = {
        posts: []
      };
     
      componentDidMount() {
        let url = 'http://localhost:8000/api/posts/';
        axios.get(url).then(res => {
          this.setState({
            posts: res.data
           
          });
        });
      }
     
    render() { // will link state to the data property on the posts
        return (
          <Fragment>
            <div style = {{width:'100%', height:'150px'}}></div>
             <div>
                <Posts data={this.state.posts}/> 
            </div>
          </Fragment>
        )
    }
}

export default PostList;
