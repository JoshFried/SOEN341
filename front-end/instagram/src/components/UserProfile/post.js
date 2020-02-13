import React from "react";
import Figure from "react-bootstrap/Figure";
const Post = props => {
  return (
    <Figure>
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
          luxury SUV manufactured by Magna Steyr (formerly Steyr-Daimler-Puch)
          in Austria and sold by Mercedes-Benz. In certain markets, it has been
          sold under the Puch name as Puch G.
        </Figure.Caption>
      </Figure>
      <Figure>
        <Figure.Image
          width={171}
          height={180}
          className="posts"
          src="./img/velar.jpg"
          alt="Posts"
        />
        <Figure.Caption>
          The Range Rover Velar is a mid-size luxury crossover SUV produced by
          British automotive company Jaguar Land Rover under their Land Rover
          marque. The fourth model in the Range Rover line, the Velar was
          unveiled on 1 March 2017 in London, England. The Velar was released in
          the summer of 2017.[4] The name Velar had previously been used for a
          series of pre-production first-generation Range Rovers in 1969
        </Figure.Caption>
      </Figure>
      <Figure>
        <Figure.Image
          width={171}
          height={180}
          className="posts"
          src="./img/nissangtr.jpg"
          alt="Posts"
        />
        <Figure.Caption>
          The Nissan GT-R is a sports car produced by Nissan, which was unveiled
          in 2007.[2][3][4] It is the successor to the Skyline GT-R, although no
          longer part of the Skyline range itself, that name now being used for
          Nissan's luxury-sport market.
        </Figure.Caption>
      </Figure>
    </Figure>
  );
};

export default Post;
