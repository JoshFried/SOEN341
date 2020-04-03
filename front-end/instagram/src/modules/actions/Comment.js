export const createComment = async (token, id, text) => {
  try {
    const apiRes = await fetch(
      `http://127.0.0.1:8000/api/post/${id}/comment/create`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + JSON.parse(token)
        },
        mode: "cors",
        method: "POST",
        body: JSON.stringify(text)
      }
    );
    const resJSON = await apiRes.json();
    console.log(resJSON);
    return resJSON;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (token, id, postID) => {
  try {
    const post = { post: postID };
    const apiRes = await fetch(
      `http://127.0.0.1:8000/api/post/comment/${id}/delete`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + JSON.parse(token)
        },
        mode: "cors",
        method: "DELETE",
        body: JSON.stringify(post)
      }
    );
    const resJSON = await apiRes.json();
    console.log(resJSON);
  } catch (error) {
    console.log(error);
  }
};

export const editComment = async (token, id, text, postID) => {
  const post = { post: postID };
  const send = { ...post, ...text };

  try {
    const apiRes = await fetch(
      `http://127.0.0.1:8000/api/post/comment/${id}/update`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + JSON.parse(token)
        },
        mode: "cors",
        method: "PUT",
        body: JSON.stringify(send)
      }
    );
    const resJSON = await apiRes.json();
    console.log(resJSON);
  } catch (error) {
    console.log(error);
  }
};
