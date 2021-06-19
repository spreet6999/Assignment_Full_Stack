export const getUsers = () => {
    return fetch(`http://localhost:5000/user/usergetall`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.log(err));
};