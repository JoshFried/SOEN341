export const getUsername = async token => {
  try {
    const apiRes = await fetch(
      "http://127.0.0.1:8000/api/account/information",
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
    return resJSON.username;
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
    const apiRes = await fetch(
      `http://127.0.0.1:8000/api/account/${username}`,

      {
        mode: "cors",
        method: "GET"
      }
    );
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
  } catch (error) {
    console.log(error);
  }
};
