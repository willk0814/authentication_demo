import axios from "axios";

export async function register(username, password, auth) {
  const data = {
    user: username,
    pass: password,
    auth: auth,
  };
  try {
    const response = await axios.post(
      "http://localhost:3000/api/register",
      data
    );

    localStorage.setItem("key", response.data.token);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

export async function login(username, password) {
  const data = {
    user: username,
    pass: password,
  };
  try {
    const response = await axios.post("http://localhost:3000/api/login", data);

    localStorage.setItem("key", response.data.token);
    console.log(response.data);
    console.log(response.data.authStatus);
  } catch (error) {
    console.log(error);
  }
}
