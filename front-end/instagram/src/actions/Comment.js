export const createComment = async (token, id, text) => {
  console.log(token + " " + id + " " + text);
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
  } catch (error) {
    console.log(error);
  }
};
