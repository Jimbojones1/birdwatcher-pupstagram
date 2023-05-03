import PageHeader from "../../components/Header/Header";
import AddPuppyForm from "../../components/AddPuppyForm/AddPuppyForm";
import PostDisplay from "../../components/PostDisplay/PostDisplay";

import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

// this will import all the functions from postApi, and attach to an object call postsApi
import * as postsApi from "../../utils/postApi";

export default function FeedPage() {
  const [posts, setPosts] = useState([]); /// array of objects

  // we will call this function in our AddPuppyForm handleSubmit,
  // this way when we get a response from the server, we can update our state
  async function handleAddPost(post) {// post is the formData from addPuppyForm
    try {
      const responseData = await postsApi.create(post); // this is calling our create function in the postsApi utils folder
      console.log(responseData, " response from the server");
	  setPosts([responseData.data, ...posts]); // spread operator to keep all the posts that are already in state!
    } catch (err) {
      console.log(err, " error in addPost");
    }
  }

  async function getPosts() {
    try {
      const response = await postsApi.getAll();
      console.log(response, " data");
      setPosts(response.posts);
    
    } catch (err) {
      console.log(err.message, " this is the error in getPosts");
    }
  }

  useEffect(() => {
    //Getting posts, C(R)UD

    getPosts();
  }, []); // This is useEffect runs once when the Feed component
  // loads

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
          <PostDisplay   posts={posts}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
