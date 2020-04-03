export const followAccount = async (token, username) => {
  try {
    const apiRes = await fetch(
      `http://127.0.0.1:8000/api/account/${username}/follow`,
      {
        headers: {
          Authorization: "Token " + token
        },
        mode: "cors",
        method: "POST"
      }
    );
    const resJSON = await apiRes.json();
    console.log(resJSON);
    return resJSON;
  } catch (error) {
    console.log(error);
  }
};
