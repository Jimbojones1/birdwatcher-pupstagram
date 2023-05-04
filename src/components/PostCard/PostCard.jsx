import { Card, Icon, Image } from "semantic-ui-react";

function PostCard({ post, isProfile, removeLike, addLike, loggedUser}) {
  return (
    <Card raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
            <Image
              size="large"
              avatar
              src={
                post.user.photoUrl
                  ? post.user.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
            />
            {post.user.username}
          </Card.Header>
        </Card.Content>
      )}
      <Image src={`${post?.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{post.caption}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
        <Icon name={"heart"} size="large" color={"grey"} />
        {post.likes.length} Likes
      </Card.Content>
    </Card>
  );
}

export default PostCard;
