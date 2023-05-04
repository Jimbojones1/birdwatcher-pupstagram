import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Grid } from "semantic-ui-react";

import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostDisplay from "../../components/PostDisplay/PostDisplay";
import PageHeader from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
// we import this in order to call the getProfile function
// that makes the api call to the backend (express app) in order to get the users
// information
import userService from "../../utils/userService";
import * as likesApi from '../../utils/likesApi'

export default function ProfilePage({loggedUser, handleLogout}) {
  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true); // the page is loading when the component loads
  const [error, setError] = useState("");

  // This is accessing the param in the url, using react router
  //      <Route path="/:username" element={<ProfilePage />} />
  // username comes from whatever the params name is in the route
  const { username } = useParams();
  console.log(username, " <- Username from params");

  useEffect(() => {
 
    getProfile();
  }, []);

  async function getProfile() {
	try {
	  // username is coming from our useParmas, whatever is in the url
	  // in the browser, is the username we want to put at the end of our api request
	  // to the backend route router.get('/:username', usersCtrl.profile);
	  const data = await userService.getProfile(username);

	  // after we get the data, we are done loading!
	  setLoading(false);
	  setPosts(data.posts);
	  setProfileUser(data.user);
	} catch (err) {
	  console.log("error from get profile ->", err);
	  setError("Profile does not exist");
	}
  }


  async function addLike(postId){
	// postId will be passed in when we click on a heart in Card component!
	try {
		const data = await likesApi.create(postId);
		// after we create a like
		// lets fetch all the posts again, to get the updated posts with the like 
		// embedded, and getProfile, will update the posts state so our ui will rerender
		// and we will see the heart change to red
		getProfile()


	} catch(err){
		console.log(err, ' error in addLike')
	}
  }

  // pass this down to Card component because that is where the like button is!
  // we call this function when the heart is clicked
  async function removeLike(likeId){
	try {
		// likeId will be passed in when we click on heart that is red in the 
		// Card component
		const data = await likesApi.removeLike(likeId);
		// then we will call getProfile to refresh the data, and have an updated post without the like
		getProfile()

	} catch(err){
		console.log(err, ' err in remove Like')
	}
  }

  // if anything went wrong with userService.getProfile(username)
  // show this UI
  if (error) {
    return (
      <>
        <PageHeader loggedUser={user} handleLogout={handleLogout} />
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader loggedUser={loggedUser} handleLogout={handleLogout} />
        <Loader />
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader loggedUser={loggedUser} handleLogout={handleLogout}  />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={profileUser}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
		<PostDisplay
            posts={posts}
            numPhotosCol={3}
            isProfile={true}
			loggedUser={loggedUser}
			addLike={addLike}
			removeLike={removeLike}
			/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
