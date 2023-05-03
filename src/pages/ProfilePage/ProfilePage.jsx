import { useParams } from "react-router-dom";

import { Grid } from "semantic-ui-react";

import ProfileBio from "../../components/ProfileBio/ProfileBio";
import ProfilePostDisplay from "../../components/ProfilePostDisplay/ProfilePostDisplay";
import PageHeader from "../../components/Header/Header";

export default function ProfilePage() {
  // This is accessing the param in the url, using react router
  //      <Route path="/:username" element={<ProfilePage />} />
  // username comes from whatever the params name is in the route
  const { username } = useParams();
  console.log(username, " <- Username from params");

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio />
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
