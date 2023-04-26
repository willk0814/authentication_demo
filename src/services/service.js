import axios from "axios";

export async function register(username, password) {
  console.log("New user, w/ user, pass: ", username, password);
  const data = {
    user: username,
    pass: password,
  };
  try {
    const response = await axios.post(
      "http://localhost:3000/api/register",
      data
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
