import PageHeader from "../../components/Header/Header";
import AddPuppyForm from "../../components/AddPuppyForm/AddPuppyForm";
import PostDisplay from "../../components/PostDisplay/PostDisplay";

import { useState } from "react";
import { Grid } from "semantic-ui-react";

// this will import all the functions from postApi, and attach to an object call postsApi
import * as postsApi from "../../utils/postApi";

export default function FeedPage() {
  const [posts, setPosts] = useState([]); /// array of objects

  // we will call this function in our AddPuppyForm handleSubmit,
  // this way when we get a response from the server, we can update our state
  async function handleAddPost(post) {
    try {
      const responseData = await postsApi.create(post); // this is calling our create function in the postsApi utils folder
      console.log(responseData, " response from the server");
    } catch (err) {
      console.log(err, " error in addPost");
    }
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
          <PostDisplay />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
