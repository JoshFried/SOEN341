export const likePost = async (token, id) => {
  try {
    const apiRes = await fetch(`http://127.0.0.1:8000/api/post/${id}/like`, {
      headers: {
        Authorization: "Token " + token
      },
      mode: "cors",
      method: "POST"
    });
    const resJSON = await apiRes.json();
    console.log(resJSON);
  } catch (error) {
    console.log(error);
  }
};

export default likePost;
