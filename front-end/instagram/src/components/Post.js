import React, { Fragment } from 'react'
import { Card, Button } from "react-bootstrap";

// take state of data  from fetching in profilelistview and display
const Posts = props => {
    return ( 
        <Fragment>   
        {props.data.map(post => ( 
        <div key={post.id} style={{marginLeft:'35%', padding:'2%'}}>
        <Card style={{ width: '30rem' }}>
         <Card.Img variant="top" img src = {"http://127.0.0.1:8000".concat(post.image)} alt= "postimg"/>
         <Card.Body>
           <Card.Title>{post.title}</Card.Title>
           <Card.Text>{post.content}</Card.Text>
           <Button variant="dark">Like</Button>
         </Card.Body>
        </Card>
        </div>
        ))}
        </Fragment> 
      ); 
    }

export default Posts;




 