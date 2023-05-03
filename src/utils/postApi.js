
// we need to use the tokenService to get the token out of localstorage
import tokenService from "./tokenService";
const BASE_URL = '/api/posts/';
// You can look in the server.js at this line app.use('/api/posts', require('./routes/api/posts'));


// Making a request to create a POST
// this function will occur when a user is logged in
// so we have to send the token to the server!
export function create(data){
	return fetch(BASE_URL, {
		method: 'POST',
		body: data, // since we are sending over a file/photo, no need to jsonify, since we are sending a multipart/formdata request
		headers: {
			// convention for sending jwts
			Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and and it to our api request
			// so the server knows who the request is coming from when the client is trying to make a POST
		}
	}).then(responseFromTheServer => {
		if(responseFromTheServer.ok) return responseFromTheServer.json() // so if everything went well in the response return 
		//the parsed json to where we called the function

		throw new Error('Something went wrong in create Post'); // this will go to the catch block when we call the function in the AddPostPuppyForm
		// handleSubmit
	})
}


// This function is being called in the FeedPage when our useEffect runs when the component loads
// in order to get all the posts


export function getAll() {
	// the return, helps because 
	// whenever we call getAll, it returns fetch making an api call
	// if there was no return, fetch would immediatly make the api call when the function is defined

	// we want to wait to make the api call when we want to use getAll (When the FeedPage loads)
	return fetch(BASE_URL, {
	  headers: {
		// convention!
		// It's always going to Bearer + a space + the jwt token
		Authorization: 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => res.json());
  }