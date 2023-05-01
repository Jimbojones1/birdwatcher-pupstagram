import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

import { useState } from "react";

export default function Signup() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    bio: "",
  });

  const [error, setError] = useState("");

  function handleChange() {}

  function handleFileInput() {}

  function handleSubmit(){}

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
	  	<Header as="h2" color="purple" textAlign="center">
          <Image src="https://i.imgur.com/TM4eA5g.jpg" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="bio"
              name="bio"
              value={state.bio}
              placeholder="Tell us more about your dogs..."
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
