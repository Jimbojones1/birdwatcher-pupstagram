import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function PostCard({ post, isProfile, removeLike, addLike, loggedUser }) {
  console.log(loggedUser);
  // is the loggedUser username in the the post.likes array
  // if it is, that means the user has liked the Post

  // The heart should be red, and onclick function should be remove Like

  // if the loggedUser username is not in the post.likes array
  // that means the user has not liked the Post
  // the heart should be grey
  // and our onclick should be removeLike

  // if the user liked the post, we'll get the index number of the like in the
  // post.likes array
  const likedIndex = post.likes.findIndex(
    (like) => like.username === loggedUser.username
  );
  // if not the result will be -1 indicating the user is not in the post.likes array
  // which means they haven't liked the post

  const likeColor = likedIndex > -1 ? "red" : "grey";

  const clickHandler =
    likedIndex > -1
      ? () => removeLike(post.likes[likedIndex]._id)
      : () => addLike(post._id);

  return (
    <Card raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
            <Link to={`/${post.user.username}`}>
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
            </Link>
          </Card.Header>
        </Card.Content>
      )}
      <Image src={`${post?.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{post.caption}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
        <Icon
          name={"heart"}
          size="large"
          color={likeColor}
          onClick={clickHandler}
        />
        {post.likes.length} Likes
      </Card.Content>
    </Card>
  );
}

export default PostCard;
