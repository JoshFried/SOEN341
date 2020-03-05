import { Route, Redirect } from "react-router-dom";
import React from "react";
import NoMatchPage from "../App";

export const getUsername = async token => {
  try {
    const apiRes = await fetch(
      "http://127.0.0.1:8000/api/account/information",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + JSON.parse(token)
        },

        mode: "cors",
        method: "GET"
      }
    );
    if (apiRes.status + " " + apiRes.statusText === "404 Not Found") {
      console.log("FUCK");
      return <Redirect to="/404"></Redirect>;
    }
    const resJSON = await apiRes.json();

    return resJSON.username;
  } catch (error) {
    if (error.status === 404) console.log("FUCK");
    return error;
  }
};

export const updateProfile = async (token, data) => {
  try {
    const apiRes = await fetch(
      "http://127.0.0.1:8000/api/account/information/update",
      {
        headers: {
          "Content-Type": "application/json",

          Authorization: "Token " + JSON.parse(token)
        },

        mode: "cors",
        method: "PUT",
        body: JSON.stringify(data)
      }
    );

    const resJSON = await apiRes.json();
    console.log(resJSON);
  } catch (error) {
    return error;
  }
};

export const getInfo = async username => {
  const profile = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
    about: "",
    allPosts: [],
    nbOfPosts: 0,
    nbOfFollowers: 0,
    allFollowers: [],
    nbOfFollowing: 0,
    allFollowing: []
  };

  try {
    if (username) {
      const apiRes = await fetch(
        `http://127.0.0.1:8000/api/account/${username}`,
        {
          mode: "cors",
          method: "GET"
        }
      );
      if (apiRes.status + " " + apiRes.statusText === "404 Not Found") {
        return "404 error";
      }

      const resJSON = await apiRes.json();
      const profile = {
        email: resJSON.email,
        username: resJSON.username,
        firstName: resJSON.first_name,
        lastName: resJSON.last_name,
        profilePicture: resJSON.profile_picture,
        about: resJSON.about,
        allPosts: [...resJSON.all_posts],
        nbOfPosts: resJSON.all_post_count,
        nbOfFollowers: resJSON.get_num_of_followers,
        allFollowers: resJSON.all_followers,
        nbOfFollowing: resJSON.get_num_of_following,
        allFollowing: resJSON.all_following
      };
      return profile;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async token => {
  try {
    const apiRes = await fetch(
      "http://127.0.0.1:8000/api/account/feed",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + JSON.parse(token)
        }
      },

      {
        mode: "cors",
        method: "GET"
      }
    );
    const resJSON = await apiRes.json();

    const feed = {
      email: resJSON.email,
      username: resJSON.username,
      firstName: resJSON.first_name,
      lastName: resJSON.last_name,
      profilePicture: resJSON.profile_picture,
      about: resJSON.about,
      allPosts: [...resJSON.all_posts]
    };
    return feed;
  } catch (error) {
    console.log(error);
  }
};
