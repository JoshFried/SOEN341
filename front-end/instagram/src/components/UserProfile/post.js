import React from "react";
import Figure from "react-bootstrap/Figure";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";

const Post = props => {
  return (
    <Figure>
      <Figure>
        <Figure>
          <CardGroup>
            <Card style={{ marginBottom: 0 }}>
              <Figure>
                <Figure.Image
                  width={400}
                  height={250}
                  className="posts"
                  src="./img/G63.jpg"
                  alt="Posts"
                />
              </Figure>
            </Card>
            <Card>
              <Figure>
                <Figure.Image
                  width={400}
                  height={250}
                  className="posts"
                  src="./img/velar.jpg"
                  alt="Posts"
                />
              </Figure>
            </Card>
            <Card>
              <Figure>
                <Figure.Image
                  width={400}
                  height={250}
                  className="posts"
                  src="./img/nissangtr.jpg"
                  alt="Posts"
                />
              </Figure>
            </Card>
          </CardGroup>
        </Figure>
        <Figure>
          <CardGroup>
            <Card style={{ marginBottom: 0 }}>
              <Figure>
                <Figure.Image
                  width={400}
                  height={250}
                  className="posts"
                  src="./img/curry.jpg"
                  alt="Posts"
                />
              </Figure>
            </Card>
            <Card>
              <Figure>
                <Figure.Image
                  width={400}
                  height={250}
                  className="posts"
                  src="./img/lebron.jpg"
                  alt="Posts"
                />
              </Figure>
            </Card>
            <Card>
              <Figure>
                <Figure.Image
                  width={400}
                  height={150}
                  className="posts"
                  src="./img/lexus.jpg"
                  alt="Posts"
                />
              </Figure>
            </Card>
          </CardGroup>
        </Figure>
      </Figure>
      <Figure>
        <CardGroup>
          <Card style={{ marginBottom: 0 }}>
            <Figure>
              <Figure.Image
                width={400}
                height={250}
                className="posts"
                src="./img/audi.jpg"
                alt="Posts"
              />
            </Figure>
          </Card>
          <Card>
            <Figure>
              <Figure.Image
                width={400}
                height={250}
                className="posts"
                src="./img/drake.jpg"
                alt="Posts"
              />
            </Figure>
          </Card>
          <Card>
            <Figure>
              <Figure.Image
                width={400}
                height={250}
                className="posts"
                src="./img/rangerover.jpg"
                alt="Posts"
              />
            </Figure>
          </Card>
        </CardGroup>
      </Figure>
    </Figure>
  );
};

export default Post;
