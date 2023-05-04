import PageHeader from "../../components/Header/Header";
import AddPuppyForm from "../../components/AddPuppyForm/AddPuppyForm";
import PostDisplay from "../../components/PostDisplay/PostDisplay";
import Loader from "../../components/Loader/Loader";

import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

// this will import all the functions from postApi, and attach to an object call postsApi
import * as postsApi from "../../utils/postApi";
import tokenService from "../../utils/tokenService";
export default function FeedPage() {
  const [posts, setPosts] = useState([]); /// array of objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // (C)RUD Create
  // we will call this function in our AddPuppyForm handleSubmit,
  // this way when we get a response from the server, we can update our state
  async function handleAddPost(post) {
    // post is the formData from addPuppyForm
    try {
      setLoading(true);
      const responseData = await postsApi.create(post); // this is calling our create function in the postsApi utils folder
      console.log(responseData, " response from the server");
      setPosts([responseData.data, ...posts]); // spread operator to keep all the posts that are already in state!
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err, " error in addPost");
      setError("Error creating a post, please try again");
    }
  }
  // C(R)UD Read
  async function getPosts() {
    try {
      // make an api call
      // Then I want to update state!
      const response = await postsApi.getAll();
      console.log(response, " data");
      // then we update state
      setPosts(response.posts);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error in getPosts");
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  // ===========================================================================================
  // ==========================ALTERNATIVE WAYS TO MAKE THE API CALL for getPOSTS======================================
  // ===========================================================================================

  // /// THis is One to do it, less originazation than putting the functions calls in the utils, but accomplishes same task
  //   useEffect(() => {
  //     //Getting posts, C(R)UD

  //     async function getAll() {
  //       const response = await fetch("/api/posts/", {
  //         headers: {
  //           // convention!
  //           // It's always going to Bearer + a space + the jwt token
  //           Authorization: "Bearer " + tokenService.getToken(),
  //         },
  //       });

  //       const data = await response.json();
  //       console.log(data, " this is data");
  //       setPosts(data.posts);
  //     }

  //     getAll();
  //   }, []); // This is useEffect runs once when the Feed component
  //   // loads

  /// THis is another way to do it, less originazation than putting the functions calls in the utils, but accomplishes same task
  //   useEffect(() => {
  //     //Getting posts, C(R)UD

  //     function getAll() {
  //       fetch("/api/posts/", {
  //         headers: {
  //           // convention!
  //           // It's always going to Bearer + a space + the jwt token
  //           Authorization: "Bearer " + tokenService.getToken(),
  //         },
  //       })
  //         .then((res) => res.json())
  //         .then((data) => setPosts(data.posts));

  //       // const data = await response.json();
  //       // console.log(data, ' this is data')
  //       // setPosts(data.posts)
  //     }

  //     getAll();
  //   }, []); // This is useEffect runs once when the Feed component
  //   // loads

  // ===========================================================================================
  // ==========================ALTERNATIVE WAYS TO MAKE THE API CALL for getPOSTS======================================
  // ===========================================================================================

  if (error) {
    return (
      <>
        <PageHeader />
      </>
    );
  }
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPuppyForm handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostDisplay
            posts={posts}
            numPhotosCol={1}
            isProfile={false}
            loading={loading}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
