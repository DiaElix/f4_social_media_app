
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const shortTitle = post.title.slice(0, 30);
  const shortBody = post.body.slice(0, 75);

  return (
    <div className="post-card">

      <Link to={`/item/${post.id}`} className="post-link">

        <img
          src={post.imgSrc}
          alt={`Post ${post.id}`}
          className="post-image"
        />

        <div className="post-info">

          <p>User ID: {post.userId}</p>

          <p>
            Title: {shortTitle}
            {post.title.length > 30 && "..."}
          </p>

          <p>
            Body: {shortBody}
            {post.body.length > 75 && "..."}
          </p>

          <span className="read-more">
            Read More...
          </span>

        </div>

      </Link>

    </div>
  );
}

export default PostCard;
