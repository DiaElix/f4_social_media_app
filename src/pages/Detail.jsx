
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

function Detail() {

  // Extract ID from URL
  const { id } = useParams();

  // Get Redux state
  const { posts, loading, error } = useSelector(
    (state) => state.posts
  );

  // Loading condition
  if (loading) {
    return (
      <div className="message">
        <h2>Loading post details...</h2>
      </div>
    );
  }

  // Error condition
  if (error) {
    return (
      <div className="message">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  // Find the post matching the URL ID
  const post = posts.find(
    (item) => item.id === Number(id)
  );

  // If post doesn't exist
  if (!post) {
    return (
      <div className="message">
        <h2>Post not found!</h2>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="detail-container">

      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <h2>Details Page For Post With ID {post.id}</h2>

      <div className="detail-content">

        <img
          src={post.imgSrc}
          alt={`Post ${post.id}`}
          className="detail-image"
        />

        <p>User Id : {post.userId}</p>

        <p>Title : {post.title}</p>

        <p>Body : {post.body}</p>

      </div>

    </div>
  );
}

export default Detail;
