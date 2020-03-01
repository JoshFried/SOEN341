const followAccount = async (token, username) => {
  try {
    const apiRes = fetch(
      `http://127.0.0.1:8000/api/acocunt/${username}/follow`,
      {
        headers: {
          Authrization: "Token " + token
        },
        mode: "cors",
        method: "POST"
      }
    );
    const resJSON = await apiRes.json();
    console.log(resJSON);
  } catch (error) {
    console.log(error);
  }
};
