
import { useSelector , useDispatch} from "react-redux";
import PostCard from "../components/PostCard";
import { fetchPosts } from "../redux/postsSlice";
function Home() {
  const { posts, loading, error } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();

  // Loading state
  if (loading) {
    return (
      <div className="message">
        <h2>Loading posts...</h2>
      </div>
    );
  }

  // Error state
  if (error) {
  return (
    <div className="message">
      <h2>Error: {error}</h2>
      <p>Please try again.</p>

      <button onClick={() => dispatch(fetchPosts())}>
        Retry
      </button>
    </div>
  );
}

  return (
    <div className="home-container">

      <div className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

    </div>
  );
}

export default Home;
