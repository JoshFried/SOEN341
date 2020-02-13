import React from "react";
import Figure from "react-bootstrap/Figure";
const Post = props => {
  return (
    <Figure>
      <Figure.Image
        width={171}
        height={180}
        className="posts"
        src="./img/G63.jpg"
        alt="Posts"
      />
      <Figure.Caption>
        The Mercedes-Benz G-Class, sometimes called G-Wagen (short for
        Geländewagen, "cross country vehicle"), is a mid-size four-wheel drive
        luxury SUV manufactured by Magna Steyr (formerly Steyr-Daimler-Puch) in
        Austria and sold by Mercedes-Benz. In certain markets, it has been sold
        under the Puch name as Puch G.
      </Figure.Caption>
    </Figure>
  );
};

export default Post;
