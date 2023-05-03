import PostCard from "../PostCard/PostCard";
import { Card } from "semantic-ui-react";

export default function PostDisplay({posts}) {
  return (
    <Card.Group itemsPerRow={1} stackable>
      {posts.map((post) => {
        return (
          <PostCard
            post={post}
            key={post._id}
          />
        );
      })}
    </Card.Group>
  );
}
