import axios from "axios";

export async function register(username, password, auth) {
  const data = {
    user: username,
    pass: password,
    auth: auth,
  };
  console.log("Making register call with user, pass: ", username, password);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/register",
      data
    );
    console.log("Response user, ", response.data.user);
    localStorage.setItem("key", response.data.token);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function login(username, password) {
  const data = {
    user: username,
    pass: password,
  };
  console.log("Making login in call with user, pass: ", username, password);
  try {
    const response = await axios.post("http://localhost:3000/api/login", data);
    console.log("Response, ", response);
    localStorage.setItem("key", response.data.token);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// ADMIN only function
export async function getAllUsers() {
  try {
    const response = await axios.get("http://localhost:3000/api/users");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(userID) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/users/${userID}/`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserAuth(userID, authStatus) {
  const data = {
    auth: authStatus,
  };
  try {
    const response = await axios.put(
      `http://localhost:3000/api/users/${userID}/`,
      data
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

// Note Management Services
// Add a note
export async function addNote(userID, date, content) {
  const data = {
    userID: userID,
    date: date,
    content: content,
  };

  try {
    const response = await axios.post(
      `http://localhost:3000/api/addNote`,
      data
    );
    console.log("response, ", response);
  } catch (error) {
    console.log(error.message);
  }
}

// Remove a note
export async function deleteNote(userID, noteID) {
  console.log(`Deleting note from user: ${userID} with id: ${noteID}`);
  const data = {
    userID: userID,
    noteID: noteID,
  };
  try {
    const response = await axios.delete(
      "http://localhost:3000/api/deleteNote",
      { data: data }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

// View notes -> accepts a user
export async function getAllNotes(userID) {
  console.log(`Retrieving notes for user: ${userID}`);
  try {
    const response = await axios.get(
      `http://localhost:3000/api/retrieveAllNotes`,
      {
        params: {
          userID: userID,
        },
      }
    );
    console.log("response ", response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}
