
import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "./redux/postsSlice";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import "./App.css";

function App() {

  const dispatch = useDispatch();

  const { loading, error, posts } = useSelector(
    (state) => state.posts
  );

  // Fetch posts when the application loads
  useEffect(() => {
    if (posts.length === 0 && !loading && !error) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length, loading, error]);

  return (
    <div className="app">

      <header className="navbar">
        <Link to="/" className="brand">
          Social Media App
        </Link>
      </header>

      <main>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/item/:id" element={<Detail />} />

          <Route
            path="*"
            element={
              <div className="message">
                <h2>404 - Page Not Found</h2>
                <Link to="/">Go Home</Link>
              </div>
            }
          />

        </Routes>
      </main>

    </div>
  );
}

export default App;
