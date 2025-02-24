import { Link, NavLink, Outlet } from "react-router-dom";
import Slider from "./modules/Slider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(2);
  const [loading, setLoading] = useState(false);
  const base_url = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(base_url + "recent_posts/" + limit)
      .then((result) => {
        setPosts(result.data.posts);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [limit]);

  return (
    <>
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-3 gap-8">
          <div className="slider col-span-2">
            <Slider></Slider>

            <div className="load_posts mt-6">
              {posts.map((post) => (
                <div key={post.id}>
                  <div className="grid grid-cols-4 gap-3 items-center mb-4">
                    <div>
                      <img src={post.image_url} alt="" className="rounded" />
                    </div>
                    <div className="col-span-3">
                      <h1>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                      </h1>
                      <span className="text-sm text-gray-400">{post.date}</span>
                      <p>
                        <Link to={`/category/${post.category.name}`}>
                          {post.category.name}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <button
                  onClick={() => setLimit(limit + 1)}
                  className="bg-amber-200 py-2 px-3.5 rounded-2xl"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            </div>
          </div>
          <div className="sidebar">
            <nav>
              <ul className="grid grid-cols-2 gap-2 text-center recent-popular-switcher">
                <li>
                  <NavLink
                    to="recent-posts"
                    className="py-2 block border-b border-orange-700 border-b-2  bg-purple-50 "
                  >
                    Recent Posts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="popular-posts"
                    className="py-2 block border-b border-orange-700 border-b-2  bg-purple-50 "
                  >
                    Popular Posts
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="recent-popular-posts">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
