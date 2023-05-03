import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Grid } from "semantic-ui-react";

import ProfileBio from "../../components/ProfileBio/ProfileBio";
import ProfilePostDisplay from "../../components/ProfilePostDisplay/ProfilePostDisplay";
import PageHeader from "../../components/Header/Header";

// we import this in order to call the getProfile function
// that makes the api call to the backend (express app) in order to get the users
// information
import userService from "../../utils/userService";

export default function ProfilePage() {
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

    getProfile();
  }, []);

  // if anything went wrong with userService.getProfile(username)
  // show this UI
  if (error) {
    // if this is true, the rest of the function doesn't run!
    return (
      <>
        <PageHeader />
        <h1>{error}</h1>
      </>
    );
  }

  // checking if we are still loading the profile information
  if (loading) {
	// if this true the rest of the page doesn't run!
    return (
      <>
        <PageHeader />
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={profileUser}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <ProfilePostDisplay />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
