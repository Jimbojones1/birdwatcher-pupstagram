import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

// The signup, since we are sending over a file,
// we need to send over a multipart/form-data request
// the browser will automatically detect that for us and apply the headers!
function signup(user) {
  return (
    fetch(BASE_URL + "signup", {
      method: "POST",
      // headers: new Headers({'Content-Type': 'application/json'}),  // If you are sending a file/photo over
      // what do datatype do you need to change this too?
      body: user, // <- have to make sure when sending a file/photo, that the body is formData
    })
      .then((res) => {
        if (res.ok) return res.json();
        // Probably a duplicate email
        throw new Error("Email already taken!");
      })
      // Parameter destructuring!
      // setting the token in localstorage!
      // This is when we recieve the token from the server on the client
      // and store it in localstorage
      .then(({ token }) => tokenService.setToken(token))
  );
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return (
    fetch(BASE_URL + "login", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(creds),
    })
      .then((res) => {
        // Valid login if we have a status of 2xx (res.ok)
        if (res.ok) return res.json();
        throw new Error("Bad Credentials!");
      })
      // This is when we recieve the token from the server on the client
      // and store it in localstorage
      .then(({ token }) => tokenService.setToken(token))
  );
}

// This function when called (In profilePage) makes a request to the backend route
// router.get('/:username', usersCtrl.profile); in your routes/api/users.js
function getProfile(username) {
  return fetch(BASE_URL + username, {
    headers: {
      // make sure to send over the jwt token to identify who is making the request
      Authorization: "Bearer " + tokenService.getToken(),
    }
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Error from getProfile request, check the server terminal");
  });
}

export default {
  signup,
  getUser,
  logout,
  login,
  getProfile,
};
