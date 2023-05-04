import tokenService from "./tokenService";
// we need the tokenService to get the token from localstorage
// because we have send it along on our api request to identify who we are to the server


// look in the server file for this line
// app.use('/api', require('./routes/api/likes'));
// that identifies the backend routes we are sending http requests too. 
const BASE_URL = '/api/'


// router.post('/posts/:id/likes', likesCtrl.create) this is the backend route we are making a request to
export function create(postId){
	return fetch(`${BASE_URL}posts/${postId}/likes`, {
		method: 'POST',
		headers: {
			// convention for sending jwts
			Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and and it to our api request
			// so the server knows who the request is coming from when the client is trying to make a POST
		}
	}).then(res => res.json())
}

// router.delete('/likes/:id', likesCtrl.deleteLike) this is the backend route we are making a requst to
export function removeLike(likeId){
	return fetch(`${BASE_URL}likes/${likeId}`, {
		method: 'DELETE',
		headers: {
			// convention for sending jwts
			Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and and it to our api request
			// so the server knows who the request is coming from when the client is trying to make a POST
		}
	}).then(res => res.json())
}